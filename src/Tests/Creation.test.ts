import Database from "../db/Database";
import ArtController from "../controller/ArtController";
import ExhibitionController from "../controller/ExhibitionController"
import ArtistController from "../controller/ArtistController";

let db = new Database();

test("Test Art create", async () => {
    const artController = new ArtController(db);
    const id = 1;
    const title = "Titulo da obra";
    const description = "Descrição da obra";
    const year = 2025;
    const imageUrl = "url1";

    const createdArt = await artController.createArt(id, title, description, year, imageUrl);

    expect(createdArt.getName()).toBe(title);
    expect(createdArt.getDescription()).toBe(description);
    expect(createdArt.getYear()).toBe(year);
    expect(createdArt.getImageUrl()).toBe(imageUrl);
});

test("Test Artist create", async () => {
    const artistController = new ArtistController(db);
    const id = 1;
    const name = "Nome do artista";
    const bio = "Biografia do artista";
    const birthYear = 2004;
    const instagram = "@instagram";

    const createdArtist = await artistController.createArtist(id, name, bio, birthYear, instagram);

    expect(createdArtist.getName()).toBe(name);
    expect(createdArtist.getBio()).toBe(bio);
    expect(createdArtist.getBirthYear()).toBe(birthYear);
    expect(createdArtist.getInstagram()).toBe(instagram);
});

test("Test Exhibition create", async () => {
    const exhibitionController = new ExhibitionController(db);
    const id = 1;
    const name = "Nome da Exibição";
    const description = "Descrição da exibição";
    const artWorks = [1, 2];

    const createdExhibition = await exhibitionController.createExhibition(id, name, description, artWorks);

    expect(createdExhibition.getName()).toBe(name);
    expect(createdExhibition.getDescription()).toBe(description);
    expect(createdExhibition.getArtWorks()).toEqual(artWorks)
});