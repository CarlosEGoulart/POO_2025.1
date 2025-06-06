import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArt1749158507566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "art",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "year",
                        type: "int"
                    },
                    {
                        name: "imageUrl",
                        type: "varchar"
                    },
                    {
                        name: "artistId",
                        type: "int"
                    }
                ]
            })
        )            
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("art");
    }

}
