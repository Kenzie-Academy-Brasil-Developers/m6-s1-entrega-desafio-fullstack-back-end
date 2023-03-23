import { Module } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { APP_PIPE } from '@nestjs/core';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ContactModule, UserModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
