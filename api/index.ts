import 'reflect-metadata'

import http from 'http'
import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { MikroORM } from '@mikro-orm/core'
import { verify } from 'jsonwebtoken'
import { MongoDriver } from '@mikro-orm/mongodb'

import { BaseEntity, Entry, User, List } from './entities'
import { MyContext } from './types'

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './utils/auth'

const main = async () => {
  const orm = await MikroORM.init<MongoDriver>({
    entities: [BaseEntity, User, Entry, List],
    dbName: 'projectm',
    clientUrl: `mongodb://${process.env.DB_URL}`,
    type: 'mongo',
    debug: false,
    ensureIndexes: true,
  })

  await orm.em.getDriver().createCollections()

  const app = express()
  app.use(cookieParser())

  if (process.env.ENV === 'development') {
    app.use(
      cors({
        origin: process.env.VITE_CLIENT_URL,
        credentials: true,
      })
    )
    // static resources path in production
  } else {
    app.use(compression())
    app.use(express.static(path.resolve(__dirname)))
    app.get('*', function (req, res, next) {
      if (
        req.originalUrl.includes('api') ||
        req.originalUrl.includes('graphql')
      )
        return next()
      const html = fs.readFileSync(
        path.resolve(__dirname, './index.html'),
        'utf-8'
      )
      res.send(html)
    })
  }

  app.post('/api/refresh_token', async (req: Request, res: Response) => {
    const token = req.cookies.jid
    if (!token) {
      return res.send({ ok: false, accessToken: '' })
    }
    let payload: any = null
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
    } catch (err) {
      console.log(err)
      return res.send({ ok: false, accessToken: '' })
    }

    const user = await orm.em.findOne(User, { id: payload.userId })

    if (!user || !user.verified || user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        `${__dirname}/resolvers/**/*.${
          process.env.ENV === 'production' ? 'js' : 'ts'
        }`,
      ],
    }),
    context: ({ req, res }): MyContext => ({
      em: orm.em,
      req,
      res,
    }),
  })

  apolloServer.applyMiddleware({ app, cors: false, path: '/api/graphql' })
  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(process.env.PORT, () => {
    console.log('express server started at ', process.env.PORT, process.env.ENV)
  })
}

main().catch((err) => {
  console.error(err)
})
