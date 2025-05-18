import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth') 
export class AuthController {
    constructor(private authService : AuthService) {}

    // signUp (@Body('email')  email : string, @Body('password' , ParseIntPipe) passwordnumber : ) {

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp (@Body()  dto : AuthDto) {
        return this.authService.signUp(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn ( @Body() dto : AuthDto) {
        return this.authService.signIn(dto);
    }
}
