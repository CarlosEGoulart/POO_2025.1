import ArtistController from "../controller/ArtistController";
import * as readlineSync from 'readline-sync';
import Message from "../model/Message/Message";
import { MessageType } from "../model/Message/EnumType";
import Exception from "../model/Error/Exception";

export default class ArtistView {
    private artistController: ArtistController;
    private message: Message;

    constructor(artistController: ArtistController, message: Message) {
        this.artistController = artistController;
        this.message = message;
    }

    public start(): void {
        while (true) {
            console.log("\n--- Gerenciar Artistas ---");
            console.log("1. Listar Artistas");
            console.log("2. Visualizar Detalhes do Artista");
            console.log("3. Criar Novo Artista");
            console.log("4. Atualizar Artista");
            console.log("5. Deletar Artista");
            console.log("0. Voltar ao Menu Principal");

            const choice = readlineSync.questionInt("Escolha uma opção: ");

            try {
                switch (choice) {
                    case 1:
                        this.listArtists();
                        break;
                    case 2:
                        this.viewArtistDetails();
                        break;
                    case 3:
                        this.createArtist();
                        break;
                    case 4:
                        this.updateArtist();
                        break;
                    case 5:
                        this.deleteArtist();
                        break;
                    case 0:
                        return;
                    default:
                        throw new Exception("Opção inválida");
                }
            }
            catch (error) {
                if (error instanceof Exception) {
                    console.error(error.message);
                }

                else {
                    this.message.showMessage(MessageType.Error);
                    console.error("Erro inesperado:", error);
                }
            }
        }
    }

    private async listArtists(): Promise<void> {
        const artists = await this.artistController.listArtists();
        if (artists.length === 0) {
            throw new Exception("Nenhum artista encontrado")
        }
        artists.forEach (artist => {
            console.log(`ID: ${artist.getId()}, Nome: ${artist.getName()}`);
        });
    }

    private async viewArtistDetails(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Nome do artista: ");
        let artist;

        if (!isNaN(Number(input))) {
            artist = await this.artistController.getArtist(Number(input));
        }

        else {
            artist = await this.artistController.getArtist(input);
        }

        if (artist) {
            console.log(artist.getInfo());
        }

        else {
            throw new Exception("Artista não encontrado");
        }
    }

    private async createArtist(): Promise<void> {
        const id = readlineSync.questionInt("ID: ");
        const name = readlineSync.question("Nome: ");
        const bio = readlineSync.question("Bio: ");
        const birthYear = readlineSync.questionInt("Ano de nascimento: ");
        const instagram = readlineSync.question("Instagram: ");
        await this.artistController.createArtist(id, name, bio, birthYear, instagram);
        this.message.showMessage(MessageType.Success);
    }

    private async updateArtist(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Nome do artista para atualizar: ");
        let artist;
        if (!isNaN(Number(input))) {
            artist = await this.artistController.getArtist(Number(input));
        }

        else {
            artist = await this.artistController.getArtist(input);
        }

        if (artist) {
            const namePrompt = `Novo nome (${artist.getName()}): `;
            const bioPrompt = `Nova bio (${artist.getBio()}): `;
            const birthYearPrompt = `Novo ano de nascimento (${artist.getBirthYear()}): `;
            const instagramPrompt = `Novo Instagram (${artist.getInstagram()}): `;

            let newName = readlineSync.question(namePrompt);
            if (!newName.trim()) newName = artist.getName();

            let newBio = readlineSync.question(bioPrompt);
            if (!newBio.trim()) newBio = artist.getBio();

            let newBirthYearInput = readlineSync.question(birthYearPrompt);
            let newBirthYear = newBirthYearInput.trim() ? Number(newBirthYearInput) : artist.getBirthYear();

            let newInstagram = readlineSync.question(instagramPrompt);
            if (!newInstagram.trim()) newInstagram = artist.getInstagram();

            try {
                await this.artistController.updateArtist(artist.getId(), newName, newBio, newBirthYear, newInstagram);
                this.message.showMessage(MessageType.Success);
            }

            catch (error) {
                throw new Exception("Erro ao atualizar artista");
            }
        }

        else {
            throw new Exception("Artista não encontrado");
        }
    }

    private async deleteArtist(): Promise<void> {
        const input = readlineSync.question("Digite o ID ou Nome do artista para deletar: ");
        let deleted;
        if (!isNaN(Number(input))) {
            deleted = await this.artistController.deleteArtist(Number(input));
        }

        else{
            deleted = await this.artistController.deleteArtist(input);
        }
        
        if (deleted) {
            this.message.showMessage(MessageType.Success);
        }

        else {
            throw new Exception("Artista não encontrado");
        }
    }
}
