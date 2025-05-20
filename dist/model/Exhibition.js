"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
class Exhibition extends BaseEntity_1.default {
    constructor(id, name, description, artWorks = []) {
        super(id, name);
        this.description = description;
        this.artWorks = artWorks;
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
    getArtWorks() {
        return this.artWorks;
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
    setArtWorks(artWorks) {
        this.artWorks = artWorks;
    }
    getInfo() {
        return `Exposição: ${this.name}, Descrição: ${this.description}, Obras: ${this.artWorks.length}`;
    }
}
exports.default = Exhibition;
