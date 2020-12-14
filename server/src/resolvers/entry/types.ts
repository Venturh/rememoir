import { InputType, Field } from 'type-graphql'

@InputType()
export class EntryInput {
  @Field()
  id: string

  @Field()
  text: string

  @Field()
  url: string

  @Field()
  type: string

  @Field(() => [String])
  categories: [string]

  @Field()
  updatedAt: number
}
