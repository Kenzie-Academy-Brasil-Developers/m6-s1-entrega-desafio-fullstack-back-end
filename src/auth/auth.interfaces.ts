import { Request } from 'express';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

export interface AuthRequest extends Request {
  user: LoginUserDto;
}

export interface UserPayload {
  email: string;
  id: string;
  iat?: number;
  exp?: number;
}

export interface UserFromJWT {
  id: string;
  email: string;
  name?: string;
}

export interface UserToken {
  access_token: string;
}
