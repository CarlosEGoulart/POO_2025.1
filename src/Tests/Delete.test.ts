import Database from "../db/Database";
import ArtController from "../controller/ArtController";
import ExhibitionController from "../controller/ExhibitionController"
import ArtistController from "../controller/ArtistController";


let db = new Database()

test("Test Delete Art", () => {
    const artController = new ArtController(db);
    
    const createdArt = artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");

    const deleted = artController.deleteArt(createdArt.getId());

    expect(deleted).toBe(true);
});

test("Test Delete Artist", () => {
    const artistController = new ArtistController(db);
    
    const createdArt = artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "url1");

    const deleted = artistController.deleteArtist(createdArt.getId());

    expect(deleted).toBe(true);
});

test("Test Delete Exhibition", () => {
    const exhibitionController = new ExhibitionController(db);
    
    const createdArt = exhibitionController.createExhibition("Titulo da Exibição", "Descrição da Exibição");

    const deleted = exhibitionController.deleteExhibition(createdArt.getId());

    expect(deleted).toBe(true);
});