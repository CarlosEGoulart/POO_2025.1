"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistRepository {
    constructor(db) {
        this.db = db;
    }
    async create(name, bio, birthYear, instagram) {
        return await this.db.createArtist(name, bio, birthYear, instagram);
    }
    async read(param) {
        if (typeof param === "number") {
            return await this.db.readArtist(param);
        }
        if (typeof param === "string") {
            return await this.db.readArtistByName(param);
        }
        return null;
    }
    async readAll() {
        return await this.db.readAllArtists();
    }
    async update(id, name, bio, birthYear, instagram) {
        return await this.db.updateArtist(id, name, bio, birthYear, instagram);
    }
    async delete(id) {
        return await this.db.deleteArtist(id);
    }
}
exports.default = ArtistRepository;
