"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exhibition {
    //Constructor com elementos indispensaveis para a construção de um objeto Exhibition
    constructor(idExhibition, name, description, artWorks) {
        this.artWorks = [];
        this.idExhibition = idExhibition;
        this.name = name;
        this.description = description;
        this.artWorks = artWorks;
    }
    //Formatação do nome para caso o nome não seja inserido, ser substituido pelo numero de seu Id
    formatName(name) {
        if (name == "") {
            name = "Exibição" + this.idExhibition;
            this.name = name;
        }
        else {
            this.name = name;
        }
    }
    //Gets e Sets
    getIdExhibition() {
        return this.idExhibition;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getArtWorks() {
        return this.artWorks;
    }
    setIdExhibition(idExhibition) {
        this.idExhibition = idExhibition;
    }
    setName(name) {
        this.formatName(name);
    }
    setDescription(description) {
        this.description = description;
    }
    setArtWorks(artWorks) {
        this.artWorks = artWorks;
    }
}
exports.default = Exhibition;
