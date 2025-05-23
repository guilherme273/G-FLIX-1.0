import { Test, TestingModule } from '@nestjs/testing';
import { ReactionsService } from '../reactions.service';
import { ReactionsEntity } from '../entities/reaction.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ReactionsEntityMock } from '../__mocks__/ReactionsEntityMock';
import { deleteResultMock } from '../__mocks__/reactionsDelete';
import { findAllReactionsMock } from '../__mocks__/reactionsFindAll';

describe('ReactionsService', () => {
  let service: ReactionsService;
  let reactionRepository: Repository<ReactionsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReactionsService,
        {
          provide: getRepositoryToken(ReactionsEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(findAllReactionsMock),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReactionsService>(ReactionsService);
    reactionRepository = module.get<Repository<ReactionsEntity>>(
      getRepositoryToken(ReactionsEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all reactions', async () => {
    const result = await service.findAll();
    expect(result?.reactions.length).toEqual(2);
  });

  it('should update a reaction', async () => {
    const dto = {
      id_reactions_type: 1,
      id_movie: ReactionsEntityMock().id_movie,
    };
    jest
      .spyOn(reactionRepository, 'findOne')
      .mockResolvedValueOnce(ReactionsEntityMock());
    jest.spyOn(reactionRepository, 'save').mockResolvedValueOnce({
      ...ReactionsEntityMock(),
      id_reactions_type: 1,
    });

    const result = await service.createOrUpdateOrDelete(
      dto,
      ReactionsEntityMock().id,
    );
    expect(result.msg.type).toEqual('success');
    expect(result.msg.content).toEqual('Reação Atualizada!');
    expect(result.updatedReaction?.id_reactions_type).toEqual(
      dto.id_reactions_type,
    );
  });

  it('should delete a reaction', async () => {
    const dto = {
      id_reactions_type: 3,
      id_movie: ReactionsEntityMock().id_movie,
    };
    jest
      .spyOn(reactionRepository, 'findOne')
      .mockResolvedValueOnce(ReactionsEntityMock());
    jest
      .spyOn(reactionRepository, 'delete')
      .mockResolvedValueOnce(deleteResultMock);

    const result = await service.createOrUpdateOrDelete(
      dto,
      ReactionsEntityMock().id,
    );
    expect(result.msg.type).toEqual('success');
    expect(result.msg.content).toEqual('Reação Deletada!');
  });

  it('should create a reaction', async () => {
    const dto = {
      id_reactions_type: 3,
      id_movie: ReactionsEntityMock().id_movie,
    };
    jest.spyOn(reactionRepository, 'findOne').mockResolvedValueOnce(null);

    const result = await service.createOrUpdateOrDelete(
      dto,
      ReactionsEntityMock().id,
    );
    expect(result.msg.type).toEqual('success');
    expect(result.msg.content).toEqual('Reação Criada!');
  });
});
