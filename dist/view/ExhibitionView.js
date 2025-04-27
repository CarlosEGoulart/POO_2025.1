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
class ExhibitionView {
    constructor(exhibitionController) {
        this.exhibitionController = exhibitionController;
    }
    start() {
        while (true) {
            console.log("\n--- Gerenciar Exposições ---");
            console.log("1. Listar Exposições");
            console.log("2. Visualizar Detalhes da Exposição");
            console.log("3. Criar Nova Exposição");
            console.log("4. Atualizar Exposição");
            console.log("5. Deletar Exposição");
            console.log("6. Adicionar Obra de Arte à Exposição");
            console.log("7. Remover Obra de Arte da Exposição");
            console.log("0. Voltar ao Menu Principal");
            const choice = readlineSync.questionInt("Escolha uma opção: ");
            switch (choice) {
                case 1:
                    this.listExhibitions();
                    break;
                case 2:
                    this.viewExhibitionDetails();
                    break;
                case 3:
                    this.createExhibition();
                    break;
                case 4:
                    this.updateExhibition();
                    break;
                case 5:
                    this.deleteExhibition();
                    break;
                case 6:
                    this.addArtToExhibition();
                    break;
                case 7:
                    this.removeArtFromExhibition();
                    break;
                case 0:
                    return;
                default:
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }
    listExhibitions() {
        const exhibitions = this.exhibitionController.listExhibitions();
        if (exhibitions.length == 0) {
            console.log("Nenhuma exposição cadastrada.");
            return;
        }
        console.log("\n--- Lista de Exposições ---");
        exhibitions.forEach(exhibition => {
            console.log(`ID: ${exhibition.getIdExhibition()}, Nome: ${exhibition.getName()}`);
        });
    }
    viewExhibitionDetails() {
        const idExhibition = readlineSync.questionInt("Digite o ID da exposição para visualizar os detalhes: ");
        const exhibition = this.exhibitionController.getExhibition(idExhibition);
        if (exhibition) {
            console.log("\n--- Detalhes da Exposição ---");
            console.log(`ID: ${exhibition.getIdExhibition()}`);
            console.log(`Nome: ${exhibition.getName()}`);
            console.log(`Descrição: ${exhibition.getDescription()}`);
            const arts = this.exhibitionController.getExhibitionArts(idExhibition);
            if (arts && arts.length > 0) {
                console.log("Obras de Arte na Exposição:");
                arts.forEach(art => {
                    console.log(`  - ID: ${art.getIdArt()}, Título: ${art.getTitle()}`);
                });
            }
            else {
                console.log("Nenhuma obra de arte nesta exposição.");
            }
        }
        else {
            console.log("Exposição não encontrada.");
        }
    }
    createExhibition() {
        const name = readlineSync.question("Digite o nome da exposição: ");
        const description = readlineSync.question("Digite a descrição da exposição: ");
        const newExhibition = this.exhibitionController.createExhibition(name, description);
        if (newExhibition) {
            console.log(`Exposição "${newExhibition.getName()}" criada com ID: ${newExhibition.getIdExhibition()}.`);
        }
        else {
            console.log("Erro ao criar a exposição.");
        }
    }
    updateExhibition() {
        const idExhibition = readlineSync.questionInt("Digite o ID da exposição para atualizar: ");
        const exhibitionToUpdate = this.exhibitionController.getExhibition(idExhibition);
        if (exhibitionToUpdate) {
            const newIdExhibition = readlineSync.questionInt(`Novo ID (${exhibitionToUpdate.getIdExhibition()}): `, { defaultInput: exhibitionToUpdate.getIdExhibition().toString() });
            const newName = readlineSync.question(`Novo nome (${exhibitionToUpdate.getName()}): `, { defaultInput: exhibitionToUpdate.getName() });
            const newDescription = readlineSync.question(`Nova descrição (${exhibitionToUpdate.getDescription()}): `, { defaultInput: exhibitionToUpdate.getDescription() });
            const newArtWorks = readlineSync.question(`Novas obras (IDs separados por vírgula, exemplo: 1,2,3,4): `, { defaultInput: exhibitionToUpdate.getArtWorks().join(', ') });
            const artWorksArray = newArtWorks.split(',').map((id) => parseInt(id.trim()));
            const updated = this.exhibitionController.updateExhibition(newIdExhibition, newName, newDescription, artWorksArray);
            if (updated) {
                console.log(`Exposição com ID ${idExhibition} atualizada.`);
            }
            else {
                console.log("Erro ao atualizar a exposição.");
                console.log("Exposição não encontrada.");
                return;
            }
        }
        else {
            console.log("Exposição não encontrada.");
        }
    }
    deleteExhibition() {
        const idExhibitionToDelete = readlineSync.questionInt("Digite o ID da exposição para deletar: ");
        const deleted = this.exhibitionController.deleteExhibition(idExhibitionToDelete);
        if (deleted) {
            console.log(`Exposição com ID ${idExhibitionToDelete} deletada.`);
        }
        else {
            console.log("Exposição não encontrada.");
        }
    }
    addArtToExhibition() {
        const idExhibition = readlineSync.questionInt("Digite o ID da exposição para adicionar uma obra de arte: ");
        const exhibition = this.exhibitionController.getExhibition(idExhibition);
        if (exhibition) {
            const idArtToAdd = readlineSync.questionInt("Digite o ID da obra de arte a ser adicionada: ");
            const artToAdd = this.exhibitionController.getArt(idArtToAdd);
            if (artToAdd) {
                if (this.exhibitionController.addArtToExhibition(idExhibition, idArtToAdd)) {
                    console.log(`Obra de arte "${artToAdd.getTitle()}" adicionada à exposição "${exhibition.getName()}".`);
                }
                else {
                    console.log("Erro ao adicionar a obra de arte à exposição (a obra pode já estar na exposição).");
                }
            }
            else {
                console.log("Obra de arte não encontrada.");
            }
        }
        else {
            console.log("Exposição não encontrada.");
        }
    }
    removeArtFromExhibition() {
        const idExhibition = readlineSync.questionInt("Digite o ID da exposição para remover uma obra de arte: ");
        const exhibition = this.exhibitionController.getExhibition(idExhibition);
        if (exhibition) {
            const idArtToRemove = readlineSync.questionInt("Digite o ID da obra de arte a ser removida: ");
            const artToRemove = this.exhibitionController.getArt(idArtToRemove);
            if (artToRemove) {
                if (this.exhibitionController.removeArtFromExhibition(idExhibition, idArtToRemove)) {
                    console.log(`Obra de arte "${artToRemove.getTitle()}" removida da exposição "${exhibition.getName()}".`);
                }
                else {
                    console.log("Erro ao remover a obra de arte da exposição (a obra pode não estar nesta exposição).");
                }
            }
            else {
                console.log("Obra de arte não encontrada.");
            }
        }
        else {
            console.log("Exposição não encontrada.");
        }
    }
}
exports.default = ExhibitionView;
