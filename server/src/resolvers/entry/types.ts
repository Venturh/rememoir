import { InputType, Field } from 'type-graphql'
import { ContentPreview, ContentType } from '../../entities/Entry'

@InputType()
export class EntryInput {
  @Field()
  id: string

  @Field()
  contentText: string

  @Field()
  contentUrl: string

  @Field(() => ContentPreview, { nullable: true })
  contentPreview?: ContentPreview

  @Field()
  contentType: ContentType

  @Field(() => [String])
  categories: [string]

  @Field()
  calendarDate: string

  @Field()
  updatedAt: string

  @Field()
  hashedKey!: string

  @Field()
  processing: boolean
}
