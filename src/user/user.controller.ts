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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @UseGuards(UserExistsGuard)
  findOne(@Param('userId') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':userId')
  @UseGuards(UserExistsGuard)
  update(@Param('userId') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(UserExistsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') id: number) {
    return this.userService.remove(+id);
  }
}
