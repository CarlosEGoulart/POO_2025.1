"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericController_1 = __importDefault(require("./GenericController"));
const ArtistRepository_1 = __importDefault(require("../Repositories/ArtistRepository"));
class ArtistController {
    constructor(db) {
        this.repository = new ArtistRepository_1.default(db);
        this.controller = new GenericController_1.default(this.repository);
    }
    async createArtist(name, bio, birthYear, instagram) {
        return await this.repository.create(name, bio, birthYear, instagram);
    }
    async getArtist(param) {
        return await this.controller.read(param);
    }
    async listArtists() {
        return await this.controller.list();
    }
    async updateArtist(param, name, bio, birthYear, instagram) {
        return await this.controller.update(param, name, bio, birthYear, instagram);
    }
    async deleteArtist(param) {
        return await this.controller.delete(param);
    }
}
exports.default = ArtistController;
