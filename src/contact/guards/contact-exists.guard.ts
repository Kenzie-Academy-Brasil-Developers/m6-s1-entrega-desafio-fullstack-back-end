import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ContactExistsGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const contact = await this.prisma.contact.findFirst({
      where: { id: parseInt(request.params.contactId) },
    });

    if (!contact) {
      throw new HttpException(
        `This contact does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return true;
  }
}
