import { InputType, Field } from 'type-graphql'

import { EntryInput } from '../entry/types'

@InputType()
export class ListInput {
  @Field()
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [String])
  categories: [string]

  @Field(() => [EntryInput])
  entries: [EntryInput]

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
