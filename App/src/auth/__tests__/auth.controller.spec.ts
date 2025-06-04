import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthDTO } from '../dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              access_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NjQ4NTk2MiwiZXhwIjoxNzQ2NTg1OTYyfQ.uoPTR0aWzjlPmknN9zM8dUn2cwdkUaMN5itJ_o1LzSw',
              msg: {
                type: 'success',
              },
            }),
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

    controller = moduleFixture.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signin', async () => {
    const dto: AuthDTO = {
      email: 'guilherme@gmail.com',
      password: 'strongPassword',
    };
    const result = await controller.signIn(dto);
    expect(result.msg.type).toEqual('success');
  });

  it('should verify if is loggedIn', () => {
    const result = controller.loggedIn();
    expect(result).toBeTruthy();
  });
});
