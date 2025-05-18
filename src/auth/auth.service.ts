import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { UserDto } from './dto/user.dto';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    try {
      const hash = await argon2.hash(dto.password);

      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: 'DefaultFirstName',
          lastName: 'DefaultLastName',
        },
      });

      delete (user as any).hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    try {
      const user = (await this.prismaService.user.findUnique({
        where: {
          email: dto.email,
        },
      })) as UserDto;

      if (!user) {
        throw new ForbiddenException('Credentials incorrect');
      }

      const passwordMatches = await argon2.verify(user.hash, dto.password);

      if (!passwordMatches) {
        throw new ForbiddenException('Credentials incorrect');
      }
      return  this.signToken(user.id, user.email);
    } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

   async signToken(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const config = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: config,
    });
    return {
        access_token: token,
    }
  }
}
