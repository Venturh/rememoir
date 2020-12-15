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

export enum ErrorMessage {
  EMAIL_INVALID,
  EMAIL_EXISTS,
  EMAIL_NOT_FOUND,
  PASSWORD_INVALID,
  USER_NOT_VERIIFIED,
  VERIFICATION_INVALID,
}
export const enum SuccessMessage {
  RESET_PASSWORD_STARTED = 'RESET_PASSWORD_STARTED',
  RESET_PASSWORD_COMPLETE = 'RESET_PASSWORD_COMPLETE',
}
