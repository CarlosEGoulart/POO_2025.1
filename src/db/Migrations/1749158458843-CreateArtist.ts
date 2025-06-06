import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtist1749158458843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "artist",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "bio",
                        type: "varchar"
                    },
                    {
                        name: "birthYear",
                        type: "int"
                    },
                    {
                        name: "instagram",
                        type: "varchar"
                    }
                ]
            })
        )            
    };
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("artist");
    }

}
