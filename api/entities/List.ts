import { Field, ObjectType } from 'type-graphql'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { ListInput } from '../resolvers/list/types'
import { BaseEntity, User } from '.'

@ObjectType()
@Entity()
export default class List extends BaseEntity {
  @Field()
  @Property()
  title: string

  @Field({ nullable: true })
  @Property()
  description?: string

  @Field()
  @Property()
  calendarDate!: string

  @Field()
  @Property()
  hashedKey!: string

  @Field()
  @Property()
  processing: boolean

  @Field(() => [String])
  @Property()
  categories!: [string]

  @Field(() => User)
  @ManyToOne()
  user: User

  @Field(() => [String])
  @Property()
  entries!: string[]

  constructor(entryData: ListInput, user: User) {
    super()
    this.id = entryData.id
    this.title = entryData.title
    this.description = entryData.description
    this.categories = entryData.categories
    this.calendarDate = entryData.calendarDate
    this.processing = entryData.processing
    this.hashedKey = entryData.hashedKey
    this.user = user
  }
}