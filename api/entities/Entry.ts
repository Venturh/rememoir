import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { EntryInput } from '../resolvers/entry/types'
import { BaseEntity, User } from '.'

export enum ContentType {
  LINK,
  IMAGE,
  VIDEO,
  NOTE,
}

registerEnumType(ContentType, {
  name: 'ContentType',
})
@ObjectType()
@InputType('ContentPreviewInput')
export class ContentPreview {
  @Field({ nullable: true })
  ogSiteName?: string

  @Field({ nullable: true })
  ogTitle?: string

  @Field({ nullable: true })
  ogDescription?: string

  @Field({ nullable: true })
  ogImageUrl?: string

  @Field({ nullable: true })
  embeddedUrl?: string

  @Field()
  type!: string
}

@ObjectType()
@Entity()
export default class Entry extends BaseEntity {
  @Field()
  @Property()
  title: string

  @Field({ nullable: true })
  @Property()
  description?: string

  @Field()
  @Property()
  url: string

  @Field()
  @Property()
  type!: string

  @Field({ nullable: true })
  @Property()
  preview?: ContentPreview

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
  categories!: string[]

  @Field(() => User)
  @ManyToOne(() => User)
  user: User

  constructor(entryInput: EntryInput, user: User) {
    super()
    this.id = entryInput.id
    this.title = entryInput.title
    this.description = entryInput.description
    this.url = entryInput.url
    this.type = entryInput.type
    this.categories = entryInput.categories
    this.pinned = entryInput.pinned
    this.archived = entryInput.archived
    this.calendarDate = entryInput.calendarDate
    this.processing = entryInput.processing
    this.hashedKey = entryInput.hashedKey
    this.user = user
  }
}
