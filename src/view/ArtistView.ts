import ArtistController from "../controller/ArtistController";
import * as readlineSync from 'readline-sync';
import Artist from "../model/Artist";

export default class ArtistView {
    private artistController: ArtistController;

    constructor(artistController: ArtistController) {
        this.artistController = artistController;
    }

    public start(): void {
        while (true) {
            console.log("\n--- Gerenciar Artistas ---");
            console.log("1. Listar Artistas");
            console.log("3. Visualizar Detalhes do Artista");
            console.log("3. Criar Novo Artista");
            console.log("4. Atualizar Artista");
            console.log("5. Deletar Artista");
            console.log("0. Voltar ao Menu Principal");

            const choice = readlineSync.questionInt("Escolha uma opção: ");

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
                    console.log("Opção inválida. Tente novamente.");
            }
        }
    }

    private listArtists(): void {
        const artists = this.artistController.listArtists();
        if (artists.length === 0) {
            console.log("Nenhum artista cadastrado.");
            return;
        }
        console.log("\n--- Lista de Artistas ---");
        artists.forEach(artist => {
            console.log(`ID: ${artist.getId()}, Nome: ${artist.getName()}, Ano de Nascimento: ${artist.getBirthYear()}`);
        });
    }

    private viewArtistDetails(): void {
        const searchOption = readlineSync.question(
            "Deseja buscar o artista por (ID/Nome)? ",
            { limit: ['ID', 'Nome'], caseSensitive: false }
        ).toUpperCase();
    
        if (searchOption === 'ID') {
            const idArtist = readlineSync.questionInt("Digite o ID do artista: ");
            const artist = this.artistController.getArtist(idArtist);
            this.displayArtistDetails(artist);
        } else if (searchOption === 'NOME') { 
            const nameArtist = readlineSync.question("Digite o nome do artista: ");
            const artist = this.artistController.getArtistByName(nameArtist);
            this.displayArtistDetails(artist);
        } else {
            console.log("Opção inválida.");
        }
    }
    
    private displayArtistDetails(artist: Artist | undefined): void {
        if (artist) {
            console.log("\n--- Detalhes do Artista ---");
            console.log(`ID: ${artist.getId()}`);
            console.log(`Nome: ${artist.getName()}`);
            console.log(`Biografia: ${artist.getBio()}`);
            console.log(`Ano de Nascimento: ${artist.getBirthYear()}`);
            console.log(`Instagram: ${artist.getInstagram() || 'Não disponível'}`);
        } else {
            console.log("Artista não encontrado.");
        }
    }

    private createArtist(): void {
        const name = readlineSync.question("Digite o nome do artista: ");
        const bio = readlineSync.question("Digite a biografia do artista: ");
        const birthYear = readlineSync.questionInt("Digite o ano de nascimento do artista: ");
        const instagram = readlineSync.question("Digite o Instagram do artista: ");

        const newArtist = this.artistController.crateArtist(name, bio, birthYear, instagram);
        if (newArtist) {
            console.log(`Artista "${newArtist.getName()}" criado com ID: ${newArtist.getId()}.`);
        } else {
            console.log("Erro ao criar o artista.");
        }
    }

    private updateArtist(): void {
        const searchOption = readlineSync.question(
            "Deseja buscar o artista para atualizar por (ID/Nome)? ",
            { limit: ['ID', 'Nome'], caseSensitive: false }
        ).toUpperCase();
    
        let artistToUpdate: Artist | undefined;
        let artistId: number | undefined;
    
        if (searchOption === 'ID') {
            artistId = readlineSync.questionInt("Digite o ID do artista para atualizar: ");
            artistToUpdate = this.artistController.getArtist(artistId);
        } 
        
        else if (searchOption === 'NOME') {
            const nameArtist = readlineSync.question("Digite o nome do artista para atualizar: ");
            artistToUpdate = this.artistController.getArtistByName(nameArtist);
            if (artistToUpdate) {
                artistId = artistToUpdate.getId();
            } 
        }
        
        else {
            console.log("Opção inválida.");
            return;
        }
    
        if(artistToUpdate){
            console.log(`\n--- Atualizando Artista: ${artistToUpdate.getName()} (ID: ${artistToUpdate.getId()}) ---`);
    
            const newName = readlineSync.question(`Novo nome (${artistToUpdate.getName()}): `, { defaultInput: artistToUpdate.getName() });
            const newBio = readlineSync.question(`Nova biografia (${artistToUpdate.getBio()}): `, { defaultInput: artistToUpdate.getBio() });
            const newBirthYear = readlineSync.questionInt(`Novo ano de nascimento (${artistToUpdate.getBirthYear()}): `, { defaultInput: artistToUpdate.getBirthYear().toString() });
            const newInstagram = readlineSync.question(`Novo Instagram (${artistToUpdate.getInstagram() || ''}): `, { defaultInput: artistToUpdate.getInstagram() || '' });
    
            if (artistId !== undefined) {
                const updated = this.artistController.updateArtist(artistId, newName, newBio, newBirthYear, newInstagram);
                if (updated) {
                    console.log(`Artista com ID ${artistId} atualizado.`);
                }  
                else {
                    console.log("Erro ao atualizar o artista.");
                }
            }  
            else {
                console.log("Erro interno: ID do artista não disponível para atualização.");
            }
        } 
        else {
            console.log("Artista não encontrado.");
        }
    }

    private deleteArtist(): void {
        const searchOption = readlineSync.question(
            "Deseja buscar o artista para deletar por (ID/Nome)? ",
            { limit: ['ID', 'Nome'], caseSensitive: false }
        ).toUpperCase();
    
        let artistToDeleteId: number | undefined;
        let artistToDeleteName: string | undefined;
    
        if (searchOption === 'ID') {
            artistToDeleteId = readlineSync.questionInt("Digite o ID do artista para deletar: ");
        } else if (searchOption === 'NOME') {
            artistToDeleteName = readlineSync.question("Digite o nome do artista para deletar: ");
            const artistToDelete = this.artistController.getArtistByName(artistToDeleteName);
            if (artistToDelete) {
                artistToDeleteId = artistToDelete.getId();
            } else {
                console.log(`Artista com nome "${artistToDeleteName}" não encontrado.`);
                return;
            }
        } else {
            console.log("Opção inválida.");
            return;
        }
    
        if (artistToDeleteId !== undefined) {
            const deletedArtists = this.artistController.deleteArtist(artistToDeleteId);
            if (deletedArtists) {
                console.log(`Artista com ID ${artistToDeleteId} deletado.`);
            } else {
                console.log("Artista não encontrado.");
            }
        }
    }
}