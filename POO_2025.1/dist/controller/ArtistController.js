"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistController {
    constructor(db) {
        this.db = db;
    }
    crateArtist(name, bio, birthYear, instagram) {
        try {
            return this.db.createArtist(name, bio, birthYear, instagram);
        }
        catch (error) {
            console.error("Erro ao criar artista:", error.message);
            return null;
        }
    }
    getArtist(idArtist) {
        return this.db.readArtist(idArtist);
    }
    listArtists() {
        return this.db.readAllArtists();
    }
    updateArtist(idArtist, name, bio, birthYear, instagram) {
        return this.db.updateArtist(idArtist, name, bio, birthYear, instagram);
    }
    deleteArtist(idArtist) {
        return this.db.deleteArtist(idArtist);
    }
}
exports.default = ArtistController;
