"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Art_1 = __importDefault(require("../model/Art"));
const Artist_1 = __importDefault(require("../model/Artist"));
const Exhibition_1 = __importDefault(require("../model/Exhibition"));
class Database {
    constructor() {
        this.ArtDb = [];
        this.ArtistDb = [];
        this.ExhibitionDb = [];
        this.nextArtId = 1;
        this.nextArtistId = 1;
        this.nextExhibitionId = 1;
    }
    //Métodos CRUD para Art
    createArt(title, description, year) {
        const newArt = new Art_1.default(this.nextArtId++, title, description, year);
        this.ArtDb.push(newArt);
        return newArt;
    }
    readArt(idArt) {
        return this.ArtDb.find(art => art.getIdArt() === idArt);
    }
    readAllArts() {
        return this.ArtDb;
    }
    updateArt(idArt, title, description, year) {
        const artIndex = this.ArtDb.findIndex(art => art.getIdArt() === idArt);
        if (artIndex !== -1) {
            this.ArtDb[artIndex] = new Art_1.default(idArt, title, description, year);
            return true;
        }
        return false;
    }
    deleteArt(idArt) {
        for (let i = 0; i < this.ArtDb.length; i++) {
            if (this.ArtDb[i].getIdArt() === idArt) {
                this.ArtDb.splice(i, 1);
                return this.ArtDb;
            }
            else {
                console.log("Obra não encontrada!");
                return undefined;
            }
        }
    }
    assignArtistToArt(idArt, artist) {
        const art = this.readArt(idArt);
        if (art && artist) {
            art.setArtist(artist);
            return true;
        }
        return false;
    }
    //Métodos CRUD para Artist
    createArtist(name, bio, birthYear, instagram) {
        const newArtist = new Artist_1.default(this.nextArtistId++, name, bio, birthYear, instagram);
        this.ArtistDb.push(newArtist);
        return newArtist;
    }
    readArtist(idArtist) {
        return this.ArtistDb.find(artist => artist.getIdArtist() === idArtist);
    }
    readAllArtists() {
        return this.ArtistDb;
    }
    updateArtist(idArtist, name, bio, birthYear, instagram) {
        const artistIndex = this.ArtistDb.findIndex(artist => artist.getIdArtist() === idArtist);
        if (artistIndex !== -1) {
            this.ArtistDb[artistIndex] = new Artist_1.default(idArtist, name, bio, birthYear, instagram);
            return true;
        }
        return false;
    }
    deleteArtist(idArtist) {
        for (let i = 0; i < this.ArtistDb.length; i++) {
            if (this.ArtistDb[i].getIdArtist() === idArtist) {
                this.ArtistDb.splice(i, 1);
                return this.ArtistDb;
            }
            else {
                console.log("Artista não encontrado!");
                return undefined;
            }
        }
    }
    //Métodos CRUD para Exhibition
    createExhibition(name, description, artWorks = []) {
        const newExhibition = new Exhibition_1.default(this.nextExhibitionId++, name, description, artWorks);
        this.ExhibitionDb.push(newExhibition);
        return newExhibition;
    }
    readExhibition(idExhibition) {
        return this.ExhibitionDb.find(exhibition => exhibition.getIdExhibition() === idExhibition);
    }
    readAllExhibitions() {
        return this.ExhibitionDb;
    }
    updateExhibition(idExhibition, name, description, artWorks) {
        const exhibitionIndex = this.ExhibitionDb.findIndex(exhibition => exhibition.getIdExhibition() === idExhibition);
        if (exhibitionIndex !== -1) {
            this.ExhibitionDb[exhibitionIndex] = new Exhibition_1.default(idExhibition, name, description, artWorks);
            return true;
        }
        else {
            return false;
        }
    }
    deleteExhibition(idExhibition) {
        for (let i = 0; i < this.ExhibitionDb.length; i++) {
            if (this.ExhibitionDb[i].getIdExhibition() === idExhibition) {
                this.ExhibitionDb.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    addArtToExhibition(idExhibition, idArt) {
        const exhibition = this.readExhibition(idExhibition);
        const art = this.readArt(idArt);
        if (exhibition && art) {
            const currentArtWorks = exhibition.getArtWorks();
            if (!currentArtWorks.includes(idArt)) {
                exhibition.setArtWorks([...currentArtWorks, idArt]);
                return true;
            }
        }
        return false;
    }
    removeArtFromExhibition(idExhibition, idArt) {
        const exhibition = this.readExhibition(idExhibition);
        if (exhibition) {
            const updatedArtWorks = exhibition.getArtWorks().filter(id => id !== idArt);
            exhibition.setArtWorks(updatedArtWorks);
            return true;
        }
        return false;
    }
    getExhibitionArts(idExhibition) {
        for (let i = 0; i < this.ExhibitionDb.length; i++) {
            if (this.ExhibitionDb[i].getIdExhibition() === idExhibition) {
                const artIds = this.ExhibitionDb[i].getArtWorks();
                const arts = artIds.map(id => this.readArt(id)).filter(art => art !== undefined);
                return arts;
            }
            else {
                console.log("Exibição não encontrada!");
            }
        }
    }
}
exports.default = Database;
