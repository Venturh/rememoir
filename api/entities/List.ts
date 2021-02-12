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

  constructor(listInput: ListInput, user: User) {
    super()
    this.id = listInput.id
    this.title = listInput.title
    this.description = listInput.description
    this.categories = listInput.categories
    this.calendarDate = listInput.calendarDate
    this.processing = listInput.processing
    this.hashedKey = listInput.hashedKey
    this.pinned = listInput.pinned
    this.archieved = listInput.archieved
    this.user = user
  }
}
