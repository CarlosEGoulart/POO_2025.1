"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExhibition1749158514692 = void 0;
const typeorm_1 = require("typeorm");
class CreateExhibition1749158514692 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    ;
    async down(queryRunner) {
        await queryRunner.dropTable("exhibition");
    }
}
exports.CreateExhibition1749158514692 = CreateExhibition1749158514692;
