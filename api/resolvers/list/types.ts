import { InputType, Field } from 'type-graphql'

@InputType()
export class ListInput {
  @Field()
  id!: string

  @Field()
  title!: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [String])
  categories!: [string]

  @Field(() => [String])
  entries!: string[]

  @Field()
  calendarDate!: string

  @Field()
  updatedAt!: string

  @Field()
  hashedKey!: string

  @Field()
  processing!: boolean

  @Field({ nullable: true })
  deleted?: boolean
}
