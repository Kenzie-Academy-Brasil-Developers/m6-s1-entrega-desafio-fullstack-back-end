import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { UserPayload, UserToken } from "./auth.interfaces";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/user/dto/login-user.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}
	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email);

		if (user) {
			const isPasswordValid = await bcrypt.compare(
				password,
				user.password
			);
			if (isPasswordValid) {
				return { ...user, password: undefined };
			}
		}

		throw new Error("Email address or password provided is incorrect");
	}
	login(user: LoginUserDto): UserToken {
		const payload: UserPayload = {
			email: user.email,
			id: user.id,
		};

		const jwtToken = this.jwtService.sign(payload);

		return {
			access_token: jwtToken,
		};
	}
}
