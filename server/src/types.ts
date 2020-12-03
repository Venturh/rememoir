import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core'
import { MongoEntityManager, MongoDriver } from '@mikro-orm/mongodb'
import { Request, Response } from 'express'

export type MyContext = {
  em: MongoEntityManager<MongoDriver> &
    EntityManager<IDatabaseDriver<Connection>>
  req: Request & { userId: string }
  res: Response
  payload?: { userId: string }
}

export type Verification = {
  email: string
  code: string
}
