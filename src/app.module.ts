import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './module/auth/auth.module';
import { AnnexeModule } from './module/annexe/annexe.module';
import { PlaningModule } from './module/planing/planing.module';
import { BudgetModule } from './module/budget/budget.module';
import { CategorieModule } from './module/categorie/categorie.module';
import { QuestionModule } from './module/question/question.module';
import { ManagerModule } from './module/manager/manager.module';
import { ProjetDeMissionModule } from './module/projet-de-mission/projet-de-mission.module';
import { FamilleDeMissionModule } from './module/famille-de-mission/famille-de-mission.module';
import { PieceJointeMissionModule } from './module/piece-jointe-mission/piece-jointe-mission.module';
import { OffreDeMissionModule } from './module/offre-de-mission/offre-de-mission.module';

@Module({
  imports: [
      TypeOrmModule.forRoot(),
      ConfigModule.forRoot({
          isGlobal: true,
          expandVariables: true,
      }),
      AuthModule, AnnexeModule, PlaningModule, BudgetModule, CategorieModule, QuestionModule,ProjetDeMissionModule, ManagerModule, FamilleDeMissionModule, PieceJointeMissionModule, OffreDeMissionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}