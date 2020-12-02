import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export abstract class BaseEntity {
  @Field(() => String)
  @PrimaryKey()
  _id!: ObjectId

  @Field()
  @SerializedPrimaryKey()
  id!: string

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => Date.now() })
  updatedAt = Date.now()

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => Date.now() })
  createdAt = Date.now()

  @Field(() => Boolean)
  @Property({ onCreate: () => false })
  deleted: boolean
}
