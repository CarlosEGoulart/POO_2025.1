import ArtController from "../controller/Controllers/ArtController";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message/Message";
import { MessageType } from "../model/Message/EnumType";
import Art from "../model/Classes/Art";
import Exception from "../model/Error/Exception";
import ArtistController from "../controller/Controllers/ArtistController";

export default class ArtView {
    private artController: ArtController;
    private message: Message;
    private artistController: ArtistController;

    constructor(artController: ArtController, message: Message, artistController: ArtistController) {
        this.artController = artController;
        this.message = message;
        this.artistController = artistController;
    }

    public async start(): Promise<void> {
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
                        this.message.showMessage(MessageType.Error);
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

    private async listArts(): Promise<void> {
        const arts = await this.artController.listArt();
        if (arts.length === 0) {
            this.message.showMessage(MessageType.NotFound);
            return;
        }
        arts.forEach(art => {
            console.log(`ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`);
        });
    }

    private async viewArtDetails(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Título da obra: ");
        let art: Art | null;

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
            throw new Exception("Obra não encontrada");
        }

    }

    private async createArt(): Promise<void> {
        const title = readlineSync.question("Título: ");
        const description = readlineSync.question("Descrição: ");
        const year = readlineSync.questionInt("Ano: ");
        const imageUrl = readlineSync.question("URL da Imagem: ");
        this.artController.createArt(title, description, year, imageUrl);
        this.message.showMessage(MessageType.Success);
    }

    private async updateArt(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Título da obra para atualizar: ");
        let art: Art | null;

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
                this.message.showMessage(MessageType.Success);

            }
            catch (error) {
                throw new Exception("Erro ao atualizar a obra");
            }
        }

        else {
            throw new Exception("Obra não encontrada");
        }

    }

    private async deleteArt(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Título da obra para deletar: ");
        let deleted;

        if (!isNaN(Number(input))) {
            deleted = await this.artController.deleteArt(Number(input));
        }

        else {
            deleted = await this.artController.deleteArt(input);
        }

        if (deleted) {
            this.message.showMessage(MessageType.Success);
        }

        else{
            throw new Exception("Erro ao deletar a obra");
        }
    }

    private async assignArtistToArt(): Promise<void> {
        const artInput = readlineSync.question("Digite o ID da obra: ");
        const artistInput = readlineSync.question("Digite o ID do artista: ");
        const artist = await this.artistController.getArtist(artistInput)

        try {
            await this.artController.assignArtistToArt(Number(artInput), artist);
            this.message.showMessage(MessageType.Success);
        }

        catch (error) {
            throw new Exception("Erro ao atribuir artista à obra");
            ;
        }
    }
}