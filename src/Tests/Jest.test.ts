import Art from "../model/Classes/Art";
import Artist from "../model/Classes/Artist";
import Exhibition from "../model/Classes/Exhibition";

test("Test Art class", () => {
    const art = new Art(1, "Titulo da obra", "Descrição da obra", 2025);
    expect(art.getId()).toBe(1);
    expect(art.getName()).toBe("Titulo da obra");
    expect(art.getDescription()).toBe("Descrição da obra");
    expect(art.getYear()).toBe(2025);
});

test("Test Artist class", () => {
    const artist = new Artist(1, "Nome do artista", "Biografia do artista", 2004, "@instagram");
    expect(artist.getId()).toBe(1);
    expect(artist.getName()).toBe("Nome do artista");
    expect(artist.getBio()).toBe("Biografia do artista");
    expect(artist.getInstagram()).toBe("@instagram");
});

test("Test Exhibition class", () => {
    const exhibition = new Exhibition(1, "Nome da Exibição", "Descrição da exibição", [1, 2]);
    expect(exhibition.getId()).toBe(1);
    expect(exhibition.getName()).toBe("Nome da Exibição");
    expect(exhibition.getDescription()).toBe("Descrição da exibição");
    expect(exhibition.getArtWorks()).toEqual([1, 2]);
});


