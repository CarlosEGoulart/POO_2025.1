"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Exhibition extends BaseEntity_1.default {
    //Constructor com elementos indispensaveis para a construção de um objeto Exhibition
    constructor(idExhibition, name, description, artWorks) {
        super(idExhibition, name);
        this.artWorks = [];
        this.description = description;
        this.artWorks = artWorks;
    }
    //GetInfo para retornar as informações da exibição
    getInfo() {
        return this.getBasicInfo();
    }
    //Gets e Sets
    getDescription() {
        return this.description;
    }
    getArtWorks() {
        return this.artWorks;
    }
    setDescription(description) {
        this.description = description;
    }
    setArtWorks(artWorks) {
        this.artWorks = artWorks;
    }
}
exports.default = Exhibition;
