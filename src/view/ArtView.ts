import ArtController from "../controller/ArtController";
import * as readlineSync from 'readline-sync';

export default class ArtView {
    private artController: ArtController;

    constructor(artController: ArtController) {
        this.artController = artController;
    }

    public start(): void {
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

    private listArts(): void {
        const arts = this.artController.listArts();
        if (arts.length === 0) {
            console.log("Nenhuma obra de arte cadastrada.");
            return;
        }
        console.log("\n--- Lista de Obras de Arte ---");
        arts.forEach(art => {
            console.log(`ID: ${art.getIdArt()}, Título: ${art.getTitle()}, Ano: ${art.getYear()}`);
        });
    }

    private viewArtDetails(): void {
        const idArt = readlineSync.questionInt("Digite o ID da obra de arte para visualizar os detalhes: ");
        const art = this.artController.getArt(idArt);
        if (art) {
            console.log("\n--- Detalhes da Obra de Arte ---");
            console.log(`ID: ${art.getIdArt()}`);
            console.log(`Título: ${art.getTitle()}`);
            console.log(`Descrição: ${art.getDescription()}`);
            console.log(`Ano: ${art.getYear()}`);
            if (art.getArtist()) {
                console.log(`Artista: ${art.getArtist().getName()}`);
            } else {
                console.log("Artista: Não atribuído");
            }
        } else {
            console.log("Obra de arte não encontrada.");
        }
    }

    private createArt(): void {
        const title = readlineSync.question("Digite o título da obra: ");
        const description = readlineSync.question("Digite a descrição da obra: ");
        const year = readlineSync.questionInt("Digite o ano de criação da obra: ");

        const newArt = this.artController.createArt(title, description, year);
        if (newArt) {
            console.log(`Obra de arte "${newArt.getTitle()}" criada com ID: ${newArt.getIdArt()}.`);
        } else {
            console.log("Erro ao criar a obra de arte.");
        }
    }

    private updateArt(): void {
        const idArt = readlineSync.questionInt("Digite o ID da obra de arte para atualizar: ");
        const artToUpdate = this.artController.getArt(idArt);
        if (artToUpdate) {
            const newTitle = readlineSync.question(`Novo título (${artToUpdate.getTitle()}): `, { defaultInput: artToUpdate.getTitle() });
            const newDescription = readlineSync.question(`Nova descrição (${artToUpdate.getDescription()}): `, { defaultInput: artToUpdate.getDescription() });
            const newYear = readlineSync.questionInt(`Novo ano (${artToUpdate.getYear()}): `, { defaultInput: artToUpdate.getYear().toString() });

            const updated = this.artController.updateArt(idArt, newTitle, newDescription, newYear);
            if (updated) {
                console.log(`Obra de arte com ID ${idArt} atualizada.`);
            } else {
                console.log("Erro ao atualizar a obra de arte.");
            }
        } else {
            console.log("Obra de arte não encontrada.");
        }
    }

    private deleteArt(): void {
        const idArtToDelete = readlineSync.questionInt("Digite o ID da obra de arte para deletar: ");
        const deletedArts = this.artController.deleteArt(idArtToDelete);
        if (deletedArts) {
            console.log(`Obra de arte com ID ${idArtToDelete} deletada.`);
        } else {
            console.log("Obra de arte não encontrada.");
        }
    }

    private assignArtistToArt(): void {
        console.log("Funcionalidade de atribuir artista não completamente implementada nesta view.");
    }    
}