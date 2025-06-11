import Database from "../db/Database";
import ArtController from "../controller/Controllers/ArtController";
import ExhibitionController from "../controller/Controllers/ExhibitionController"
import ArtistController from "../controller/Controllers/ArtistController";import { AppDataSource } from "../data-source";


beforeAll(async () => {
    await AppDataSource.initialize();
    db = new Database(); // Ensure db uses the initialized AppDataSource
});

afterAll(async () => {
    await AppDataSource.destroy();
});

// Ensure db uses the initialized AppDataSource
let db = new Database();

test("Test Art create", async () => {
    const artController = new ArtController(db);
    const title = "Titulo da obra";
    const description = "Descrição da obra";
    const year = 2025;
    const imageUrl = "url1";

    const createdArt = await artController.createArt(title, description, year, imageUrl);

    expect(createdArt.getName()).toBe(title);
    expect(createdArt.getDescription()).toBe(description);
    expect(createdArt.getYear()).toBe(year);
    expect(createdArt.getImageUrl()).toBe(imageUrl);
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
    const artWorks = [1, 2];

    const createdExhibition = await exhibitionController.createExhibition(name, description);

    expect(createdExhibition.getName()).toBe(name);
    expect(createdExhibition.getDescription()).toBe(description);
    expect(createdExhibition.getArtWorks()).toEqual(artWorks)
});