import { InputType, Field } from 'type-graphql'
import { ContentPreview } from '../../entities/Entry'

@InputType()
export class EntryInput {
  @Field()
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  url: string

  @Field(() => ContentPreview, { nullable: true })
  preview?: ContentPreview

  @Field()
  type: string

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

  @Field({ nullable: true })
  deleted?: boolean
}
