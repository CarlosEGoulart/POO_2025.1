"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistController {
    constructor(db) {
        this.db = db;
    }
    crateArtist(name, bio, birthYear, instagram) {
        return this.db.createArtist(name, bio, birthYear, instagram);
    }
    getArtist(idArtist) {
        return this.db.readArtist(idArtist);
    }
    getArtistByName(name) {
        return this.db.readArtistByName(name);
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
