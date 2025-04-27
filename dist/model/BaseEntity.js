"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEntity {
    constructor(id, name) {
        this.id = id;
        this.name = name;
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
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.formatName(name);
    }
    setId(id) {
        this.id = id;
    }
    // Método que pode ser sobreposto pelas classes filhas
    getBasicInfo() {
        return `ID: ${this.id}, Nome: ${this.name}`;
    }
}
exports.default = BaseEntity;
