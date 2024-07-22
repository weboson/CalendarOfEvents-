import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // код из https://docs.nestjs.com/recipes/passport#login-route

  // локальная стратегия Passport имеет имя по умолчанию «local». 
  // Мы ссылаемся на это имя в декораторе @UseGuards(AuthGuard('local')), чтобы связать его с кодом, предоставленным пакетом passport-local. 
  // если мы НЕ пройдем проверку у Guards, то НЕ сможем выполнить код дальше
  @UseGuards(LocalAuthGuard) // LocalAuthGuard содержит AuthGuard('local') 
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
