import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import configuration from './config/index';
import { UserController } from './modules/user/user.controller';
import { AuthModule } from './modules/auth/auth.module';
import { SystemModule } from './modules/system/system.module';
import { SystemController } from './modules/system/system.controller';
import { CategoryModule } from './modules/resource/category/category.module';
import { CategoryController } from './modules/resource/category/category.controller';
import { LibraryBookModule } from './modules/book/library/library.module';
import { LibraryBookController } from './modules/book/library/library.controller';
import { ReadingBookModule } from './modules/book/reading/reading.module';
import { ReadingBookController } from './modules/book/reading/reading.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const baseConfig = { ...config.get('db.mysql') };
        return {
          type: 'mysql',
          entities: ['dist/**/*.entity{.ts,.js}'],
          keepConnectionAlive: true,
          ...baseConfig,
        } as TypeOrmModuleOptions;
      },
    }),
    UserModule,
    AuthModule,
    SystemModule,
    CategoryModule,
    LibraryBookModule,
    ReadingBookModule,
  ],
  controllers: [
    UserController,
    SystemController,
    CategoryController,
    LibraryBookController,
    ReadingBookController,
  ],
  providers: [],
})
export class AppModule {}
