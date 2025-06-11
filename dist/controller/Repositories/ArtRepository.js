"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtRepository {
    constructor(db) {
        this.db = db;
    }
    async create(title, description, year, imageUrl) {
        return await this.db.createArt(title, description, year, imageUrl);
    }
    async read(param) {
        if (typeof param === "number") {
            return await this.db.readArt(param);
        }
        if (typeof param === "string") {
            return await this.db.readArtByTitle(param);
        }
        return null;
    }
    async readAll() {
        return await this.db.readAllArts();
    }
    async update(id, title, description, year, imageUrl) {
        return await this.db.updateArt(id, title, description, year, imageUrl);
    }
    async delete(id) {
        return await this.db.deleteArt(id);
    }
    async assignArtistToArt(artId, artist) {
        return await this.db.assignArtistToArt(artId, artist);
    }
}
exports.default = ArtRepository;
