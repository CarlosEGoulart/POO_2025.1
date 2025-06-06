"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistController {
    constructor(db) {
        this.db = db;
    }
    async createArtist(name, bio, birthYear, instagram) {
        return await this.db.createArtist(name, bio, birthYear, instagram);
    }
    async getArtist(param, extra) {
        if (typeof param === "number") {
            return await this.db.readArtist(param);
        }
        else if (typeof param === "string") {
            return await this.db.readArtistByName(param);
        }
        return null;
    }
    async listArtists() {
        return await this.db.readAllArtists();
    }
    async updateArtist(param, name, bio, birthYear, instagram, extra) {
        if (typeof param === "number") {
            return await this.db.updateArtist(param, name, bio, birthYear, instagram);
        }
        else if (typeof param === "string") {
            const artist = await this.db.readArtistByName(param);
            if (artist) {
                return await this.db.updateArtist(artist.getId(), param, bio, birthYear, instagram);
            }
        }
        return false;
    }
    async deleteArtist(param, extra) {
        if (typeof param === "number") {
            return await this.db.deleteArtist(param);
        }
        else if (typeof param === "string") {
            const artist = await this.db.readArtistByName(param);
            if (artist) {
                return this.db.deleteArtist(artist.getId());
            }
        }
        return false;
    }
}
exports.default = ArtistController;
