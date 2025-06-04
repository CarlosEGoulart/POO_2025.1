"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Art_1 = __importDefault(require("../model/Classes/Art"));
const Artist_1 = __importDefault(require("../model/Classes/Artist"));
const Exhibition_1 = __importDefault(require("../model/Classes/Exhibition"));
const data_source_1 = require("../data-source");
require("reflect-metadata");
const artRepository = data_source_1.AppDataSource.getRepository(Art_1.default);
const artistRepository = data_source_1.AppDataSource.getRepository(Artist_1.default);
const exhibitionRepository = data_source_1.AppDataSource.getRepository(Exhibition_1.default);
class Database {
    // ART CRUD
    async createArt(artId, title, description, year, imageUrl) {
        const newArt = new Art_1.default(artId, title, description, year, imageUrl);
        await artRepository.save(newArt);
        return newArt;
    }
    async readArt(artId) {
        return artRepository.findOneBy({ id: artId });
    }
    async readArtByTitle(title) {
        return artRepository.findOneBy({ name: title });
    }
    async readAllArts() {
        return artRepository.find();
    }
    async updateArt(artId, title, description, year, imageUrl) {
        const art = await this.readArt(artId);
        if (art) {
            art.setName(title);
            art.setDescription(description);
            art.setYear(year);
            art.setImageUrl(imageUrl);
            await artRepository.save(art);
            return true;
        }
        return false;
    }
    async deleteArt(artId) {
        await artRepository.delete(artId);
        return true;
    }
    async assignArtistToArt(artId, artist) {
        const art = await this.readArt(artId);
        if (art && artist.id) {
            art.artist = artist;
            artRepository.save(art);
            return true;
        }
        return false;
    }
    // ARTIST CRUD
    async createArtist(artistId, name, bio, birthYear, instagram) {
        const newArtist = new Artist_1.default(artistId, name, bio, birthYear, instagram);
        await artistRepository.save(newArtist);
        return newArtist;
    }
    async readArtist(artistId) {
        return artistRepository.findOneBy({ id: artistId });
    }
    async readArtistByName(name) {
        return artistRepository.findOneBy({ name: name });
    }
    async readAllArtists() {
        return artistRepository.find();
    }
    async updateArtist(artistId, name, bio, birthYear, instagram) {
        const artist = await this.readArtist(artistId);
        if (artist) {
            artist.setName(name);
            artist.setBio(bio);
            artist.setBirthYear(birthYear);
            artist.setInstagram(instagram);
            await artistRepository.save(artist);
            return true;
        }
        return false;
    }
    async deleteArtist(artistId) {
        await artistRepository.delete(artistId);
        return true;
    }
    // EXHIBITION CRUD
    async createExhibition(exhibitionId, name, description, artWorks = []) {
        const newExhibition = new Exhibition_1.default(exhibitionId, name, description, artWorks);
        await exhibitionRepository.save(newExhibition);
        return newExhibition;
    }
    async readExhibition(exhibitionId) {
        return exhibitionRepository.findOneBy({ id: exhibitionId });
    }
    async readExhibitionByName(name) {
        return exhibitionRepository.findOneBy({ name: name });
    }
    async readAllExhibitions() {
        return exhibitionRepository.find();
    }
    async updateExhibition(exhibitionId, name, description, artWorks) {
        const exhibition = await this.readExhibition(exhibitionId);
        if (exhibition) {
            exhibition.setName(name);
            exhibition.setDescription(description);
            exhibition.setArtWorks(artWorks);
            exhibitionRepository.save(exhibition);
            return true;
        }
        return false;
    }
    async deleteExhibition(exhibitionId) {
        await exhibitionRepository.delete(exhibitionId);
        return true;
    }
    async addArtToExhibition(exhibitionId, artId) {
        const exhibition = await this.readExhibition(exhibitionId);
        const art = await this.readArt(artId);
        if (exhibition && art) {
            const currentArtWorks = exhibition.getArtWorks();
            if (!currentArtWorks.includes(artId)) {
                exhibition.setArtWorks([...currentArtWorks, artId]);
                exhibitionRepository.save(exhibition);
                return true;
            }
        }
        return false;
    }
    async removeArtFromExhibition(exhibitionId, artId) {
        const exhibition = await this.readExhibition(exhibitionId);
        if (exhibition) {
            const updatedArtWorks = exhibition.getArtWorks().filter(id => id !== artId);
            exhibition.setArtWorks(updatedArtWorks);
            await exhibitionRepository.save(exhibition);
            return true;
        }
        return false;
    }
    async getExhibitionArts(exhibitionId) {
        const exhibition = await this.readExhibition(exhibitionId);
        if (exhibition) {
            const artIds = exhibition.getArtWorks();
            return artIds;
        }
    }
}
exports.default = Database;
