"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Art extends BaseEntity_1.default {
    constructor(id, name, description, year, imageUrl = "", artist) {
        super(id, name);
        this.description = description;
        this.year = year;
        this.artist = artist;
        this.imageUrl = imageUrl;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getYear() {
        return this.year;
    }
    getArtist() {
        return this.artist;
    }
    getImageUrl() {
        return this.imageUrl;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setYear(year) {
        this.year = year;
    }
    setArtist(artist) {
        this.artist = artist;
    }
    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }
    getInfo() {
        return `Obra: ${this.name}, Descrição: ${this.description}, Ano: ${this.year}, URL da Imagem: ${this.imageUrl}, Artista: ${this.artist ? this.artist.getName() : "Desconhecido"}`;
    }
}
exports.default = Art;
