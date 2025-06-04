import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ReactionsController } from '../reactions.controller';
import { ReactionsService } from '../reactions.service';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { findAllReactionsMock } from '../__mocks__/reactionsFindAll';

describe('ReactionsController', () => {
  let controller: ReactionsController;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ReactionsController],
      providers: [
        {
          provide: ReactionsService,
          useValue: {
            createOrUpdateOrDelete: jest
              .fn()
              .mockResolvedValue({ msg: { type: 'success' } }),
            findAll: jest
              .fn()
              .mockResolvedValue({ reactions: findAllReactionsMock }),
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

    controller = moduleFixture.get<ReactionsController>(ReactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a reaction', async () => {
    const dto: CreateReactionDto = { id_reactions_type: 1, id_movie: 1 };
    const result = await controller.create(dto, 1);
    expect(result.msg.type).toEqual('success');
  });

  it('sould return all reactions', async () => {
    const result = await controller.findAll();
    expect(result?.reactions.length).toEqual(findAllReactionsMock.length);
  });
});
