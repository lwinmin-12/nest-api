import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dto/user.dto';

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
    updateMe(@Req() req : Request ,  @Body('firstName') firstName : string , @Body('lastName') lastName : string) {
       
        if (!req.user) {
            throw new Error('User not found in request');
        }

        return this.userService.updateUser((req.user as UserDto).id, firstName, lastName);
    }
}
