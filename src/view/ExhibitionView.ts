import ExhibitionController from "../controller/ExhibitionController";
import * as readlineSync from 'readline-sync';
import Exhibition from "../model/Exhibition";


export default class ExhibitionView {
    private exhibitionController: ExhibitionController;
    

    constructor(exhibitionController: ExhibitionController) {
        this.exhibitionController = exhibitionController;
    }

    public start(): void {
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

    private listExhibitions(): void {
        const exhibitions = this.exhibitionController.listExhibitions();
        if (exhibitions.length == 0) {
            console.log("Nenhuma exposição cadastrada.");
            return;
        }
        console.log("\n--- Lista de Exposições ---");
        exhibitions.forEach(exhibition => {
            console.log(`ID: ${exhibition.getId()}, Nome: ${exhibition.getName()}`);
        });
    }

    private viewExhibitionDetails(): void {
        const searchOption = readlineSync.question(
            "Deseja buscar a exposição por (ID/Nome)? ",
            { limit: ['ID', 'Nome'], caseSensitive: false }
        ).toUpperCase();
    
        let exhibitionToView: Exhibition | undefined;
        let exhibitionId: number | undefined;
        let exhibitionName: string | undefined;
    
        if (searchOption === 'ID') {
            exhibitionId = readlineSync.questionInt("Digite o ID da exposição: ");
            exhibitionToView = this.exhibitionController.getExhibition(exhibitionId);
        } else if (searchOption === 'NOME') {
            exhibitionName = readlineSync.question("Digite o nome da exposição: ");
            exhibitionToView = this.exhibitionController.getExhibitionByName(exhibitionName);
            if (exhibitionToView) {
                exhibitionId = exhibitionToView.getId();
            } else {
                console.log(`Exposição com nome "${exhibitionName}" não encontrada.`);
                return;
            }
        } else {
            console.log("Opção inválida.");
            return;
        }
    
        if (exhibitionToView) {
            console.log("\n--- Detalhes da Exposição ---");
            console.log(`ID: ${exhibitionToView.getId()}`);
            console.log(`Nome: ${exhibitionToView.getName()}`);
            console.log(`Descrição: ${exhibitionToView.getDescription()}`);
    
            const arts = this.exhibitionController.getExhibitionArts(exhibitionToView.getId());
            if (arts && arts.length > 0) {
                console.log("Obras de Arte na Exposição:");
                arts.forEach(art => {
                    console.log(`  - ID: ${art.getId()}, Título: ${art.getName()}`);
                });
            } else {
                console.log("Nenhuma obra de arte nesta exposição.");
            }
        } else {
            console.log("Exposição não encontrada.");
        }
    }

    private createExhibition(): void {
        const name = readlineSync.question("Digite o nome da exposição: ");
        const description = readlineSync.question("Digite a descrição da exposição: ");

        const newExhibition = this.exhibitionController.createExhibition(name, description);
        if (newExhibition) {
            console.log(`Exposição "${newExhibition.getName()}" criada com ID: ${newExhibition.getId()}.`);
        } else {
            console.log("Erro ao criar a exposição.");
        }
    }

    private updateExhibition(): void {
        const searchOption = readlineSync.question(
            "Deseja buscar a exposição para atualizar por (ID/Nome)? ",
            { limit: ['ID', 'Nome'], caseSensitive: false }
        ).toUpperCase();
    
        let exhibitionToUpdate: Exhibition | undefined;
        let exhibitionIdToUpdate: number | undefined;
    
        if (searchOption === 'ID') {
            exhibitionIdToUpdate = readlineSync.questionInt("Digite o ID da exposição para atualizar: ");
            exhibitionToUpdate = this.exhibitionController.getExhibition(exhibitionIdToUpdate);
        } else if (searchOption === 'NOME') {
            const exhibitionName = readlineSync.question("Digite o nome da exposição para atualizar: ");
            exhibitionToUpdate = this.exhibitionController.getExhibitionByName(exhibitionName);
            if (exhibitionToUpdate) {
                exhibitionIdToUpdate = exhibitionToUpdate.getId();
            } else {
                console.log(`Exposição com nome "${exhibitionName}" não encontrada.`);
                return;
            }
        } else {
            console.log("Opção inválida.");
            return;
        }
    
        if (exhibitionToUpdate) {
            console.log(`\n--- Atualizando Exposição: ${exhibitionToUpdate.getName()} (ID: ${exhibitionToUpdate.getId()}) ---`);
    
            const newIdExhibition = readlineSync.questionInt(`Novo ID: `);
            const newName = readlineSync.question(`Novo nome: `);
            const newDescription = readlineSync.question(`Nova descrição: `);
            const newArtWorksInput = readlineSync.question(`Novas obras (IDs separados por vírgula, exemplo: 1,2,3,4): `);
    
            const artWorksArray = newArtWorksInput.split(',').map((id: string) => parseInt(id.trim()));
    
            if (exhibitionIdToUpdate !== undefined) {
                const updated = this.exhibitionController.updateExhibition(newIdExhibition, newName, newDescription, artWorksArray);
    
                if (updated) {
                    console.log(`Exposição com ID ${exhibitionIdToUpdate} atualizada.`);
                } else {
                    console.log("Erro ao atualizar a exposição.");
                }
            } else {
                console.log("Erro interno: ID da exposição não disponível para atualização.");
            }
        } else {
            console.log("Exposição não encontrada.");
        }
    }

    private deleteExhibition(): void {
        const searchOption = readlineSync.question(
            "Deseja buscar a exposição para deletar por (ID/Nome)? ",
            { limit: ['ID', 'Nome'], caseSensitive: false }
        ).toUpperCase();
    
        let exhibitionToDeleteId: number | undefined;
        let exhibitionToDeleteName: string | undefined;
    
        if (searchOption === 'ID') {
            exhibitionToDeleteId = readlineSync.questionInt("Digite o ID da exposição para deletar: ");
        } else if (searchOption === 'NOME') {
            exhibitionToDeleteName = readlineSync.question("Digite o nome da exposição para deletar: ");
            const exhibitionToDelete = this.exhibitionController.getExhibitionByName(exhibitionToDeleteName);
            if (exhibitionToDelete) {
                exhibitionToDeleteId = exhibitionToDelete.getId();
            } else {
                console.log(`Exposição com nome "${exhibitionToDeleteName}" não encontrada.`);
                return;
            }
        } else {
            console.log("Opção inválida.");
            return;
        }
    
        if (exhibitionToDeleteId !== undefined) {
            const deleted = this.exhibitionController.deleteExhibition(exhibitionToDeleteId);
            if (deleted) {
                console.log(`Exposição com ID ${exhibitionToDeleteId} deletada.`);
            } else {
                console.log("Exposição não encontrada.");
            }
        }
    }

    private addArtToExhibition(): void {
        console.log("Adicionar obra de arte à exposição: Ainda em desenvolvimento.");
    }
    
    private removeArtFromExhibition(): void {
        console.log("Remover obra de arte da exposição: Ainda em desenvolvimento.");
    }
}