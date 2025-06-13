"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericController_1 = __importDefault(require("./GenericController"));
const ArtRepository_1 = __importDefault(require("../Repositories/ArtRepository"));
class ArtController {
    constructor(db) {
        this.repository = new ArtRepository_1.default(db);
        this.controller = new GenericController_1.default(this.repository);
    }
    async createArt(title, description, year, imageUrl) {
        return await this.repository.create(title, description, year, imageUrl);
    }
    async getArt(param) {
        return await this.controller.read(param);
    }
    async listArt() {
        return await this.controller.list();
    }
    async updateArt(title, description, year, imageUrl) {
        return await this.controller.update(title, description, year, imageUrl);
    }
    async deleteArt(param) {
        return await this.controller.delete(param);
    }
    async assignArtistToArt(artId, artist) {
        return await this.repository.assignArtistToArt(artId, artist);
    }
}
exports.default = ArtController;
