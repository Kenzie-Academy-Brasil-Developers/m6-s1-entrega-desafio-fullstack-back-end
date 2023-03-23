import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserExistsGuard } from 'src/user/guards/user-exists.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactExistsGuard } from './guards/contact-exists.guard';

@Controller('users')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post(':userId/contacts')
  @UseGuards(UserExistsGuard)
  create(
    @Param('userId') userId: string,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.create(+userId, createContactDto);
  }

  @Get('/contacts')
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':userId/contacts')
  @UseGuards(UserExistsGuard)
  findAllUserContacts(@Param('userId') userId: string) {
    return this.contactService.findAllUserContacts(+userId);
  }

  @Get('contacts/:contactId')
  @UseGuards(ContactExistsGuard)
  findOne(@Param('contactId') contactId: string) {
    return this.contactService.findOne(+contactId);
  }

  @Patch('contacts/:contactId')
  @UseGuards(ContactExistsGuard)
  update(
    @Param('contactId') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(+contactId, updateContactDto);
  }

  @Delete('contacts/:contactId')
  @UseGuards(ContactExistsGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('contactId') contactId: string) {
    return this.contactService.remove(+contactId);
  }
}
