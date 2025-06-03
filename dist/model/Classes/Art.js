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
const BaseEntity_1 = __importDefault(require("./BaseEntity"));
const Artist_1 = __importDefault(require("./Artist"));
const typeorm_1 = require("typeorm");
let Art = class Art extends BaseEntity_1.default {
    constructor(id, name, description, year, imageUrl = "", artist) {
        super(id, name);
        this.description = description;
        this.year = year;
        this.artist = artist;
        this.imageUrl = imageUrl;
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
    getYear() {
        return this.year;
    }
    getArtist() {
        return this.artist;
    }
    getImageUrl() {
        return this.imageUrl;
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
    setYear(year) {
        this.year = year;
    }
    setArtist(artist) {
        this.artist = artist;
    }
    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }
    getInfo() {
        return `Obra: ${this.name}, Descrição: ${this.description}, Ano: ${this.year}, URL da Imagem: ${this.imageUrl}, Artista: ${this.artist ? this.artist.getName() : "Desconhecido"}`;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Art.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], Art.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Art.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Art.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Artist_1.default, (artist) => artist),
    __metadata("design:type", Artist_1.default)
], Art.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Art.prototype, "imageUrl", void 0);
Art = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Number, String, String, Number, String, Artist_1.default])
], Art);
exports.default = Art;
