import { Controller, Post, Body, Get, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1];
    return this.authService.validateToken(token);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Headers('authorization') auth: string) {
    const token = auth?.split(' ')[1];
    const user = await this.authService.validateToken(token);
    return user;
  }
}
