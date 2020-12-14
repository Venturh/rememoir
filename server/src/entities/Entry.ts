import { Field, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { User } from '.'
import { ObjectId } from 'mongodb'

@ObjectType()
@Entity()
export default class Entry {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId

  @Field()
  @PrimaryKey()
  id!: string

  @Field()
  @Property()
  text: string

  @Field()
  @Property()
  url: string

  @Field()
  @Property()
  type!: string

  @Field(() => [String])
  @Property()
  categories!: [string]

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => Date.now() })
  updatedAt = Date.now()

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => Date.now() })
  createdAt = Date.now()

  @Field(() => Boolean)
  @Property({ onCreate: () => false })
  deleted: boolean

  @Field(() => User)
  @ManyToOne()
  user!: User

  constructor(
    id: string,
    text: string,
    url: string,
    type: string,
    categories: [string],
    user: User
  ) {
    this.id = id
    this.text = text
    this.url = url
    this.type = type
    this.categories = categories
    this.user = user
  }
}
