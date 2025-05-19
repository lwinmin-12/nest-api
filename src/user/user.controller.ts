import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import e, { Request } from 'express';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { UserDto } from '../auth/dto/user.dto';
import { EditUserDto } from 'src/auth/dto';

@Controller('users')
export class UserController {
    constructor(private userService : UserService) {}
    @Get('me')
    @UseGuards(JwtGuard)
    getMe(@Req() req : Request) {
        return req.user;
    }

    @Patch('me')
    @UseGuards(JwtGuard)
    updateMe(@Req() req : Request ,  @Body('firstName') dto : EditUserDto) {
       
        if (!req.user) {
            throw new Error('User not found in request');
        }

        return this.userService.updateUser((req.user as UserDto).id, dto);
    }
}
