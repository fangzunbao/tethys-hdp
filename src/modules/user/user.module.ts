import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserOtherAccount } from './entities/other.account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserOtherAccount]),
    ConfigModule,
    HttpModule,
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
