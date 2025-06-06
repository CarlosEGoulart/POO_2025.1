"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtController {
    constructor(db) {
        this.db = db;
    }
    async createArt(title, description, year, imageUrl) {
        return await this.db.createArt(title, description, year, imageUrl);
    }
    async getArt(param, extra) {
        if (typeof param === "number") {
            return await this.db.readArt(param);
        }
        else if (typeof param === "string") {
            return await this.db.readArtByTitle(param);
        }
        return null;
    }
    async listArts() {
        return await this.db.readAllArts();
    }
    async updateArt(param, title, description, year, imageUrl) {
        if (typeof param === "number") {
            return await this.db.updateArt(param, title, description, year, imageUrl);
        }
        else if (typeof param === "string") {
            const art = await this.db.readArtByTitle(param);
            if (art) {
                return await this.db.updateArt(art.getId(), title, description, year, imageUrl);
            }
        }
        return false;
    }
    async deleteArt(param) {
        if (typeof param === "number") {
            return this.db.deleteArt(param);
        }
        else if (typeof param === "string") {
            const art = await this.db.readArtByTitle(param);
            if (art) {
                return this.db.deleteArt(art.getId());
            }
        }
        return false;
    }
    async assignArtistToArt(artId, artistId) {
        const artist = await this.db.readArtist(artistId);
        if (artist) {
            return this.db.assignArtistToArt(artId, artist);
        }
        return false;
    }
}
exports.default = ArtController;
