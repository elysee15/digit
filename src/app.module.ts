import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './module/auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
      }),
      AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}