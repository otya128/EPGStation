import { MigrationInterface, QueryRunner } from "typeorm";

export class BS4K1733056476132 implements MigrationInterface {
    name = 'BS4K1733056476132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rule\` ADD \`BS4K\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rule\` DROP COLUMN \`BS4K\``);
    }

}
