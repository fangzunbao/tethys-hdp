import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import configuration from './config/index';
import { UserController } from './modules/user/user.controller';
import { AuthModule } from './modules/auth/auth.module';

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
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
