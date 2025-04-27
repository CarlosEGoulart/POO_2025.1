"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExhibitionController {
    constructor(db) {
        this.db = db;
    }
    createExhibition(name, description, artWorks = []) {
        try {
            return this.db.createExhibition(name, description, artWorks);
        }
        catch (error) {
            console.error("Erro ao criar exposição:", error.message);
            return null;
        }
    }
    getExhibition(idExhibition) {
        return this.db.readExhibition(idExhibition);
    }
    listExhibitions() {
        return this.db.readAllExhibitions();
    }
    updateExhibition(idExhibition, name, description, artWorks) {
        return this.db.updateExhibition(idExhibition, name, description, artWorks);
    }
    deleteExhibition(idExhibition) {
        return this.db.deleteExhibition(idExhibition);
    }
    addArtToExhibition(idExhibition, idArt) {
        return this.db.addArtToExhibition(idExhibition, idArt);
    }
    removeArtFromExhibition(idExhibition, idArt) {
        return this.db.removeArtFromExhibition(idExhibition, idArt);
    }
    getExhibitionArts(idExhibition) {
        return this.db.getExhibitionArts(idExhibition);
    }
    listAllArts() {
        return this.db.readAllArts();
    }
    getArt(idArt) {
        return this.db.readArt(idArt);
    }
}
exports.default = ExhibitionController;
