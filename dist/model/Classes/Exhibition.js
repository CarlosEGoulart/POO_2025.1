"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Art_1 = __importDefault(require("./Art"));
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const typeorm_1 = require("typeorm");
let Exhibition = class Exhibition extends BaseEntity_1.default {
    constructor(name, description, artWorks = []) {
        super(0, name);
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
    getType() {
        return "Exhibition";
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exhibition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], Exhibition.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exhibition.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Art_1.default, (art) => art),
    __metadata("design:type", Array)
], Exhibition.prototype, "artWorks", void 0);
Exhibition = __decorate([
    (0, typeorm_1.Entity)("exhibition"),
    __metadata("design:paramtypes", [String, String, Array])
], Exhibition);
exports.default = Exhibition;
