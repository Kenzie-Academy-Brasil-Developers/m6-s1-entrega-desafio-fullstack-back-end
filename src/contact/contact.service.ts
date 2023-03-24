import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(user, createContactDto: CreateContactDto) {
    const createdContact = await this.prisma.contact.create({
      data: { ...createContactDto, ownerId: user.id },
    });

    return createdContact;
  }

  async findAllUserContacts(user) {
    const userId = +user.id;
    return await this.prisma.contact.findMany({
      where: { ownerId: userId },
    });
  }

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(contactId: number) {
    const contact = await this.prisma.contact.findFirst({
      where: { id: contactId },
    });

    return contact;
  }

  async update(contactId: number, updateContactDto: UpdateContactDto) {
    const updatedContact = await this.prisma.contact.update({
      data: updateContactDto,
      where: { id: contactId },
    });
    return updatedContact;
  }

  async remove(contactId: number) {
    await this.prisma.contact.delete({ where: { id: contactId } });
  }
}
