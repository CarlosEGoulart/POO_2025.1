import Database from "../db/Database";
import ArtController from "../controller/Controllers/ArtController";
import ExhibitionController from "../controller/Controllers/ExhibitionController"
import ArtistController from "../controller/Controllers/ArtistController";


let db = new Database()

test("Test Update Art", async () => {
    const artController = new ArtController(db);
    
    const createdArt = artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");

    const updateArt = await artController.updateArt("Titulo da obra alterado", "Descrição da obra alterado", 2025, "url2");

    expect(updateArt).toBe(true);
});

test("Test Update Artist", async () => {
    const artistController = new ArtistController(db);

    const createdArtist = artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "url1");

    const updateArtist = await artistController.updateArtist((await createdArtist).getId(), "Nome do artista alterado", "Biografia do artista alterado", 2004, "@instagram");

    expect(updateArtist).toBe(true);
});

test("Test Update Exhibition", async () => {
    const exhibitionController = new ExhibitionController(db);

    const createdExhibition = exhibitionController.createExhibition("Titulo da Exibição", "Descrição da exibição");

    const updatedExhibition = await exhibitionController.updateExhibition((await createdExhibition).getId(), "Nome da Exibição alterado", "Descrição da exibição alterado");

    expect(updatedExhibition).toBe(true);
});
