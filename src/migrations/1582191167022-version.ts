import {MigrationInterface, QueryRunner} from "typeorm";

export class version1582191167022 implements MigrationInterface {
    name = 'version1582191167022'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `planing` CHANGE `libelle` `label` varchar(100) NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `planing` CHANGE `label` `libelle` varchar(100) NULL", undefined);
    }

}
