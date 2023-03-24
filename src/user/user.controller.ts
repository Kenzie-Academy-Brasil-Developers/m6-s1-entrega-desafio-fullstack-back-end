import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { UserExistsGuard } from './guards/user-exists.guard';
import { Request } from '@nestjs/common/decorators/http/route-params.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserNoExistGuard } from './guards/user-no-exist.guard';
import { RequestingUserIsSubjectUserGuard } from './guards/requesting-user-is-subject-user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @IsPublic()
  @UseGuards(UserNoExistGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @IsPublic()
  findAll(@Request() request: Request) {
    return this.userService.findAll();
  }

  @Get(':userId')
  @UseGuards(UserExistsGuard)
  findOne(@Param('userId') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':userId')
  @UseGuards(UserExistsGuard, RequestingUserIsSubjectUserGuard)
  update(@Param('userId') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(UserExistsGuard, RequestingUserIsSubjectUserGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') id: number) {
    return this.userService.remove(+id);
  }
}
