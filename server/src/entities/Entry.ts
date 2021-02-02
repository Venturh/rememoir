import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql'
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core'
import { BaseEntity, List, User } from '.'
import { EntryInput } from '../resolvers/entry/types'

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
  ogVideoUrl?: string
  @Field({ nullable: true })
  ogAudioUrl?: string
  @Field({ nullable: true })
  embeddedUrl?: string
  @Field({ nullable: true })
  color?: string
  @Field()
  type: string
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
  categories!: [string]

  @Field(() => User)
  @ManyToOne()
  user: User

  @Field(() => [List], { nullable: true })
  @ManyToMany(() => List, (l) => l.entries)
  lists = new Collection<List>(this)

  constructor(entryData: EntryInput, user: User) {
    super()
    this.id = entryData.id
    this.title = entryData.title
    this.description = entryData.description
    this.url = entryData.url
    this.type = entryData.type
    this.categories = entryData.categories
    this.calendarDate = entryData.calendarDate
    this.processing = entryData.processing
    this.hashedKey = entryData.hashedKey
    this.user = user
  }
}
