"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const ArtController_1 = __importDefault(require("../controller/ArtController"));
const ExhibitionController_1 = __importDefault(require("../controller/ExhibitionController"));
const ArtistController_1 = __importDefault(require("../controller/ArtistController"));
let db = new Database_1.default();
test("Test Delete Art", async () => {
    const artController = new ArtController_1.default(db);
    const createdArt = await artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");
    const deleted = artController.deleteArt(createdArt.getId());
    expect(deleted).toBe(true);
});
test("Test Delete Artist", async () => {
    const artistController = new ArtistController_1.default(db);
    const createdArt = await artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "url1");
    const deleted = artistController.deleteArtist(createdArt.getId());
    expect(deleted).toBe(true);
});
test("Test Delete Exhibition", async () => {
    const exhibitionController = new ExhibitionController_1.default(db);
    const createdArt = await exhibitionController.createExhibition("Titulo da Exibição", "Descrição da Exibição");
    const deleted = exhibitionController.deleteExhibition(createdArt.getId());
    expect(deleted).toBe(true);
});
