import { ObjectType } from '@nestjs/graphql';
import { Token } from './token.model';
import { Users } from '../users/users.model';

@ObjectType()
export class Auth extends Token {
  user: Users;
}