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
test("Test Assign Artist to Art", async () => {
    const artController = new ArtController_1.default(db);
    const artistController = new ArtistController_1.default(db);
    const createdArt = artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");
    const createdArtist = artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "@instagram");
    const assigned = artController.assignArtistToArt((await createdArt).getId(), (await createdArtist).getId());
    expect(assigned).toBe(true);
});
test("Test Assign Art to Exhibition", async () => {
    const artController = new ArtController_1.default(db);
    const exhibitionController = new ExhibitionController_1.default(db);
    const createdArt = await artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");
    const createdExhibition = exhibitionController.createExhibition("Titulo da Exibiçao", "Descrição da Exibição");
    const assigned = exhibitionController.addArtToExhibition((await createdExhibition).getId(), createdArt.getId());
    expect(assigned).toBe(true);
});
