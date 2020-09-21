import { Field, ObjectType } from '@nestjs/graphql';
import { CommonModel } from '../common/model.model';

@ObjectType()
export class Users extends CommonModel {

  @Field(type => String)
  first_name: string;

  @Field(type => String)
  last_name: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  password: string;

  @Field(type => String)
  phone: string;

  @Field(type => String)
  username: string;

  @Field(type => String)
  avatar: string;
}