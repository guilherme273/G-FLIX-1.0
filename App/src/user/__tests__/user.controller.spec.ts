import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { createUser, createUserMock } from '../__mocks__/UserCreate';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { userEntityMock } from '../__mocks__/UserEntityMock';

describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              userWithoutPassword: createUserMock,
              msg: {
                type: 'success',
                content: `${createUserMock.name} cadastrado com sucesso!`,
              },
            }),
            updatePassword: jest.fn().mockResolvedValue({
              msg: {
                type: 'success',
                content: 'Senha atualizada com sucesso!',
              },
            }),
            findAll: jest.fn().mockResolvedValue({
              users: [userEntityMock()],
            }),
            findOne: jest.fn().mockResolvedValue({ user: userEntityMock() }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = moduleFixture.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a user created', async () => {
    const result = await controller.create(createUser);
    expect(result.msg).toEqual({
      type: 'success',
      content: `${createUserMock.name} cadastrado com sucesso!`,
    });
  });

  it('should update the password', async () => {
    const dto: UpdateUserPasswordDto = {
      oldPassword: 'ugabugabuga',
      newPassword: 'ugabugabuga',
    };
    const result = await controller.updatePassword(dto, 1);
    expect(result).toEqual({
      msg: {
        type: 'success',
        content: 'Senha atualizada com sucesso!',
      },
    });
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result.users[0].name).toEqual(userEntityMock().name);
  });

  it('should return one user', async () => {
    const result = await controller.findOne(1);
    expect(result.user.id).toEqual(userEntityMock().id);
  });
});
