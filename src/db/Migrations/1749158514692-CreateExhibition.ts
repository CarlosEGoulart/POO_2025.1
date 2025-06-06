import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExhibition1749158514692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "exhibition",
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
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "artWorks",
                        type: "int"
                    },
                ]
            })
        )            
    };

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exhibition");
    }

}
