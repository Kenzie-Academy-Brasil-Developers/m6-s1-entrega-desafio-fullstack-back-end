import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const contact = await this.prisma.contact.findFirst({
      where: { id: parseInt(request.params.contactId) },
    });

    if (request.user.id === contact.ownerId) {
      return true;
    }

    throw new HttpException(
      `You are not this contact owner`,
      HttpStatus.FORBIDDEN,
    );
  }
}
