import {MigrationInterface, QueryRunner} from "typeorm";

export class version1582129415906 implements MigrationInterface {
    name = 'version1582129415906'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `annexe` CHANGE `libelle` `label` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `besoin` CHANGE `libelle` `label` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `budget` CHANGE `libelle` `label` text NULL", undefined);
        await queryRunner.query("CREATE TABLE `mission_family` (`id` int NOT NULL AUTO_INCREMENT, `libelle` varchar(100) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `manager` DROP COLUMN `fonction`", undefined);
        await queryRunner.query("ALTER TABLE `manager` DROP COLUMN `civilite`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `contexte`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `methodologie`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `etat`", undefined);
        await queryRunner.query("ALTER TABLE `manager` ADD `function` varchar(100) NULL", undefined);
        await queryRunner.query("ALTER TABLE `manager` ADD `civility` enum ('Monsieur', 'Madame', 'Mademoiselle') NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `context` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `methodology` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `state` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `state`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `methodology`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `context`", undefined);
        await queryRunner.query("ALTER TABLE `manager` DROP COLUMN `civility`", undefined);
        await queryRunner.query("ALTER TABLE `manager` DROP COLUMN `function`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `etat` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer'", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `methodologie` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `contexte` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `manager` ADD `civilite` enum ('Monsieur', 'Madame', 'Mademoiselle') NULL", undefined);
        await queryRunner.query("ALTER TABLE `manager` ADD `fonction` varchar(100) NULL", undefined);
        await queryRunner.query("DROP TABLE `mission_family`", undefined);
        await queryRunner.query("ALTER TABLE `budget` CHANGE `label` `libelle` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `besoin` CHANGE `label` `libelle` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `annexe` CHANGE `label` `libelle` varchar(191) NULL", undefined);
    }

}
