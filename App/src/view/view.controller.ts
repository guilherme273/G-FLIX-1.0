import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserFromPayload } from '../Decorators/user.decorator';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createViewDto: CreateViewDto,
    @GetUserFromPayload('sub') user_id: number,
  ) {
    return this.viewService.create(createViewDto, user_id);
  }
}
