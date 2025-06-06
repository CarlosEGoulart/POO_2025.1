import Database from "../db/Database";
import ArtController from "../controller/ArtController";
import ExhibitionController from "../controller/ExhibitionController"
import ArtistController from "../controller/ArtistController";

let db = new Database();

test("Test Assign Artist to Art", async () => {
    const artController = new ArtController(db);
    const artistController = new ArtistController(db);

    const createdArt = artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");
    const createdArtist = artistController.createArtist("Nome do artista", "Biografia do artista", 2004, "@instagram");

    const assigned = artController.assignArtistToArt((await createdArt).getId(), (await createdArtist).getId());

    expect(assigned).toBe(true);
});

test("Test Assign Art to Exhibition", async () => {
    const artController = new ArtController(db);
    const exhibitionController = new ExhibitionController(db);

    const createdArt = await artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");
    const createdExhibition = exhibitionController.createExhibition("Titulo da Exibiçao", "Descrição da Exibição");

    const assigned = exhibitionController.addArtToExhibition((await createdExhibition).getId(), createdArt.getId());

    expect(assigned).toBe(true);
});
