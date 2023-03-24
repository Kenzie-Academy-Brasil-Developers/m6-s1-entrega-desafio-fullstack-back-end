import { Module } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [ContactModule, UserModule, AuthModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
