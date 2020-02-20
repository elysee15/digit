import { MigrationInterface, QueryRunner } from "typeorm";

export class version1581591891179 implements MigrationInterface {
  name = "version1581591891179";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `budget` (`id` int NOT NULL AUTO_INCREMENT, `libelle` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `planing` (`id` int NOT NULL AUTO_INCREMENT, `libelle` varchar(100) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE `planing`", undefined);
    await queryRunner.query("DROP TABLE `budget`", undefined);
  }
}
