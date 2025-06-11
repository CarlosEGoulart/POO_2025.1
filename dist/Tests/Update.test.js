"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const ArtController_1 = __importDefault(require("../controller/Controllers/ArtController"));
const ExhibitionController_1 = __importDefault(require("../controller/Controllers/ExhibitionController"));
const ArtistController_1 = __importDefault(require("../controller/Controllers/ArtistController"));
let db = new Database_1.default();
test("Test Update Art", async () => {
    const artController = new ArtController_1.default(db);
    const createdArt = artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");
    const updateArt = await artController.updateArt("Titulo da obra alterado", "Descrição da obra alterado", 2025, "url2");
    expect(updateArt).toBe(true);
});
test("Test Update Artist", async () => {
    const artistController = new ArtistController_1.default(db);
    const createdArtist = artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "url1");
    const updateArtist = await artistController.updateArtist((await createdArtist).getId(), "Nome do artista alterado", "Biografia do artista alterado", 2004, "@instagram");
    expect(updateArtist).toBe(true);
});
test("Test Update Exhibition", async () => {
    const exhibitionController = new ExhibitionController_1.default(db);
    const createdExhibition = exhibitionController.createExhibition("Titulo da Exibição", "Descrição da exibição");
    const updatedExhibition = await exhibitionController.updateExhibition((await createdExhibition).getId(), "Nome da Exibição alterado", "Descrição da exibição alterado");
    expect(updatedExhibition).toBe(true);
});
