import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createdUser = await this.prisma.user.create({ data: user });

    return createdUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
    return user;
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    return;
  }
}
