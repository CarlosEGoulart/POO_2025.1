"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Artist extends BaseEntity_1.default {
    //Constructor com elementos indispensaveis para a construção de um objeto Artist
    constructor(idArtist, name, bio, birthYear, instagram) {
        super(idArtist, name, bio);
        this.birthYear = birthYear;
        this.instagram = instagram;
    }
    //Validação do ano de nascimento do artista
    validateBirthYear(birthYear) {
        if (birthYear < 0 || birthYear > new Date().getFullYear()) {
            console.log("Ano de nascimento invalido!");
        }
        else {
            this.birthYear = birthYear;
        }
    }
    //Formatação do instagram para inseriro @ caso não esteja presente
    formatInstagram(instagram) {
        if (!instagram.startsWith('@')) {
            instagram = '@' + instagram;
            this.instagram = instagram;
        }
        else {
            this.instagram = instagram;
        }
    }
    //GetInfo para retornar as informações do artista
    getInfo() {
        return this.getBasicInfo();
    }
    //Gets e Sets 
    getBirthYear() {
        return this.birthYear;
    }
    getInstagram() {
        return this.instagram;
    }
    setBirthYear(birthYear) {
        this.validateBirthYear(birthYear);
    }
    setInstagram(instagram) {
        this.formatInstagram(instagram);
    }
}
exports.default = Artist;
