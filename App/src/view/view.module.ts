import { Module } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from '../admin/admin.module';
import { AuthModule } from '../auth/auth.module';
import { ViewEntity } from './entities/view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ViewEntity]), AuthModule, AdminModule],
  controllers: [ViewController],
  providers: [ViewService],
})
export class ViewModule {}
