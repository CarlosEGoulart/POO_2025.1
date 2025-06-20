"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExhibitionController {
    constructor(db) {
        this.db = db;
    }
    async createExhibition(name, description, artWorks = []) {
        return await this.db.createExhibition(name, description, artWorks);
    }
    async getExhibition(param) {
        if (typeof param === "number") {
            return await this.db.readExhibition(param);
        }
        else if (typeof param === "string") {
            return await this.db.readExhibitionByName(param);
        }
        return null;
    }
    async listExhibitions() {
        return await this.db.readAllExhibitions();
    }
    async updateExhibition(param, name, description, artWorks) {
        if (typeof param === "number") {
            return await this.db.updateExhibition(param, name, description, artWorks);
        }
        else if (typeof param === "string") {
            const exhibition = await this.db.readExhibitionByName(param);
            if (exhibition) {
                return await this.db.updateExhibition(exhibition.getId(), name, description, artWorks);
            }
        }
        return false;
    }
    async deleteExhibition(param) {
        if (typeof param === "number") {
            return await this.db.deleteExhibition(param);
        }
        else if (typeof param === "string") {
            const exhibition = await this.db.readExhibitionByName(param);
            if (exhibition) {
                return await this.db.deleteExhibition(exhibition.getId());
            }
        }
        return false;
    }
    async addArtToExhibition(idExhibition, idArt) {
        return await this.db.addArtToExhibition(idExhibition, idArt);
    }
    async removeArtFromExhibition(idExhibition, idArt) {
        return await this.db.removeArtFromExhibition(idExhibition, idArt);
    }
    async getExhibitionArts(idExhibition) {
        return await this.db.getExhibitionArts(idExhibition);
    }
}
exports.default = ExhibitionController;
