import ExhibitionController from "../controller/Controllers/ExhibitionController";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message/Message";
import { MessageType } from "../model/Message/EnumType";
import Exhibition from "../model/Classes/Exhibition";
import Exception from "../model/Error/Exception";

export default class ExhibitionView {
    private exhibitionController: ExhibitionController;
    private message: Message;

    constructor(exhibitionController: ExhibitionController, message: Message) {
        this.exhibitionController = exhibitionController;
        this.message = message;
    }

    public async start(): Promise<void> {
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
                        throw new Exception("Opção inválida");
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }

                else {
                    this.message.showMessage(MessageType.Error);
                    console.error("Erro inesperado:", error);
                }
            }
        }
    }

    private async listExhibitions(): Promise<void> {
        const exhibitions = await this.exhibitionController.listExhibitions();
        if (exhibitions.length === 0) {
            this.message.showMessage(MessageType.NotFound);
            return;
        }
        exhibitions.forEach(exhibition => {
            console.log(`ID: ${exhibition.getId()}, Título: ${exhibition.getName()}, Obras: ${exhibition.getArtWorks().length}`);
        });
    }

    private async viewExhibitionDetails(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Título da exposição: ");
        let exhibition: Exhibition | null;

        if (!isNaN(Number(input))) {
            exhibition = await this.exhibitionController.getExhibition(Number(input));
        }

        else {
            exhibition = await this.exhibitionController.getExhibition(input);
        }


        if (exhibition) {
            console.log(exhibition.getInfo());
            this.message.showMessage(MessageType.Success);
        }

        else {
            throw new Exception("Exposição não encontrada");
        }
    }

    private async createExhibition(): Promise<void> {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        this.exhibitionController.createExhibition(title, description);
        this.message.showMessage(MessageType.Success);
    }


    private async updateExhibition(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Título da exposição para atualizar: ");
        let exhibition: Exhibition | null;
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
                this.message.showMessage(MessageType.Success);
            }

            catch (error) {
                throw new Exception("Erro ao atualizar a exposição");
            }
        }

        else {
            throw new Exception("Exposição não encontrada");
        }
    }

    private async deleteExhibition(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Título da exposição para deletar: ");
        let deleted;

        if (!isNaN(Number(input))) {
            deleted = await this.exhibitionController.deleteExhibition(Number(input));
        }

        else {
            deleted = await this.exhibitionController.deleteExhibition(input);
        }

        if (deleted) {
            this.message.showMessage(MessageType.Success);
        }

        else{
            throw new Exception("Erro ao deletar a exposição");
        }
    }

    private async assignArtToExhibition(): Promise<void> {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");

        try {
            await this.exhibitionController.addArtToExhibition(Number(exhibitionInput), Number(artInput));
            this.message.showMessage(MessageType.Success);
        }

        catch (error) {
            throw new Exception("Erro ao adicionar arte à exposição");
        }
    }

    private async removeArtFromExhibition(): Promise<void> {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const artInput = readlineSync.question("Digite o ID da arte: ");

        try {
            await this.exhibitionController.removeArtFromExhibition(Number(exhibitionInput), Number(artInput));
            this.message.showMessage(MessageType.Success);
        }

        catch (error) {
            throw new Exception("Erro ao remover arte da exposição");
        }
    }

    public async getExhibitionArts(): Promise<void> {
        const exhibitionInput = readlineSync.question("Digite o ID da exibição: ");
        const arts = await this.exhibitionController.listArtByExhibition(Number(exhibitionInput));
        
        
        try{
            if (!arts || arts.length === 0) {
                this.message.showMessage(MessageType.NotFound);
            }
        }
        catch (error) {
            throw new Exception("Erro ao obter obras da exposição");
        }
    }
}
