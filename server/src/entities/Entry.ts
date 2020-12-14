import { Field, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'

import { BaseEntity, User } from '.'

@ObjectType()
@Entity()
export default class Entry extends BaseEntity {
  @Field()
  @Property()
  text: string

  @Field()
  @Property()
  url: string

  @Property()
  type!: string

  @Property()
  categories!: [string]

  @Field(() => User)
  @ManyToOne()
  user!: User

  constructor(
    text: string,
    url: string,
    type: string,
    categories: [string],
    user: User
  ) {
    super()
    this.text = text
    this.url = url
    this.type = type
    this.categories = categories
    this.user = user
  }
}
