import { MigrationInterface, QueryRunner } from "typeorm";

export class version1582197090611 implements MigrationInterface {
  name = "version1582197090611";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `questionnaire` CHANGE `libelle` `label` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `pays`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `ville`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `telephone`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `sigle`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` DROP COLUMN `contexte`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` DROP COLUMN `methodologie`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` DROP COLUMN `recapitualtif`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` DROP COLUMN `libelle`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` DROP COLUMN `reponse`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `country` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `city` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `phone` varchar(100) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `acronym` varchar(100) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` ADD `context` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` ADD `methodology` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` ADD `summary` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` ADD `label` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` ADD `response` text NULL",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `question` DROP COLUMN `response`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` DROP COLUMN `label`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` DROP COLUMN `summary`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` DROP COLUMN `methodology`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` DROP COLUMN `context`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `acronym`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `phone`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `city`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` DROP COLUMN `country`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` ADD `reponse` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `question` ADD `libelle` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` ADD `recapitualtif` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` ADD `methodologie` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `projet_de_mission` ADD `contexte` text NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `sigle` varchar(100) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `telephone` varchar(100) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `ville` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `prospect` ADD `pays` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `questionnaire` CHANGE `label` `libelle` varchar(191) NULL",
      undefined
    );
  }
}
