import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { userEntityMock } from '../../user/__mocks__/UserEntityMock';
import { AuthDTO } from '../dto/auth.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<UserEntity>;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a NotFoundException when user does not exist', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

    const authDto: AuthDTO = {
      email: 'guilherme.feitosa.cunha@gmail.com',
      password: 'strongPassword',
    };

    await expect(service.signIn(authDto)).rejects.toThrow(
      new NotFoundException({
        msg: { type: 'error', content: 'Usuário não encontrado!' },
      }),
    );
  });

  it('should return a BadRequestException when passwords do not match', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock());
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const authDto: AuthDTO = {
      email: 'guilherme.feitosa.cunha@gmail.com',
      password: 'wrongPassword',
    };

    await expect(service.signIn(authDto)).rejects.toThrow(
      new BadRequestException({
        msg: { type: 'error', content: 'Usuário ou senha inválidos!' },
      }),
    );
  });

  it('should return authorization data on success', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock());

    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    jest.spyOn(jwt, 'signAsync').mockResolvedValueOnce('mocked-jwt-token');

    const authDto: AuthDTO = {
      email: userEntityMock().email,
      password: userEntityMock().password,
    };

    const result = await service.signIn(authDto);

    expect(result).toEqual({
      msg: {
        type: 'success',
        content: `Seja bem vindo, ${userEntityMock().name}!`,
      },
      access_token: 'mocked-jwt-token',
    });
  });
});
