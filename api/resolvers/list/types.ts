import { List, Entry } from '../../entities'
import { InputType, Field, ObjectType } from 'type-graphql'

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

  @Field({ nullable: true })
  pinned!: boolean

  @Field({ nullable: true })
  archived!: boolean
}

@ObjectType()
export class SharedList {
  @Field(() => List)
  list!: List

  @Field(() => [Entry])
  entries!: Entry[]
}
