"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExhibitionController {
    constructor(db) {
        this.db = db;
    }
    createExhibition(name, description, artWorks = []) {
        return this.db.createExhibition(name, description, artWorks);
    }
    getExhibition(idExhibition) {
        return this.db.readExhibition(idExhibition);
    }
    getExhibitionByName(name) {
        return this.db.readExhibitionByName(name);
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
