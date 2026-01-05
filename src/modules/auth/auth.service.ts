import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login({ email, password }: AuthLoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      // Verificar si el usuario está activo
      if (!user.active) {
        throw new UnauthorizedException(
          'Tu cuenta ha sido desactivada. Contacta al administrador',
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Email o contraseña incorrectos');
      }

      const tokens = await this.generateTokens(user.id.toString(), user.email);

      return {
        user: this.sanitizeUser(user),
        ...tokens,
      };
    } catch (error) {
      // Si es una excepción HTTP, la re-lanzamos tal cual
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      // Para otros errores, loguear y lanzar un error genérico
      this.logger.error(
        `Error durante el login: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Error al procesar la solicitud de inicio de sesión',
      );
    }
  }

  async register({ names, surnames, email, password, role }: AuthRegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      names,
      surnames,
      email,
      password: hashedPassword,
      active: true,
      role,
    });

    const saveUser = await this.userRepository.save(newUser);

    return {
      user: this.sanitizeUser(saveUser),
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verificar el refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      return {
        ...(await this.generateTokens(user.id.toString(), user.email)),
        user: this.sanitizeUser(user),
      };
    } catch (error) {
      this.logger.error(
        `Error refreshing token: ${error.message}`,
        error.stack,
      );
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessExpiration = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION',
    );
    const refreshExpiration = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION',
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: accessExpiration as any,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: refreshExpiration as any,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private sanitizeUser(user: User) {
    const { password, ...result } = user;
    return result;
  }
}
