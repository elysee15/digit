import {MigrationInterface, QueryRunner} from "typeorm";

export class version1582155708597 implements MigrationInterface {
    name = 'version1582155708597'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `question_attachements` (`id` int NOT NULL AUTO_INCREMENT, `label` varchar(191) NULL, `created_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `created_by` varchar(100) NULL, `updated_by` varchar(100) NULL, `questionId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `question_attachements` ADD CONSTRAINT `FK_5bec1ad008e3bd7a367a6204199` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `question_attachements` DROP FOREIGN KEY `FK_5bec1ad008e3bd7a367a6204199`", undefined);
        await queryRunner.query("DROP TABLE `question_attachements`", undefined);
    }

}
