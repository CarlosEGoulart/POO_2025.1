import Database from "../db/Database";
import ArtController from "../controller/ArtController";
import ExhibitionController from "../controller/ExhibitionController"
import ArtistController from "../controller/ArtistController";


let db = new Database()

test("Test Update Art", () => {
    const artController = new ArtController(db);
    
    const createdArt = artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");

    const updateArt = artController.updateArt(createdArt.getId(), "Titulo da obra alterado", "Descrição da obra alterado", 2025, "url2");

    expect(updateArt).toBe(true);
});

test("Test Update Artist", () => {
    const artistController = new ArtistController(db);

    const createdArtist = artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "url1");

    const updateArtist = artistController.updateArtist(createdArtist.getId(), "Nome do artista alterado", "Biografia do artista alterado", 2004, "@instagram");

    expect(updateArtist).toBe(true);
});

test("Test Update Exhibition", () => {
    const exhibitionController = new ExhibitionController(db);

    const createdExhibition = exhibitionController.createExhibition("Titulo da Exibição", "Descrição da exibição");

    const updatedExhibition = exhibitionController.updateExhibition(createdExhibition.getId(), "Nome da Exibição alterado", "Descrição da exibição alterado", [1]);

    expect(updatedExhibition).toBe(true);
});
