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
  Request,
} from '@nestjs/common';
import { UserExistsGuard } from 'src/user/guards/user-exists.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactExistsGuard } from './guards/contact-exists.guard';
import { IsOwnerGuard } from './guards/is-owner-guard.guard';

@Controller('users')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('contacts')
  create(@Request() request, @Body() createContactDto: CreateContactDto) {
    return this.contactService.create(request.user, createContactDto);
  }

  // @Get('contacts')
  // findAll() {
  //   return this.contactService.findAll();
  // }

  @Get('contacts')
  findAllUserContacts(@Request() request) {
    return this.contactService.findAllUserContacts(request.user);
  }

  @Get('contacts/:contactId')
  @UseGuards(ContactExistsGuard, IsOwnerGuard)
  findOne(@Param('contactId') contactId: string) {
    return this.contactService.findOne(+contactId);
  }

  @Patch('contacts/:contactId')
  @UseGuards(ContactExistsGuard, IsOwnerGuard)
  update(
    @Param('contactId') contactId: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(+contactId, updateContactDto);
  }

  @Delete('contacts/:contactId')
  @UseGuards(ContactExistsGuard, IsOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('contactId') contactId: string) {
    return this.contactService.remove(+contactId);
  }
}
