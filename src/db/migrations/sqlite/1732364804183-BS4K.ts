/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BS4K1732364804183 implements MigrationInterface {
    name = 'BS4K1732364804183';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "temporary_rule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "updateCnt" integer NOT NULL DEFAULT (0), "isTimeSpecification" boolean NOT NULL DEFAULT (0), "keyword" text, "halfWidthKeyword" text, "ignoreKeyword" text, "halfWidthIgnoreKeyword" text, "keyCS" boolean NOT NULL DEFAULT (0), "keyRegExp" boolean NOT NULL DEFAULT (0), "name" boolean NOT NULL DEFAULT (0), "description" boolean NOT NULL DEFAULT (0), "extended" boolean NOT NULL DEFAULT (0), "ignoreKeyCS" boolean NOT NULL DEFAULT (0), "ignoreKeyRegExp" boolean NOT NULL DEFAULT (0), "ignoreName" boolean NOT NULL DEFAULT (0), "ignoreDescription" boolean NOT NULL DEFAULT (0), "ignoreExtended" boolean NOT NULL DEFAULT (0), "GR" boolean NOT NULL DEFAULT (0), "BS" boolean NOT NULL DEFAULT (0), "CS" boolean NOT NULL DEFAULT (0), "SKY" boolean NOT NULL DEFAULT (0), "channelIds" text, "genres" text, "times" text, "isFree" boolean NOT NULL DEFAULT (0), "durationMin" integer, "durationMax" integer, "searchPeriods" text, "enable" boolean NOT NULL DEFAULT (0), "avoidDuplicate" boolean NOT NULL DEFAULT (0), "periodToAvoidDuplicate" integer, "allowEndLack" boolean NOT NULL DEFAULT (1), "tags" text, "parentDirectoryName" text, "directory" text, "recordedFormat" text, "mode1" text, "parentDirectoryName1" text, "directory1" text, "mode2" text, "parentDirectoryName2" text, "directory2" text, "mode3" text, "parentDirectoryName3" text, "directory3" text, "isDeleteOriginalAfterEncode" boolean NOT NULL DEFAULT (0), "BS4K" boolean NOT NULL DEFAULT (0))`,
        );
        await queryRunner.query(
            `INSERT INTO "temporary_rule"("id", "updateCnt", "isTimeSpecification", "keyword", "halfWidthKeyword", "ignoreKeyword", "halfWidthIgnoreKeyword", "keyCS", "keyRegExp", "name", "description", "extended", "ignoreKeyCS", "ignoreKeyRegExp", "ignoreName", "ignoreDescription", "ignoreExtended", "GR", "BS", "CS", "SKY", "channelIds", "genres", "times", "isFree", "durationMin", "durationMax", "searchPeriods", "enable", "avoidDuplicate", "periodToAvoidDuplicate", "allowEndLack", "tags", "parentDirectoryName", "directory", "recordedFormat", "mode1", "parentDirectoryName1", "directory1", "mode2", "parentDirectoryName2", "directory2", "mode3", "parentDirectoryName3", "directory3", "isDeleteOriginalAfterEncode") SELECT "id", "updateCnt", "isTimeSpecification", "keyword", "halfWidthKeyword", "ignoreKeyword", "halfWidthIgnoreKeyword", "keyCS", "keyRegExp", "name", "description", "extended", "ignoreKeyCS", "ignoreKeyRegExp", "ignoreName", "ignoreDescription", "ignoreExtended", "GR", "BS", "CS", "SKY", "channelIds", "genres", "times", "isFree", "durationMin", "durationMax", "searchPeriods", "enable", "avoidDuplicate", "periodToAvoidDuplicate", "allowEndLack", "tags", "parentDirectoryName", "directory", "recordedFormat", "mode1", "parentDirectoryName1", "directory1", "mode2", "parentDirectoryName2", "directory2", "mode3", "parentDirectoryName3", "directory3", "isDeleteOriginalAfterEncode" FROM "rule"`,
        );
        await queryRunner.query(`DROP TABLE "rule"`);
        await queryRunner.query(`ALTER TABLE "temporary_rule" RENAME TO "rule"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rule" RENAME TO "temporary_rule"`);
        await queryRunner.query(
            `CREATE TABLE "rule" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "updateCnt" integer NOT NULL DEFAULT (0), "isTimeSpecification" boolean NOT NULL DEFAULT (0), "keyword" text, "halfWidthKeyword" text, "ignoreKeyword" text, "halfWidthIgnoreKeyword" text, "keyCS" boolean NOT NULL DEFAULT (0), "keyRegExp" boolean NOT NULL DEFAULT (0), "name" boolean NOT NULL DEFAULT (0), "description" boolean NOT NULL DEFAULT (0), "extended" boolean NOT NULL DEFAULT (0), "ignoreKeyCS" boolean NOT NULL DEFAULT (0), "ignoreKeyRegExp" boolean NOT NULL DEFAULT (0), "ignoreName" boolean NOT NULL DEFAULT (0), "ignoreDescription" boolean NOT NULL DEFAULT (0), "ignoreExtended" boolean NOT NULL DEFAULT (0), "GR" boolean NOT NULL DEFAULT (0), "BS" boolean NOT NULL DEFAULT (0), "CS" boolean NOT NULL DEFAULT (0), "SKY" boolean NOT NULL DEFAULT (0), "channelIds" text, "genres" text, "times" text, "isFree" boolean NOT NULL DEFAULT (0), "durationMin" integer, "durationMax" integer, "searchPeriods" text, "enable" boolean NOT NULL DEFAULT (0), "avoidDuplicate" boolean NOT NULL DEFAULT (0), "periodToAvoidDuplicate" integer, "allowEndLack" boolean NOT NULL DEFAULT (1), "tags" text, "parentDirectoryName" text, "directory" text, "recordedFormat" text, "mode1" text, "parentDirectoryName1" text, "directory1" text, "mode2" text, "parentDirectoryName2" text, "directory2" text, "mode3" text, "parentDirectoryName3" text, "directory3" text, "isDeleteOriginalAfterEncode" boolean NOT NULL DEFAULT (0))`,
        );
        await queryRunner.query(
            `INSERT INTO "rule"("id", "updateCnt", "isTimeSpecification", "keyword", "halfWidthKeyword", "ignoreKeyword", "halfWidthIgnoreKeyword", "keyCS", "keyRegExp", "name", "description", "extended", "ignoreKeyCS", "ignoreKeyRegExp", "ignoreName", "ignoreDescription", "ignoreExtended", "GR", "BS", "CS", "SKY", "channelIds", "genres", "times", "isFree", "durationMin", "durationMax", "searchPeriods", "enable", "avoidDuplicate", "periodToAvoidDuplicate", "allowEndLack", "tags", "parentDirectoryName", "directory", "recordedFormat", "mode1", "parentDirectoryName1", "directory1", "mode2", "parentDirectoryName2", "directory2", "mode3", "parentDirectoryName3", "directory3", "isDeleteOriginalAfterEncode") SELECT "id", "updateCnt", "isTimeSpecification", "keyword", "halfWidthKeyword", "ignoreKeyword", "halfWidthIgnoreKeyword", "keyCS", "keyRegExp", "name", "description", "extended", "ignoreKeyCS", "ignoreKeyRegExp", "ignoreName", "ignoreDescription", "ignoreExtended", "GR", "BS", "CS", "SKY", "channelIds", "genres", "times", "isFree", "durationMin", "durationMax", "searchPeriods", "enable", "avoidDuplicate", "periodToAvoidDuplicate", "allowEndLack", "tags", "parentDirectoryName", "directory", "recordedFormat", "mode1", "parentDirectoryName1", "directory1", "mode2", "parentDirectoryName2", "directory2", "mode3", "parentDirectoryName3", "directory3", "isDeleteOriginalAfterEncode" FROM "temporary_rule"`,
        );
        await queryRunner.query(`DROP TABLE "temporary_rule"`);
    }
}