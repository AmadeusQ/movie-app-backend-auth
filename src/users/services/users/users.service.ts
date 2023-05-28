import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultUser } from 'src/typeorm/entities/DefaultUser';
import { Token } from 'src/typeorm/entities/Token';
import { UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(DefaultUser)
    private userRepository: Repository<DefaultUser>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async findUsers() {
    return this.userRepository.find({
      relations: ['watchedlists', 'watchlists', 'favoritelists', 'ratings'],
    });
  }

  async findUserById(userId: number) {
    const user = this.userRepository.findOne({
      where: { userId },
      relations: ['watchedlists', 'watchlists', 'favoritelists', 'ratings'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findUserByUsername(username: string) {
    const user = this.userRepository.findOne({
      where: { username },
      relations: ['watchedlists', 'watchlists', 'favoritelists', 'ratings'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async updateUser(userId: number, updateUserParams: UpdateUserParams) {
    return this.userRepository.update({ userId }, { ...updateUserParams });
  }

  async deleteUser(userId: number) {
    await this.tokenRepository.delete({ userId });
    return this.userRepository.delete({ userId });
  }
}
