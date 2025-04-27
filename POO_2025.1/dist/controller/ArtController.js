"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtController {
    constructor(db) {
        this.db = db;
    }
    createArt(title, description, year) {
        try {
            return this.db.createArt(title, description, year);
        }
        catch (error) {
            console.error("Erro ao criar obra:", error.message);
            return null;
        }
    }
    getArt(idArt) {
        return this.db.readArt(idArt);
    }
    listArts() {
        return this.db.readAllArts();
    }
    updateArt(idArt, title, description, year) {
        return this.db.updateArt(idArt, title, description, year);
    }
    deleteArt(idArt) {
        return this.db.deleteArt(idArt);
    }
    assignArtistToArt(idArt, artist) {
        return this.db.assignArtistToArt(idArt, artist);
    }
}
exports.default = ArtController;
