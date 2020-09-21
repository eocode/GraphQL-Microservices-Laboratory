import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class CommonModel {
  @Field((type) => ID)
  id: string;
  created_at: Date;
  updated_at: Date;
}