"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const EnumType_1 = require("../model/Message/EnumType");
const Exception_1 = __importDefault(require("../model/Error/Exception"));
class ArtView {
    constructor(artController, message, artistController) {
        this.artController = artController;
        this.message = message;
        this.artistController = artistController;
    }
    async start() {
        while (true) {
            console.log("\n--- Gerenciar Obras de Arte ---");
            console.log("1. Listar Obras de Arte");
            console.log("2. Visualizar Detalhes da Obra");
            console.log("3. Criar Nova Obra de Arte");
            console.log("4. Atualizar Obra de Arte");
            console.log("5. Deletar Obra de Arte");
            console.log("6. Atribuir Artista à Obra");
            console.log("0. Voltar ao Menu Principal");
            const choice = readlineSync.questionInt("Escolha uma opção: ");
            try {
                switch (choice) {
                    case 1:
                        await this.listArts();
                        break;
                    case 2:
                        await this.viewArtDetails();
                        break;
                    case 3:
                        await this.createArt();
                        break;
                    case 4:
                        await this.updateArt();
                        break;
                    case 5:
                        await this.deleteArt();
                        break;
                    case 6:
                        await this.assignArtistToArt();
                        break;
                    case 0:
                        return;
                    default:
                        this.message.showMessage(EnumType_1.MessageType.Error);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                else {
                    this.message.showMessage(EnumType_1.MessageType.Error);
                    console.error("Erro inesperado:", error);
                }
            }
        }
    }
    async listArts() {
        const arts = await this.artController.listArt();
        if (arts.length === 0) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
            return;
        }
        arts.forEach(art => {
            console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
        });
    }
    async viewArtDetails() {
        const input = readlineSync.question("Digite o ID ou Título da obra: ");
        let art;
        if (!isNaN(Number(input))) {
            art = await this.artController.getArt(Number(input));
        }
        else {
            art = await this.artController.getArt(input);
        }
        if (art) {
            console.log(art.getInfo());
        }
        else {
            throw new Exception_1.default("Obra não encontrada");
        }
    }
    async createArt() {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        const year = readlineSync.questionInt("Ano: ");
        const imageUrl = readlineSync.question("URL da Imagem: ");
        this.artController.createArt(title, description, year, imageUrl);
        this.message.showMessage(EnumType_1.MessageType.Success);
    }
    async updateArt() {
        const input = readlineSync.question("Digite o ID ou Título da obra para atualizar: ");
        let art;
        if (!isNaN(Number(input))) {
            art = await this.artController.getArt(Number(input));
        }
        else {
            art = await this.artController.getArt(input);
        }
        if (art) {
            const newTitleInput = readlineSync.question(`Novo título (${art.getName()}): `);
            const newTitle = newTitleInput.trim() === "" ? art.getName() : newTitleInput;
            const newDescriptionInput = readlineSync.question(`Nova descrição (${art.getDescription()}): `);
            const newDescription = newDescriptionInput.trim() === "" ? art.getDescription() : newDescriptionInput;
            const newYearInput = readlineSync.question(`Novo ano (${art.getYear()}): `);
            const newYear = newYearInput.trim() === "" ? art.getYear() : Number(newYearInput);
            const newImageUrlInput = readlineSync.question(`Nova URL da imagem (${art.getImageUrl()}): `);
            const newImageUrl = newImageUrlInput.trim() === "" ? art.getImageUrl() : newImageUrlInput;
            try {
                await this.artController.updateArt(newTitle, newDescription, newYear, newImageUrl);
                this.message.showMessage(EnumType_1.MessageType.Success);
            }
            catch (error) {
                throw new Exception_1.default("Erro ao atualizar a obra");
            }
        }
        else {
            throw new Exception_1.default("Obra não encontrada");
        }
    }
    async deleteArt() {
        const input = readlineSync.question("Digite o ID ou Título da obra para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = await this.artController.deleteArt(Number(input));
        }
        else {
            deleted = await this.artController.deleteArt(input);
        }
        if (deleted) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            throw new Exception_1.default("Erro ao deletar a obra");
        }
    }
    async assignArtistToArt() {
        const artInput = readlineSync.question("Digite o ID da obra: ");
        const artistInput = readlineSync.question("Digite o ID do artista: ");
        const artist = await this.artistController.getArtist(artistInput);
        try {
            await this.artController.assignArtistToArt(Number(artInput), artist);
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        catch (error) {
            throw new Exception_1.default("Erro ao atribuir artista à obra");
            ;
        }
    }
}
exports.default = ArtView;
