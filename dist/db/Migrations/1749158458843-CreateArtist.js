"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArtist1749158458843 = void 0;
const typeorm_1 = require("typeorm");
class CreateArtist1749158458843 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    ;
    async down(queryRunner) {
        await queryRunner.dropTable("artist");
    }
}
exports.CreateArtist1749158458843 = CreateArtist1749158458843;
