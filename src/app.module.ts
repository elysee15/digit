import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
      })
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}