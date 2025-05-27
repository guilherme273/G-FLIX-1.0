import { Test, TestingModule } from '@nestjs/testing';
import { ViewController } from '../view.controller';
import { ViewService } from '../view.service';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CreateViewDto } from '../dto/create-view.dto';
import { viewEntityMock } from '../__moks/viewEntityMock';

describe('ViewController', () => {
  let controller: ViewController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ViewController],
      providers: [
        {
          provide: ViewService,
          useValue: {
            create: jest.fn().mockResolvedValue({ view: viewEntityMock() }),
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

    controller = moduleFixture.get<ViewController>(ViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a view', async () => {
    const dto: CreateViewDto = {
      id_movie: 3,
      seconds_watched: 120,
    };
    const result = await controller.create(dto, 1);
    expect(result.view.id).toEqual(viewEntityMock().id);
    expect(result.view.id_movie).toEqual(viewEntityMock().id_movie);
  });
});
