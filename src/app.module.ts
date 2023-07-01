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
  ],
  controllers: [UserController, SystemController, CategoryController],
  providers: [],
})
export class AppModule {}
