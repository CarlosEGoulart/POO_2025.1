"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Art_1 = __importDefault(require("../model/Classes/Art"));
const Artist_1 = __importDefault(require("../model/Classes/Artist"));
const Exhibition_1 = __importDefault(require("../model/Classes/Exhibition"));
test("Test Art read", async () => {
    const art = new Art_1.default(1, "Titulo da obra", "Descrição da obra", 2025);
    expect(art.getId()).toBe(1);
    expect(art.getName()).toBe("Titulo da obra");
    expect(art.getDescription()).toBe("Descrição da obra");
    expect(art.getYear()).toBe(2025);
});
test("Test Artist read", async () => {
    const artist = new Artist_1.default(1, "Nome do artista", "Biografia do artista", 2004, "@instagram");
    expect(artist.getId()).toBe(1);
    expect(artist.getName()).toBe("Nome do artista");
    expect(artist.getBio()).toBe("Biografia do artista");
    expect(artist.getInstagram()).toBe("@instagram");
});
test("Test Exhibition read", async () => {
    const exhibition = new Exhibition_1.default(1, "Nome da Exibição", "Descrição da exibição", [1, 2]);
    expect(exhibition.getId()).toBe(1);
    expect(exhibition.getName()).toBe("Nome da Exibição");
    expect(exhibition.getDescription()).toBe("Descrição da exibição");
    expect(exhibition.getArtWorks()).toEqual([1, 2]);
});
