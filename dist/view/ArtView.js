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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
class ArtView {
    constructor(artController) {
        this.artController = artController;
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
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
    listArts() {
        const arts = this.artController.listArts();
        if (arts.length === 0) {
            console.log("Nenhuma obra de arte cadastrada.");
            return;
        }
        console.log("\n--- Lista de Obras de Arte ---");
        arts.forEach(art => {
            console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
        });
    }
    viewArtDetails() {
        const searchOption = readlineSync.question("Deseja buscar a obra de arte por (ID/Título)? ", { limit: ['ID', 'Título'], caseSensitive: false }).toUpperCase();
        let artToView;
        if (searchOption === 'ID') {
            const idArt = readlineSync.questionInt("Digite o ID da obra de arte: ");
            artToView = this.artController.getArt(idArt);
        }
        else if (searchOption === 'TÍTULO') {
            const titleArt = readlineSync.question("Digite o título da obra de arte: ");
            artToView = this.artController.getArtByTitle(titleArt);
        }
        else {
            console.log("Opção inválida.");
            return;
        }
        if (artToView) {
            console.log("\n--- Detalhes da Obra de Arte ---");
            console.log(`ID: ${artToView.getId()}`);
            console.log(`Título: ${artToView.getName()}`);
            console.log(`Descrição: ${artToView.getDescription()}`);
            console.log(`Ano: ${artToView.getYear()}`);
            if (artToView.getArtist()) {
                console.log(`Artista: ${artToView.getArtist().getName()}`);
            }
            else {
                console.log("Artista: Não atribuído");
            }
        }
        else {
            console.log("Obra de arte não encontrada.");
        }
    }
    createArt() {
        const title = readlineSync.question("Digite o título da obra: ");
        const description = readlineSync.question("Digite a descrição da obra: ");
        const year = readlineSync.questionInt("Digite o ano de criação da obra: ");
        const newArt = this.artController.createArt(title, description, year);
        if (newArt) {
            console.log(`Obra de arte "${newArt.getName()}" criada com ID: ${newArt.getId()}.`);
        }
        else {
            console.log("Erro ao criar a obra de arte.");
        }
    }
    updateArt() {
        const searchOption = readlineSync.question("Deseja buscar a obra de arte para atualizar por (ID/Título)? ", { limit: ['ID', 'Título'], caseSensitive: false }).toUpperCase();
        let artToUpdate;
        let artId;
        if (searchOption === 'ID') {
            artId = readlineSync.questionInt("Digite o ID da obra de arte para atualizar: ");
            artToUpdate = this.artController.getArt(artId);
        }
        else if (searchOption === 'TÍTULO') {
            const titleArt = readlineSync.question("Digite o título da obra de arte para atualizar: ");
            artToUpdate = this.artController.getArtByTitle(titleArt);
            if (artToUpdate) {
                artId = artToUpdate.getId();
            }
            else {
                console.log(`Obra de arte com título "${titleArt}" não encontrada.`);
                return;
            }
        }
        else {
            console.log("Opção inválida.");
            return;
        }
        if (artToUpdate) {
            console.log(`\n--- Atualizando Obra de Arte: ${artToUpdate.getName()} (ID: ${artToUpdate.getId()}) ---`);
            const newTitle = readlineSync.question(`Novo título (${artToUpdate.getName()}): `, { defaultInput: artToUpdate.getName() });
            const newDescription = readlineSync.question(`Nova descrição (${artToUpdate.getDescription()}): `, { defaultInput: artToUpdate.getDescription() });
            const newYear = readlineSync.questionInt(`Novo ano (${artToUpdate.getYear()}): `, { defaultInput: artToUpdate.getYear().toString() });
            if (artId !== undefined) {
                const updated = this.artController.updateArt(artId, newTitle, newDescription, newYear);
                if (updated) {
                    console.log(`Obra de arte com ID ${artId} atualizada.`);
                }
                else {
                    console.log("Erro ao atualizar a obra de arte.");
                }
            }
            else {
                console.log("Erro interno: ID da obra de arte não disponível para atualização.");
            }
        }
        else {
            console.log("Obra de arte não encontrada.");
        }
    }
    deleteArt() {
        const searchOption = readlineSync.question("Deseja buscar a obra de arte para deletar por (ID/Título)? ", { limit: ['ID', 'Título'], caseSensitive: false }).toUpperCase();
        let artToDeleteId;
        let artToDeleteTitle;
        if (searchOption === 'ID') {
            artToDeleteId = readlineSync.questionInt("Digite o ID da obra de arte para deletar: ");
        }
        else if (searchOption === 'TÍTULO') {
            artToDeleteTitle = readlineSync.question("Digite o título da obra de arte para deletar: ");
            const artToDelete = this.artController.getArtByTitle(artToDeleteTitle);
            if (artToDelete) {
                artToDeleteId = artToDelete.getId();
            }
            else {
                console.log(`Obra de arte com título "${artToDeleteTitle}" não encontrada.`);
                return;
            }
        }
        else {
            console.log("Opção inválida.");
            return;
        }
        if (artToDeleteId !== undefined) {
            const deletedArts = this.artController.deleteArt(artToDeleteId);
            if (deletedArts) {
                console.log(`Obra de arte com ID ${artToDeleteId} deletada.`);
            }
            else {
                console.log("Obra de arte não encontrada.");
            }
        }
    }
    assignArtistToArt() {
        console.log("Funcionalidade de atribuir artista não completamente implementada nesta view.");
    }
}
exports.default = ArtView;
