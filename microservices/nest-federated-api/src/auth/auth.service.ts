import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../common/password.service';
import { PrismaService } from '../common/prisma.service';
import { Token } from './token.model';
import { Users } from '../users/users.model';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {
  }

  // async createUser(payload: SignupInput): Promise<Token> {
  //   const hashedPassword = await this.passwordService.hashPassword(
  //     payload.password
  //   );
  //
  //   try {
  //     const user = await this.prisma.users.create({
  //       data: {
  //         ...payload,
  //         password: hashedPassword
  //       }
  //     });
  //
  //     return this.generateToken({
  //       userId: user.id
  //     });
  //   } catch (error) {
  //     throw new ConflictException(`Email ${payload.email} already used. ${error}`);
  //   }
  // }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prisma.users.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateToken({
      userId: user.id,
    });
  }

  validateUser(userId: string): Promise<Users> {
    return this.prisma.users.findOne({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<Users> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.users.findOne({ where: { id } });
  }

  generateToken(payload: object): Token {
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_IN'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token);

      return this.generateToken({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
