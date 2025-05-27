import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUserFromPayload } from '../Decorators/user.decorator';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('get-all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch()
  updatePassword(
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    @GetUserFromPayload('sub') user_id: number,
  ) {
    return this.userService.updatePassword(updateUserPasswordDto, +user_id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findOne(@GetUserFromPayload('sub') user_id: number) {
    return this.userService.findOne(+user_id);
  }
}
