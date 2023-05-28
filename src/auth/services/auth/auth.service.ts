import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserParams, SignInUserParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultUser } from 'src/typeorm/entities/DefaultUser';
import { Repository } from 'typeorm';
import { Token } from 'src/typeorm/entities/Token';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(DefaultUser)
    private userRepository: Repository<DefaultUser>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async register(registerUserParams: RegisterUserParams) {
    const user = await this.usersService.findUserByUsername(
      registerUserParams.username,
    );

    if (user) {
      throw new HttpException('This username is taken', HttpStatus.BAD_REQUEST);
    }

    if (registerUserParams.username.length < 3) {
      throw new HttpException(
        'Username length must be at least 3',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (registerUserParams.password.length < 8) {
      throw new HttpException(
        'Password length must be at least 8',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = encodePassword(registerUserParams.password);
    const newUser = this.userRepository.create({
      username: registerUserParams.username,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    const payload = {
      id: newUser.userId,
      username: registerUserParams.username,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    const registeredUser = await this.usersService.findUserByUsername(
      registerUserParams.username,
    );

    const newToken = this.tokenRepository.create({
      token: accessToken,
      userId: registeredUser.userId,
    });

    await this.tokenRepository.save(newToken);
    return {
      userId: newUser.userId,
      token: accessToken,
      userRole: newUser.role,
    };
  }

  async signIn(signInUserParams: SignInUserParams): Promise<any> {
    const user = await this.usersService.findUserByUsername(
      signInUserParams.username,
    );
    if (!user) {
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!comparePasswords(signInUserParams.password, user.password)) {
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { id: user.userId, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const newToken = this.tokenRepository.create({
      token: accessToken,
      userId: user.userId,
    });

    await this.tokenRepository.save(newToken);
    return {
      userId: user.userId,
      token: accessToken,
      userRole: user.role,
    };
  }

  async logout(userId: number) {
    await this.tokenRepository.delete({ userId });
  }
}
