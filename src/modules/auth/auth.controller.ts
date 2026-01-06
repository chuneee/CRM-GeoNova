import { Controller, Post, Body, Logger, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { RefreshTokenDto } from './dto/auth-refresh-token.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthUser } from 'src/common/decorators/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { AuthUpdateProfileDto } from './dto/auth-update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    try {
      const newUser = await this.authService.register(authRegisterDto);

      return newUser;
    } catch (error) {
      Logger.error('Error during registration:', error);
      return error.response;
    }
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Patch('update-password')
  @Auth()
  async updatePassword(
    @Body()
    updatePasswordDto: {
      currentPassword: string;
      newPassword: string;
    },
    @AuthUser() authUser: User,
  ) {
    console.log('AuthUser in controller:', authUser);
    console.log('UpdatePasswordDto in controller:', updatePasswordDto);
    return this.authService.updatePassword(authUser, updatePasswordDto);
  }

  @Patch('update-info-profile')
  @Auth()
  async updateInfoProfile(
    @Body()
    updateInfoProfileDto: AuthUpdateProfileDto,
    @AuthUser() authUser: User,
  ) {
    return this.authService.updateInfoProfile(authUser, updateInfoProfileDto);
  }
}
