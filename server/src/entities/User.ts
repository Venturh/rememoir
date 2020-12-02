import { Field, ObjectType } from 'type-graphql'
import { Entity, Property, Unique } from '@mikro-orm/core'

import { BaseEntity } from './BaseEntity'

@ObjectType()
@Entity()
@Unique({ properties: ['email'] })
export class User extends BaseEntity {
  @Field()
  @Property()
  email!: string

  @Property()
  password!: string

  @Property()
  tokenVersion = 0
}
