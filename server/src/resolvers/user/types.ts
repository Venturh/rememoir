import { User } from '../../entities/User'
import { InputType, Field, ObjectType } from 'type-graphql'

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class BasicResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
export class LoginResponse extends BasicResponse {
  @Field({ nullable: true })
  accessToken?: string
  @Field(() => User, { nullable: true })
  user?: User
}

@ObjectType()
export class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}
