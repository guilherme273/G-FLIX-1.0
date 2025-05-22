import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';

import { findOneUserMock } from '../__mocks__/findOne';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { findAllUserMock } from '../__mocks__/findAll';
import { createUser } from '../__mocks__/create';
import { userEntityMock } from '../__mocks__/UserEntityMock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn().mockResolvedValue(findAllUserMock),
            create: jest
              .fn()
              .mockResolvedValue(userEntityMock({ ...createUser, type: 0 })),
            save: jest
              .fn()
              .mockResolvedValue(userEntityMock({ ...createUser, type: 0 })),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an user only with some informations', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock(findOneUserMock));
    const result = await service.findOne(findOneUserMock.id);
    expect(result.user.id).toEqual(findOneUserMock.id);
  });

  it('should return NotFoundExeption when not found the user', async () => {
    await expect(service.findOne(999999999999)).rejects.toThrow(
      new NotFoundException({
        msg: { type: 'error', content: 'Usuário não encontrado!' },
      }),
    );
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(result.users.length).toEqual(2);
    expect(result.users[0].id).toEqual(1);
  });

  it('should create a new user', async () => {
    const result = await service.create(createUser);
    expect(result.msg.type).toEqual('success');
  });

  it('should return a ConflictException when the user exists on create', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce(userEntityMock());
    await expect(service.create(createUser)).rejects.toThrow(
      new ConflictException({
        msg: {
          type: 'error',
          content: `Email: ${userEntityMock().email} já cadastrado!`,
        },
      }),
    );
  });
});
