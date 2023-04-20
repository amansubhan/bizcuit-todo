import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    if (!signInDto.username || !signInDto.password)
      throw new BadRequestException('Login credentials invalid', {
        cause: new Error(),
        description: 'username or password cannot be empty',
      });
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
