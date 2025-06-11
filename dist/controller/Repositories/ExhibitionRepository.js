"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExhibitionRepository {
    constructor(db) {
        this.db = db;
    }
    async create(name, description) {
        return await this.db.createExhibition(name, description);
    }
    async read(param) {
        if (typeof param === "number") {
            return await this.db.readExhibition(param);
        }
        if (typeof param === "string") {
            return await this.db.readExhibitionByName(param);
        }
        return null;
    }
    async readAll() {
        return await this.db.readAllExhibitions();
    }
    async update(id, title, description, year, imageUrl) {
        return await this.db.updateArt(id, title, description, year, imageUrl);
    }
    async delete(id) {
        return await this.db.deleteExhibition(id);
    }
    async addArtToExhibition(exhibitionId, artId) {
        return await this.db.addArtToExhibition(exhibitionId, artId);
    }
    async removeArtFromExhibition(exhibitionId, artId) {
        return await this.db.removeArtFromExhibition(exhibitionId, artId);
    }
    async listArtByExhibition(exhibitionId) {
        return await this.db.getExhibitionArts(exhibitionId);
    }
}
exports.default = ExhibitionRepository;
