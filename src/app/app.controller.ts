import { Controller, Get, UseGuards, Post, Request, HttpException, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RegistrationService } from 'src/registration/registration.service';
import UserAlreadyRegisteredError from 'src/user/errors/UserAlreadyRegisteredError';
import EmptyUserError from 'src/user/errors/EmptyUserError';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly registrationService: RegistrationService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Request() req) {
    try {
      await this.registrationService.register(req.body)
    } catch (err) {
      if (err instanceof UserAlreadyRegisteredError) {
        throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST)
      } else if (err instanceof EmptyUserError) {
        throw new HttpException('Por favor, preencha todas os dados', HttpStatus.BAD_REQUEST)
      }
      else {
        console.log(err)
        throw new HttpException('Erro ao registrar usuário. Por favor, tente novamente mais tarde.', HttpStatus.BAD_REQUEST)
      }
    }
  }

}
