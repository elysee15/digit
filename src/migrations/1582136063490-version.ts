import { MigrationInterface, QueryRunner } from "typeorm";

export class version1582136063490 implements MigrationInterface {
  name = "version1582136063490";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `mission_attachements` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `projetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `mission_attachements` ADD CONSTRAINT `FK_57161dd850e30b97fe847d3e123` FOREIGN KEY (`projetId`) REFERENCES `projet_de_mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `mission_attachements` DROP FOREIGN KEY `FK_57161dd850e30b97fe847d3e123`",
      undefined
    );
    await queryRunner.query("DROP TABLE `mission_attachements`", undefined);
  }
}
