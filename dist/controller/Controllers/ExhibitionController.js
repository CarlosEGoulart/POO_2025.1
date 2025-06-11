"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericController_1 = __importDefault(require("./GenericController"));
const ExhibitionRepository_1 = __importDefault(require("../Repositories/ExhibitionRepository"));
class ExhibitionController {
    constructor(db) {
        this.repository = new ExhibitionRepository_1.default(db);
        this.controller = new GenericController_1.default(this.repository);
    }
    async createExhibition(name, description) {
        return await this.repository.create(name, description);
    }
    async getExhibition(param) {
        return await this.controller.read(param);
    }
    async listExhibitions() {
        return await this.controller.list();
    }
    async updateExhibition(id, name, description) {
        return await this.controller.update(id, name, description);
    }
    async deleteExhibition(param) {
        return await this.controller.delete(param);
    }
    async addArtToExhibition(exhibitionId, artId) {
        return await this.repository.addArtToExhibition(exhibitionId, artId);
    }
    async removeArtFromExhibition(exhibitionId, artId) {
        return await this.repository.removeArtFromExhibition(exhibitionId, artId);
    }
    async listArtByExhibition(exhibitionId) {
        return await this.repository.listArtByExhibition(exhibitionId);
    }
}
exports.default = ExhibitionController;
