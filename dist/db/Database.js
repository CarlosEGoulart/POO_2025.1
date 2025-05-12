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
        for (let i = 0; i < this.ArtDb.length; i++) {
            if (this.ArtDb[i].getId() === idArt) {
                return this.ArtDb[i];
            }
            else {
                console.log("Obra não encontrada!");
            }
        }
    }
    readArtByTitle(name) {
        for (let i = 0; i < this.ArtDb.length; i++) {
            if (this.ArtDb[i].getName() === name) {
                return this.ArtDb[i];
            }
            else {
                console.log("Obra não encontrada!");
            }
        }
    }
    readAllArts() {
        return this.ArtDb;
    }
    updateArt(idArt, title, description, year) {
        const art = this.readArt(idArt);
        if (art) {
            art.setName(title);
            art.setDescription(description);
            art.setYear(year);
            return true;
        }
        return false;
    }
    deleteArt(idArt) {
        for (let i = 0; i < this.ArtDb.length; i++) {
            if (this.ArtDb[i].getId() === idArt) {
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
        for (let i = 0; i < this.ArtistDb.length; i++) {
            if (this.ArtistDb[i].getId() === idArtist) {
                return this.ArtistDb[i];
            }
            else {
                console.log("Artista não encontrado!");
            }
        }
    }
    readArtistByName(name) {
        for (let i = 0; i < this.ArtistDb.length; i++) {
            if (this.ArtistDb[i].getName() === name) {
                return this.ArtistDb[i];
            }
            else {
                console.log("Artista não encontrado!");
            }
        }
    }
    readAllArtists() {
        return this.ArtistDb;
    }
    updateArtist(idArtist, name, bio, birthYear, instagram) {
        const artist = this.readArtist(idArtist);
        if (artist) {
            artist.setName(name);
            artist.setBio(bio);
            artist.setBirthYear(birthYear);
            artist.setInstagram(instagram);
            return true;
        }
        else {
            return false;
        }
    }
    deleteArtist(idArtist) {
        for (let i = 0; i < this.ArtistDb.length; i++) {
            if (this.ArtistDb[i].getId() === idArtist) {
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
        for (let i = 0; i < this.ExhibitionDb.length; i++) {
            if (this.ExhibitionDb[i].getId() === idExhibition) {
                return this.ExhibitionDb[i];
            }
            else {
                console.log("Exibição não encontrada!");
            }
        }
    }
    readExhibitionByName(name) {
        for (let i = 0; i < this.ExhibitionDb.length; i++) {
            if (this.ExhibitionDb[i].getName() === name) {
                return this.ExhibitionDb[i];
            }
            else {
                console.log("Exibição não encontrada!");
            }
        }
    }
    readAllExhibitions() {
        return this.ExhibitionDb;
    }
    updateExhibition(idExhibition, name, description, artWorks) {
        const Exhibition = this.readExhibition(idExhibition);
        if (Exhibition) {
            Exhibition.setName(name);
            Exhibition.setDescription(description);
            Exhibition.setArtWorks(artWorks);
            return true;
        }
        else {
            return false;
        }
    }
    deleteExhibition(idExhibition) {
        for (let i = 0; i < this.ExhibitionDb.length; i++) {
            if (this.ExhibitionDb[i].getId() === idExhibition) {
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
            if (this.ExhibitionDb[i].getId() === idExhibition) {
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
