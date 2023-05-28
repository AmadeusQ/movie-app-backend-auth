import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/typeorm/entities/Token';
import { DefaultUser } from 'src/typeorm/entities/DefaultUser';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token, DefaultUser]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.jwt_secret,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
