import 'reflect-metadata'

import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { MikroORM } from '@mikro-orm/core'
import { verify } from 'jsonwebtoken'
import { MongoDriver } from '@mikro-orm/mongodb'

import { BaseEntity } from './entities/BaseEntity'
import { UserResolver } from './resolvers'
import { User } from './entities/User'
import { MyContext } from './types'

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './utils/auth'

const main = async () => {
  const orm = await MikroORM.init<MongoDriver>({
    entities: [User, BaseEntity],
    dbName: 'synced',
    type: 'mongo',
    debug: true,
    ensureIndexes: true,
  })

  await orm.em.getDriver().createCollections()

  const app = express()
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )
  app.use(cookieParser())

  app.post('/refresh_token', async (req, res) => {
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

    if (!user) {
      return res.send({ ok: false, accessToken: '' })
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/**/*.ts'],
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log('express server started')
  })
}

main().catch((err) => {
  console.error(err)
})
