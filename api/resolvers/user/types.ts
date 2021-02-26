import { InputType, Field, ObjectType, registerEnumType } from 'type-graphql'
import { User } from '../../entities'
import { ErrorMessage } from '../../types'

registerEnumType(ErrorMessage, {
  name: 'ErrorMessage',
})

@ObjectType()
export class FieldError {
  @Field()
  field!: string

  @Field(() => ErrorMessage)
  message!: ErrorMessage
}

@InputType()
export class LoginInput {
  @Field()
  email!: string

  @Field()
  password!: string
}

@ObjectType()
export class BasicResponse {
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError
}

@ObjectType()
export class UserResponse extends BasicResponse {
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
export class ValidResponse extends BasicResponse {
  @Field({ nullable: true })
  message?: string
}
