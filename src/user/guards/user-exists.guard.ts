import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const user = await this.prisma.user.findFirst({
      where: { id: parseInt(request.params.userId) },
    });

    if (!user) {
      throw new HttpException(`This user does not exist`, HttpStatus.NOT_FOUND);
    }

    request.user = user;

    return true;
  }
}
