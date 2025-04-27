"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Artist {
    //Constructor com elementos indispensaveis para a construção de um objeto Artist
    constructor(idArtist, name, bio, birthYear, instagram) {
        this.idArtist = idArtist;
        this.name = name;
        this.bio = bio;
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
    //Formatação do nome para caso o nome não seja inserido
    formatName(name) {
        if (name == "") {
            name = "Desconhecido";
            this.name = name;
        }
        else {
            this.name = name;
        }
    }
    //Gets e Sets
    getIdArtist() {
        return this.idArtist;
    }
    getName() {
        return this.name;
    }
    getBio() {
        return this.bio;
    }
    getBirthYear() {
        return this.birthYear;
    }
    getInstagram() {
        return this.instagram;
    }
    setIdArtist(idArtist) {
        this.idArtist = idArtist;
    }
    setName(name) {
        this.formatName(name);
    }
    setBio(bio) {
        this.bio = bio;
    }
    setBirthYear(birthYear) {
        this.validateBirthYear(birthYear);
    }
    setInstagram(instagram) {
        this.formatInstagram(instagram);
    }
}
exports.default = Artist;
