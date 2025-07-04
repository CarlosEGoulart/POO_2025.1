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
class ExhibitionView {
    constructor(exhibitionController, message) {
        this.exhibitionController = exhibitionController;
        this.message = message;
    }
    async start() {
        while (true) {
            console.log("\n--- Gerenciar Exposições ---");
            console.log("1. Listar Exposições");
            console.log("2. Visualizar Detalhes da Exposição");
            console.log("3. Criar Nova Exposição");
            console.log("4. Atualizar Exposição");
            console.log("5. Adicionar Obras à Exposição");
            console.log("6. Remover Obras da Exposição");
            console.log("7. Listar Obras da Exposição");
            console.log("8. Deletar Exposição");
            console.log("0. Voltar ao Menu Principal");
            const choice = readlineSync.questionInt("Escolha uma opção: ");
            try {
                switch (choice) {
                    case 1:
                        await this.listExhibitions();
                        break;
                    case 2:
                        await this.viewExhibitionDetails();
                        break;
                    case 3:
                        await this.createExhibition();
                        break;
                    case 4:
                        await this.updateExhibition();
                        break;
                    case 5:
                        await this.assignArtToExhibition();
                        break;
                    case 6:
                        await this.removeArtFromExhibition();
                        break;
                    case 7:
                        await this.getExhibitionArts();
                        break;
                    case 8:
                        await this.deleteExhibition();
                        break;
                    case 0:
                        return;
                    default:
                        throw new Exception_1.default("Opção inválida");
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
    async listExhibitions() {
        const exhibitions = await this.exhibitionController.listExhibitions();
        if (exhibitions.length === 0) {
            this.message.showMessage(EnumType_1.MessageType.NotFound);
            return;
        }
        exhibitions.forEach(exhibition => {
            console.log(`ID: ${exhibition.getId()}, Título: ${exhibition.getName()}, Obras: ${exhibition.getArtWorks().length}`);
        });
    }
    async viewExhibitionDetails() {
        const input = readlineSync.question("Digite o ID ou Título da exposição: ");
        let exhibition;
        if (!isNaN(Number(input))) {
            exhibition = await this.exhibitionController.getExhibition(Number(input));
        }
        else {
            exhibition = await this.exhibitionController.getExhibition(input);
        }
        if (exhibition) {
            console.log(exhibition.getInfo());
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            throw new Exception_1.default("Exposição não encontrada");
        }
    }
    async createExhibition() {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        this.exhibitionController.createExhibition(title, description);
        this.message.showMessage(EnumType_1.MessageType.Success);
    }
    async updateExhibition() {
        const input = readlineSync.question("Digite o ID ou Título da exposição para atualizar: ");
        let exhibition;
        if (!isNaN(Number(input))) {
            exhibition = await this.exhibitionController.getExhibition(Number(input));
        }
        else {
            exhibition = await this.exhibitionController.getExhibition(input);
        }
        if (exhibition) {
            const titleInput = readlineSync.question(`Novo título (${exhibition.getName()}): `);
            const newTitle = titleInput.trim() === "" ? exhibition.getName() : titleInput;
            const descInput = readlineSync.question(`Nova descrição (${exhibition.getDescription()}): `);
            const newDescription = descInput.trim() === "" ? exhibition.getDescription() : descInput;
            try {
                await this.exhibitionController.updateExhibition(exhibition.getId(), newTitle, newDescription);
                this.message.showMessage(EnumType_1.MessageType.Success);
            }
            catch (error) {
                throw new Exception_1.default("Erro ao atualizar a exposição");
            }
        }
        else {
            throw new Exception_1.default("Exposição não encontrada");
        }
    }
    async deleteExhibition() {
        const input = readlineSync.question("Digite o ID ou Título da exposição para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = await this.exhibitionController.deleteExhibition(Number(input));
        }
        else {
            deleted = await this.exhibitionController.deleteExhibition(input);
        }
        if (deleted) {
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        else {
            throw new Exception_1.default("Erro ao deletar a exposição");
        }
    }
    async assignArtToExhibition() {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");
        try {
            await this.exhibitionController.addArtToExhibition(Number(exhibitionInput), Number(artInput));
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        catch (error) {
            throw new Exception_1.default("Erro ao adicionar arte à exposição");
        }
    }
    async removeArtFromExhibition() {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");
        try {
            await this.exhibitionController.removeArtFromExhibition(Number(exhibitionInput), Number(artInput));
            this.message.showMessage(EnumType_1.MessageType.Success);
        }
        catch (error) {
            throw new Exception_1.default("Erro ao remover arte da exposição");
        }
    }
    async getExhibitionArts() {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const arts = await this.exhibitionController.listArtByExhibition(Number(exhibitionInput));
        try {
            if (!arts || arts.length === 0) {
                this.message.showMessage(EnumType_1.MessageType.NotFound);
            }
        }
        catch (error) {
            throw new Exception_1.default("Erro ao obter obras da exposição");
        }
    }
}
exports.default = ExhibitionView;
