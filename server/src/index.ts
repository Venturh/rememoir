import 'reflect-metadata'

import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as http from 'http'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { buildSchema, Subscription } from 'type-graphql'
import { MikroORM } from '@mikro-orm/core'
import { verify } from 'jsonwebtoken'
import { MongoDriver } from '@mikro-orm/mongodb'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

import { BaseEntity, Entry, User } from './entities'
import { MyContext } from './types'

import { SubscriptionServer } from 'subscriptions-transport-ws'

import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './utils/auth'

const main = async () => {
  const pubsub = new PubSub()
  const orm = await MikroORM.init<MongoDriver>({
    entities: [BaseEntity, User, Entry],
    dbName: 'synced',
    type: 'mongo',
    debug: true,
    ensureIndexes: true,
    metadataProvider: TsMorphMetadataProvider,
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
    subscriptions: {
      onConnect: async (connectionParams, webSocket) => {
        console.log('Subscription Connected')
        console.log(connectionParams)
      },
    },
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const httpServer = http.createServer(app)
  apolloServer.installSubscriptionHandlers(httpServer)

  httpServer.listen(4000, () => {
    console.log('express server started')
  })

  // setInterval(() => {
  //   const flag = new Date().getTime()
  //   pubsub.publish('changedEntry', {
  //     humanChanged: {
  //       name: 'name-' + flag,
  //     },
  //   })
  //   console.log('published humanChanged ' + flag)
  // }, 1000)
}

main().catch((err) => {
  console.error(err)
})
