import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma.service";
import { plainToInstance } from "class-transformer";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		const user = {
			...createUserDto,
			password: await bcrypt.hash(createUserDto.password, 10),
		};
		const createdUser = await this.prisma.user.create({ data: user });

		return plainToInstance(User, createdUser);
	}

	async findAll() {
		const users = await this.prisma.user.findMany();
		return plainToInstance(User, users);
	}

	async findOne(id: number) {
		const user = await this.prisma.user.findFirst({ where: { id } });
		return plainToInstance(User, user);
	}

	async findByEmail(email: string) {
		const user = await this.prisma.user.findFirst({ where: { email } });
		return plainToInstance(User, user);
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = this.prisma.user.update({
			data: updateUserDto,
			where: { id },
		});
		return plainToInstance(User, user);
	}

	async remove(id: number) {
		await this.prisma.user.delete({ where: { id } });
		return;
	}
}
