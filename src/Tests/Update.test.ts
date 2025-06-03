import Database from "../db/Database";
import ArtController from "../controller/ArtController";
import ExhibitionController from "../controller/ExhibitionController"
import ArtistController from "../controller/ArtistController";


let db = new Database()

test("Test Update Art", async () => {
    const artController = new ArtController(db);
    
    const createdArt = artController.createArt(1, "Titulo da obra", "Descrição da obra", 2025, "url1");

    const updateArt = await artController.updateArt((await createdArt).getId(), "Titulo da obra alterado", "Descrição da obra alterado", 2025, "url2");

    expect(updateArt).toBe(true);
});

test("Test Update Artist", async () => {
    const artistController = new ArtistController(db);

    const createdArtist = artistController.createArtist(1, "Nome do artista", "Biografia do artista", 2004, "url1");

    const updateArtist = await artistController.updateArtist((await createdArtist).getId(), "Nome do artista alterado", "Biografia do artista alterado", 2004, "@instagram");

    expect(updateArtist).toBe(true);
});

test("Test Update Exhibition", async () => {
    const exhibitionController = new ExhibitionController(db);

    const createdExhibition = exhibitionController.createExhibition(1, "Titulo da Exibição", "Descrição da exibição", [1, 2]);

    const updatedExhibition = await exhibitionController.updateExhibition((await createdExhibition).getId(), "Nome da Exibição alterado", "Descrição da exibição alterado", [1]);

    expect(updatedExhibition).toBe(true);
});
