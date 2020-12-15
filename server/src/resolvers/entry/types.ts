import { InputType, Field } from 'type-graphql'
import { ContentType } from '../../entities/Entry'

@InputType()
export class EntryInput {
  @Field()
  id: string

  @Field()
  contentText: string

  @Field()
  contentUrl: string

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
