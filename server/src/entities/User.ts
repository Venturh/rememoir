import { Field, ObjectType } from 'type-graphql'
import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core'

import { BaseEntity, Entry } from '.'
import { BilligDetails, Verification } from '../types'

@ObjectType()
@Entity()
@Unique({ properties: ['email'] })
export default class User extends BaseEntity {
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

  @Field(() => User)
  @OneToMany(() => Entry, (entry) => entry.user)
  entries = new Collection<Entry>(this)
}
