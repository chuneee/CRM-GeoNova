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
import { UpdatePasswordDto } from './dto/auth-update-password.dto';
import { AuthUpdateProfileDto } from './dto/auth-update-profile.dto';
import { UserNotificationPreferences } from '../users/entities/user_notification_preferences.entity';
import { Company } from '../companies/entities/company.entity';

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

      user.last_access = new Date();
      await this.userRepository.save(user);

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
    const querryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await querryRunner.connect();
    await querryRunner.startTransaction();

    try {
      const existingUser = await querryRunner.manager.findOne(User, {
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const company = await querryRunner.manager.findOne(Company, {
        where: { id: 1 },
      });

      if (!company) {
        throw new BadRequestException(
          'La empresa por defecto no existe. Contacta al administrador.',
        );
      }

      const newUser = querryRunner.manager.create(User, {
        names,
        surnames,
        email,
        password: hashedPassword,
        active: true,
        role,

        company: company || undefined,
      });

      const saveUser = await querryRunner.manager.save(User, newUser);

      const newNotificationPreferences = querryRunner.manager.create(
        UserNotificationPreferences,
        {
          user: saveUser,
        },
      );

      await querryRunner.manager.save(
        UserNotificationPreferences,
        newNotificationPreferences,
      );

      await querryRunner.commitTransaction();

      return {
        user: this.sanitizeUser(saveUser),
      };
    } catch (error) {
      await querryRunner.rollbackTransaction();
      // Si es una excepción HTTP, la re-lanzamos tal cual
      if (error instanceof ConflictException) {
        throw error;
      }

      // Para otros errores, loguear y lanzar un error genérico
      this.logger.error(
        `Error durante el registro: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        'Error al procesar la solicitud de registro',
      );
    } finally {
      await querryRunner.release();
    }
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

  async updatePassword(authUser: User, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id: authUser.id },
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (
      !(await bcrypt.compare(updatePasswordDto.currentPassword, user.password))
    ) {
      throw new BadRequestException('La contraseña actual es incorrecta');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return { message: 'Contraseña actualizada exitosamente' };
  }

  async updateInfoProfile(
    authUser: User,
    updateInfoProfileDto: AuthUpdateProfileDto,
  ) {
    Object.assign(authUser, updateInfoProfileDto);
    return await this.userRepository.save(authUser);
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
