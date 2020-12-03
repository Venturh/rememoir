import { Field, ObjectType } from 'type-graphql'
import { Entity, Property, Unique } from '@mikro-orm/core'

import { BaseEntity } from './BaseEntity'
import { Verification } from '../types'

@ObjectType()
@Entity()
@Unique({ properties: ['email'] })
export class User extends BaseEntity {
  @Field()
  @Property()
  email!: string

  @Field()
  @Property()
  password!: string

  @Field()
  @Property()
  secret!: string

  @Field(() => Boolean)
  @Property()
  verified = false

  @Property({ type: 'Verification' })
  verification: Verification

  @Property()
  tokenVersion = 0
}
