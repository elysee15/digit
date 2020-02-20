import { MigrationInterface, QueryRunner } from "typeorm";

export class version1582114554132 implements MigrationInterface {
  name = "version1582114554132";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `categorie` CHANGE `libelle` `label` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `annexe` DROP COLUMN `libelle`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `annexe` ADD `libelle` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `categorie` DROP COLUMN `label`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `categorie` ADD `label` varchar(50) NULL",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `categorie` DROP COLUMN `label`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `categorie` ADD `label` varchar(191) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `annexe` DROP COLUMN `libelle`",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `annexe` ADD `libelle` varchar(100) NULL",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `categorie` CHANGE `label` `libelle` varchar(191) NULL",
      undefined
    );
  }
}
