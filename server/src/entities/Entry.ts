import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity, User } from '.'
import { EntryInput } from '../resolvers/entry/types'

export enum ContentType {
  LINK = 'Link',
  IMAGE = 'Image',
  VIDEO = 'Video',
  Note = 'Note',
}

registerEnumType(ContentType, {
  name: 'ContentType',
})
@ObjectType()
@Entity()
export default class Entry extends BaseEntity {
  @Field()
  @Property()
  contentText: string

  @Field()
  @Property()
  contentUrl: string

  @Field()
  @Property()
  contentType!: string

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

  constructor(entryData: EntryInput, user: User) {
    super()
    this.id = entryData.id
    this.contentText = entryData.contentText
    this.contentUrl = entryData.contentUrl
    this.contentType = entryData.contentType
    this.categories = entryData.categories
    this.calendarDate = entryData.calendarDate
    this.processing = entryData.processing
    this.hashedKey = entryData.hashedKey
    this.user = user
  }
}
