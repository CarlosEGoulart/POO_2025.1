"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Art {
    //Constructor com elementos indispensaveis para a construção de um objeto Art
    constructor(idArt, title, description, year) {
        this.idArt = idArt;
        this.title = title;
        this.description = description;
        this.year = year;
    }
    //Validação do ano de criação da obra
    validateYear(year) {
        if (year < 0 || year > new Date().getFullYear())
            console.log("Ano invalido!");
        else {
            this.year = year;
        }
    }
    //Gets e Sets
    getIdArt() {
        return this.idArt;
    }
    getTitle() {
        return this.title;
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
    setIdArt(idArt) {
        this.idArt = idArt;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setYear(year) {
        this.validateYear(year);
    }
    setArtist(artist) {
        this.artist = artist;
    }
}
exports.default = Art;
