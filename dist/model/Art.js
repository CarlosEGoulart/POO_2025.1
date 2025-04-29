"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Art extends BaseEntity_1.default {
    //Constructor com elementos indispensaveis para a construção de um objeto Art
    constructor(idArt, title, description, year) {
        super(idArt, title, description);
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
    //GetInfo para retornar as informações da obra
    getInfo() {
        return this.getBasicInfo();
    }
    //Gets e Sets
    getYear() {
        return this.year;
    }
    getArtist() {
        return this.artist;
    }
    setYear(year) {
        this.validateYear(year);
    }
    setArtist(artist) {
        this.artist = artist;
    }
}
exports.default = Art;
