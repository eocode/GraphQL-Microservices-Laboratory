import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.model';

@Resolver()
export class UsersResolver {

  constructor(
    private userService: UsersService,
  ) {
  }

  @Query(returns => [Users])
  async UsersGet() {
    return this.userService.users();
  }

  @Query(returns => Users)
  async UsersFindByEmail(@Args('email', { type: () => String })email: string) {
    return this.userService.findOne(email);
  }

  @Query(returns => String)
  async MakePassword(@Args('password', { type: () => String })password: string) {
    return this.userService.makePassword(password);
  }
}