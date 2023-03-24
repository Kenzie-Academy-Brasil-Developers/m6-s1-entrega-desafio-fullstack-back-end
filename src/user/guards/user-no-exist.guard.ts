import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserNoExistGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = await this.prisma.user.findFirst({
      where: { email: request.body.email },
    });

    if (user) {
      throw new HttpException(
        `This user already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
