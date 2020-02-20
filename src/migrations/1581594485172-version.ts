import { MigrationInterface, QueryRunner } from "typeorm";

export class version1581594485172 implements MigrationInterface {
  name = "version1581594485172";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `categorie` (`id` int NOT NULL AUTO_INCREMENT, `libelle` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `manager` (`id` int NOT NULL AUTO_INCREMENT, `nom` varchar(191) NULL, `prenoms` varchar(191) NULL, `fonction` varchar(100) NULL, `email` varchar(100) NULL, `civilite` enum ('Monsieur', 'Madame', 'Mademoiselle') NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `projet_de_mission` (`id` int NOT NULL AUTO_INCREMENT, `contexte` text NULL, `methodologie` text NULL, `recapitualtif` text NULL, `status` enum ('En cours', 'En attente') NULL DEFAULT 'En attente', `etat` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `libelle` varchar(191) NULL, `reponse` text NULL, `descriptif` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE `question`", undefined);
    await queryRunner.query("DROP TABLE `projet_de_mission`", undefined);
    await queryRunner.query("DROP TABLE `manager`", undefined);
    await queryRunner.query("DROP TABLE `categorie`", undefined);
  }
}
