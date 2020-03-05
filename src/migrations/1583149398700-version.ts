import {MigrationInterface, QueryRunner} from "typeorm";

export class version1583149398700 implements MigrationInterface {
    name = 'version1583149398700'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `annexe` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `manager` (`id` int NOT NULL AUTO_INCREMENT, `nom` varchar(191) NULL, `prenoms` varchar(191) NULL, `function` varchar(100) NULL, `email` varchar(100) NULL, `civility` enum ('Monsieur', 'Madame', 'Mademoiselle') NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `prospect` (`id` int NOT NULL AUTO_INCREMENT, `codeProspect` varchar(30) NULL, `typeSociete` int NULL, `raison_sociale` varchar(191) NULL, `email` varchar(191) NULL, `country` varchar(191) NULL, `city` varchar(191) NULL, `phone` varchar(100) NULL, `acronym` varchar(100) NULL, `status` enum ('En cours', 'En attente') NULL DEFAULT 'En cours', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `managerId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `prospection` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `code_prospection` varchar(30) NULL, `status` enum ('En attente', 'En cours') NULL DEFAULT 'En cours', `type` enum ('Prospect', 'Client') NULL DEFAULT 'Prospect', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `prospectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `mission_family` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(100) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `projet_de_mission` (`id` int NOT NULL AUTO_INCREMENT, `context` text NULL, `methodology` text NULL, `summary` text NULL, `status` enum ('En cours', 'En attente') NULL DEFAULT 'En attente', `etat` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `besoin` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `description` text NULL, `tag` varchar(191) NULL, `status` enum ('En cours', 'En attente') NULL DEFAULT 'En cours', `conclusion` text NULL, `priorite` enum ('Forte', 'Moyenne', 'Faible') NULL DEFAULT 'Forte', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `prospectionId` int NULL, `familleDeMissionId` int NULL, `projetDeMissionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `budget` (`id` int NOT NULL AUTO_INCREMENT, `label` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `categorie` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(50) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `planing` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(100) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `offre_de_mission` (`id` int NOT NULL AUTO_INCREMENT, `context` text NULL, `methodology` text NULL, `state` enum ('A envoyer', 'A ne pas envoyer') NULL DEFAULT 'A envoyer', `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `annexeId` int NULL, `projetDeMissionId` int NULL, `planingId` int NULL, `budgetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `mission_attachements` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `projetId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `response` text NULL, `descriptif` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `question_attachements` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `questionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `questionnaire` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `conclusion` text NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `prospectionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
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
        await queryRunner.query("DROP TABLE `questionnaire`", undefined);
        await queryRunner.query("DROP TABLE `question_attachements`", undefined);
        await queryRunner.query("DROP TABLE `question`", undefined);
        await queryRunner.query("DROP TABLE `mission_attachements`", undefined);
        await queryRunner.query("DROP TABLE `offre_de_mission`", undefined);
        await queryRunner.query("DROP TABLE `planing`", undefined);
        await queryRunner.query("DROP TABLE `categorie`", undefined);
        await queryRunner.query("DROP TABLE `budget`", undefined);
        await queryRunner.query("DROP TABLE `besoin`", undefined);
        await queryRunner.query("DROP TABLE `projet_de_mission`", undefined);
        await queryRunner.query("DROP TABLE `mission_family`", undefined);
        await queryRunner.query("DROP TABLE `prospection`", undefined);
        await queryRunner.query("DROP TABLE `prospect`", undefined);
        await queryRunner.query("DROP TABLE `manager`", undefined);
        await queryRunner.query("DROP TABLE `annexe`", undefined);
    }

}
