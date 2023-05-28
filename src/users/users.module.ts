import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultUser } from 'src/typeorm/entities/DefaultUser';
import { Token } from 'src/typeorm/entities/Token';

@Module({
  imports: [TypeOrmModule.forFeature([DefaultUser, Token])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
