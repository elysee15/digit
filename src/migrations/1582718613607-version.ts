import { MigrationInterface, QueryRunner } from "typeorm";

export class version1582718613607 implements MigrationInterface {
  name = "version1582718613607";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `mission_family` CHANGE `libelle` `label` varchar(100) NULL",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `mission_family` CHANGE `label` `libelle` varchar(100) NULL",
      undefined
    );
  }
}
