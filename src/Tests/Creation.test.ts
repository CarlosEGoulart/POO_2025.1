import Database from "../db/Database";
import ArtController from "../controller/Controllers/ArtController";
import ExhibitionController from "../controller/Controllers/ExhibitionController"
import ArtistController from "../controller/Controllers/ArtistController";

let db = new Database()

test("Test Art create", async () => {
    const artController = new ArtController(db);
    const createdArt = await artController.createArt("Titulo da obra", "Descrição da obra", 2025, "url1");

    expect(createdArt.getName()).toBe("Titulo da obra");
    expect(createdArt.getDescription()).toBe("Descrição da obra");
    expect(createdArt.getYear()).toBe(2025);
    expect(createdArt.getImageUrl()).toBe("url1");
});

test("Test Artist create", async () => {
    const artistController = new ArtistController(db);
    const name = "Nome do artista";
    const bio = "Biografia do artista";
    const birthYear = 2004;
    const instagram = "@instagram";

    const createdArtist = await artistController.createArtist(name, bio, birthYear, instagram);

    expect(createdArtist.getName()).toBe(name);
    expect(createdArtist.getBio()).toBe(bio);
    expect(createdArtist.getBirthYear()).toBe(birthYear);
    expect(createdArtist.getInstagram()).toBe(instagram);
});

test("Test Exhibition create", async () => {
    const exhibitionController = new ExhibitionController(db);
    const name = "Nome da Exibição";
    const description = "Descrição da exibição";

    const createdExhibition = await exhibitionController.createExhibition(name, description);

    expect(createdExhibition.getName()).toBe(name);
    expect(createdExhibition.getDescription()).toBe(description);
});