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
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const EnumType_1 = require("../model/EnumType");
class ArtView {
    constructor(artController, message) {
        this.artController = artController;
        this.message = message;
    }
    start() {
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
            switch (choice) {
                case 1:
                    this.listArts();
                    break;
                case 2:
                    this.viewArtDetails();
                    break;
                case 3:
                    this.createArt();
                    break;
                case 4:
                    this.updateArt();
                    break;
                case 5:
                    this.deleteArt();
                    break;
                case 6:
                    this.assignArtistToArt();
                    break;
                case 0:
                    return;
                default:
                    this.message.showMessage(EnumType_1.MessageType.Error);
            }
        }
    }
    listArts() {
        const arts = this.artController.listArts();
        if (arts.length === 0) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
            return;
        }
        arts.forEach(art => {
            console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
        });
    }
    viewArtDetails() {
        const input = readlineSync.question("Digite o ID ou Título da obra: ");
        let art;
        try {
            if (!isNaN(Number(input))) {
                art = this.artController.getArt(Number(input));
            }
            else {
                art = this.artController.getArt(input);
            }
            try {
                if (art) {
                    console.log(art.getInfo());
                }
            }
            catch (error) {
                this.message.showMessage(EnumType_1.MessageType.Error);
            }
        }
        catch (error) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    createArt() {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        const year = readlineSync.questionInt("Ano: ");
        const imageUrl = readlineSync.question("URL da Imagem: ");
        const newArt = this.artController.createArt(title, description, year, imageUrl);
        try {
            if (newArt) {
                this.message.showMessage(EnumType_1.MessageType.Success);
            }
        }
        catch (error) {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
    updateArt() {
        const input = readlineSync.question("Digite o ID ou Título da obra para atualizar: ");
        let art;
        try {
            if (!isNaN(Number(input))) {
                art = this.artController.getArt(Number(input));
            }
            else {
                art = this.artController.getArt(input);
            }
            if (art) {
                const newTitleInput = readlineSync.question(`Novo título (${art.getName()}): `);
                const newTitle = newTitleInput.trim() === "" ? art.getName() : newTitleInput;
                const newDescriptionInput = readlineSync.question(`Nova descrição (${art.getDescription()}): `);
                const newDescription = newDescriptionInput.trim() === "" ? art.getDescription() : newDescriptionInput;
                const newYearInput = readlineSync.question(`Novo ano (${art.getYear()}): `);
                const newYear = newYearInput.trim() === "" ? art.getYear() : Number(newYearInput);
                try {
                    this.artController.updateArt(art.getId(), newTitle, newDescription, newYear);
                    this.message.showMessage(EnumType_1.MessageType.Success);
                }
                catch (error) {
                    this.message.showMessage(EnumType_1.MessageType.Error);
                }
            }
        }
        catch (error) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    deleteArt() {
        const input = readlineSync.question("Digite o ID ou Título da obra para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = this.artController.deleteArt(Number(input));
        }
        else {
            deleted = this.artController.deleteArt(input);
        }
        try {
            if (deleted) {
                this.message.showMessage(EnumType_1.MessageType.Success);
            }
        }
        catch (error) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
        }
    }
    assignArtistToArt() {
        const artInput = readlineSync.question("Digite o ID da obra: ");
        const artistInput = readlineSync.question("Digite o ID do artista: ");
        try {
            this.artController.assignArtistToArt(Number(artInput), Number(artistInput));
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        catch (error) {
            this.message.showMessage(EnumType_1.MessageType.Error);
        }
    }
}
exports.default = ArtView;
