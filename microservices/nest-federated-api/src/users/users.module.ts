import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../common/prisma.service';
import { PasswordService } from '../common/password.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, PasswordService],
})

export class UsersModule {
}