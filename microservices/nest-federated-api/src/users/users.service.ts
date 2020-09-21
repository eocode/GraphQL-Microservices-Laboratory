import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Users } from './users.model';
import { PasswordService } from '../common/password.service';
import { ChangePasswordInput } from './dto/change-password.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private passwordService: PasswordService) {
  }

  async users(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async findOne(email): Promise<Users> {
    return this.prisma.users.findOne({
      where: {
        email: email,
      },
    });
  }

  async makePassword(paass): Promise<string> {
    return this.passwordService.hashPassword(paass);
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput,
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.prisma.users.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}