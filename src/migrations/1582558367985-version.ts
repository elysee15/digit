import {MigrationInterface, QueryRunner} from "typeorm";

export class version1582558367985 implements MigrationInterface {
    name = 'version1582558367985'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prospection` CHANGE `libelle` `label` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `besoin` CHANGE `libelle` `label` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `questionnaire` CHANGE `libelle` `label` varchar(191) NULL", undefined);
        await queryRunner.query("CREATE TABLE `annexe` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `manager` (`id` int NOT NULL AUTO_INCREMENT, `nom` varchar(191) NULL, `prenoms` varchar(191) NULL, `function` varchar(100) NULL, `email` varchar(100) NULL, `civility` enum ('Monsieur', 'Madame', 'Mademoiselle') NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `mission_family` (`id` int NOT NULL AUTO_INCREMENT, `libelle` varchar(100) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `projet_de_mission` (`id` int NOT NULL AUTO_INCREMENT, `context` text NULL, `methodology` text NULL, `summary` text NULL, `status` enum ('En cours', 'En attente') NULL DEFAULT 'En attente', `etat` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `budget` (`id` int NOT NULL AUTO_INCREMENT, `label` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `categorie` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(50) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `planing` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(100) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `mission_attachements` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `projetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `response` text NULL, `descriptif` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question_attachements` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `questionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `pays`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `ville`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `telephone`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `sigle`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `contexte`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `methodologie`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `etat`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `country` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `city` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `phone` varchar(100) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `acronym` varchar(100) NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `context` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `methodology` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `state` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer'", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD CONSTRAINT `FK_cbff866bd6dc3d92d02769c638f` FOREIGN KEY (`managerId`) REFERENCES `manager`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `prospection` ADD CONSTRAINT `FK_748f12cc88186dda99c44f6154f` FOREIGN KEY (`prospectId`) REFERENCES `prospect`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `besoin` ADD CONSTRAINT `FK_0199ea19500fe85de4cd9940877` FOREIGN KEY (`prospectionId`) REFERENCES `prospection`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `besoin` ADD CONSTRAINT `FK_6c51a293a6b1919ce5490b0c2f8` FOREIGN KEY (`familleDeMissionId`) REFERENCES `mission_family`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `besoin` ADD CONSTRAINT `FK_f8c0c71eee7cde4476735043b4e` FOREIGN KEY (`projetDeMissionId`) REFERENCES `projet_de_mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD CONSTRAINT `FK_dcd5a29448d17a3140ea11af906` FOREIGN KEY (`annexeId`) REFERENCES `annexe`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD CONSTRAINT `FK_fe93a20870f345e9faf700ce469` FOREIGN KEY (`projetDeMissionId`) REFERENCES `projet_de_mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD CONSTRAINT `FK_f77f7bafb198cba9e126f3e2462` FOREIGN KEY (`planingId`) REFERENCES `planing`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD CONSTRAINT `FK_0cac7d55a5a9d7d5996fe690757` FOREIGN KEY (`budgetId`) REFERENCES `budget`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `mission_attachements` ADD CONSTRAINT `FK_57161dd850e30b97fe847d3e123` FOREIGN KEY (`projetId`) REFERENCES `projet_de_mission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `question_attachements` ADD CONSTRAINT `FK_5bec1ad008e3bd7a367a6204199` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `questionnaire` ADD CONSTRAINT `FK_10b9a88cd6bfddcddd23709988b` FOREIGN KEY (`prospectionId`) REFERENCES `prospection`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `questionnaire` DROP FOREIGN KEY `FK_10b9a88cd6bfddcddd23709988b`", undefined);
        await queryRunner.query("ALTER TABLE `question_attachements` DROP FOREIGN KEY `FK_5bec1ad008e3bd7a367a6204199`", undefined);
        await queryRunner.query("ALTER TABLE `mission_attachements` DROP FOREIGN KEY `FK_57161dd850e30b97fe847d3e123`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP FOREIGN KEY `FK_0cac7d55a5a9d7d5996fe690757`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP FOREIGN KEY `FK_f77f7bafb198cba9e126f3e2462`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP FOREIGN KEY `FK_fe93a20870f345e9faf700ce469`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP FOREIGN KEY `FK_dcd5a29448d17a3140ea11af906`", undefined);
        await queryRunner.query("ALTER TABLE `besoin` DROP FOREIGN KEY `FK_f8c0c71eee7cde4476735043b4e`", undefined);
        await queryRunner.query("ALTER TABLE `besoin` DROP FOREIGN KEY `FK_6c51a293a6b1919ce5490b0c2f8`", undefined);
        await queryRunner.query("ALTER TABLE `besoin` DROP FOREIGN KEY `FK_0199ea19500fe85de4cd9940877`", undefined);
        await queryRunner.query("ALTER TABLE `prospection` DROP FOREIGN KEY `FK_748f12cc88186dda99c44f6154f`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP FOREIGN KEY `FK_cbff866bd6dc3d92d02769c638f`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `state`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `methodology`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` DROP COLUMN `context`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `acronym`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `phone`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `city`", undefined);
        await queryRunner.query("ALTER TABLE `prospect` DROP COLUMN `country`", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `etat` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer'", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `methodologie` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `offre_de_mission` ADD `contexte` text NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `sigle` varchar(100) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `telephone` varchar(100) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `ville` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospect` ADD `pays` varchar(191) NULL", undefined);
        await queryRunner.query("DROP TABLE `question_attachements`", undefined);
        await queryRunner.query("DROP TABLE `question`", undefined);
        await queryRunner.query("DROP TABLE `mission_attachements`", undefined);
        await queryRunner.query("DROP TABLE `planing`", undefined);
        await queryRunner.query("DROP TABLE `categorie`", undefined);
        await queryRunner.query("DROP TABLE `budget`", undefined);
        await queryRunner.query("DROP TABLE `projet_de_mission`", undefined);
        await queryRunner.query("DROP TABLE `mission_family`", undefined);
        await queryRunner.query("DROP TABLE `manager`", undefined);
        await queryRunner.query("DROP TABLE `annexe`", undefined);
        await queryRunner.query("ALTER TABLE `questionnaire` CHANGE `label` `libelle` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `besoin` CHANGE `label` `libelle` varchar(191) NULL", undefined);
        await queryRunner.query("ALTER TABLE `prospection` CHANGE `label` `libelle` varchar(191) NULL", undefined);
    }

}
