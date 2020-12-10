import { Field, ObjectType } from 'type-graphql'
import { Entity, Property, Unique } from '@mikro-orm/core'

import { BaseEntity } from './BaseEntity'
import { BilligDetails, Verification } from '../types'

@ObjectType()
@Entity()
@Unique({ properties: ['email'] })
export class User extends BaseEntity {
  @Field()
  @Property()
  email!: string

  @Field()
  @Property()
  username!: string

  @Property({ type: 'BilligDetails' })
  billingDetails: BilligDetails

  @Property()
  password!: string

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
