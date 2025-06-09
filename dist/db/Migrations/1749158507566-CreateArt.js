"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArt1749158507566 = void 0;
const typeorm_1 = require("typeorm");
class CreateArt1749158507566 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    ;
    async down(queryRunner) {
        await queryRunner.dropTable("art");
    }
}
exports.CreateArt1749158507566 = CreateArt1749158507566;
