import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default abstract class BaseEntity {
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

  @Field(() => Boolean, { nullable: true })
  @Property({ onCreate: () => false })
  deleted?: boolean

  @Field(() => Boolean, { nullable: true })
  @Property()
  pinned?: boolean

  @Field(() => Boolean, { nullable: true })
  @Property()
  archieved?: boolean
}
