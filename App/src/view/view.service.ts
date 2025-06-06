import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ViewEntity } from './entities/view.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(ViewEntity)
    private readonly viewRepository: Repository<ViewEntity>,
  ) {}

  async create(createViewDto: CreateViewDto, user_id: number) {
    const view = await this.viewRepository.save({
      id_movie: createViewDto.id_movie,
      seconds_watched: createViewDto.seconds_watched,
      id_user: user_id,
    });
    return {
      view,
    };
  }
}
