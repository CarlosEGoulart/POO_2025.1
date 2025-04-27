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
class ArtistView {
    constructor(artistController) {
        this.artistController = artistController;
    }
    start() {
        while (true) {
            console.log("\n--- Gerenciar Artistas ---");
            console.log("1. Listar Artistas");
            console.log("2. Visualizar Detalhes do Artista");
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
    listArtists() {
        const artists = this.artistController.listArtists();
        if (artists.length === 0) {
            console.log("Nenhum artista cadastrado.");
            return;
        }
        console.log("\n--- Lista de Artistas ---");
        artists.forEach(artist => {
            console.log(`ID: ${artist.getIdArtist()}, Nome: ${artist.getName()}, Ano de Nascimento: ${artist.getBirthYear()}`);
        });
    }
    viewArtistDetails() {
        const idArtist = readlineSync.questionInt("Digite o ID do artista para visualizar os detalhes: ");
        const artist = this.artistController.getArtist(idArtist);
        if (artist) {
            console.log("\n--- Detalhes do Artista ---");
            console.log(`ID: ${artist.getIdArtist()}`);
            console.log(`Nome: ${artist.getName()}`);
            console.log(`Biografia: ${artist.getBio()}`);
            console.log(`Ano de Nascimento: ${artist.getBirthYear()}`);
            console.log(`Instagram: ${artist.getInstagram()}`);
        }
        else {
            console.log("Artista não encontrado.");
        }
    }
    createArtist() {
        const name = readlineSync.question("Digite o nome do artista: ");
        const bio = readlineSync.question("Digite a biografia do artista: ");
        const birthYear = readlineSync.questionInt("Digite o ano de nascimento do artista: ");
        const instagram = readlineSync.question("Digite o Instagram do artista: ");
        const newArtist = this.artistController.crateArtist(name, bio, birthYear, instagram);
        if (newArtist) {
            console.log(`Artista "${newArtist.getName()}" criado com ID: ${newArtist.getIdArtist()}.`);
        }
        else {
            console.log("Erro ao criar o artista.");
        }
    }
    updateArtist() {
        const idArtist = readlineSync.questionInt("Digite o ID do artista para atualizar: ");
        const artistToUpdate = this.artistController.getArtist(idArtist);
        if (artistToUpdate) {
            const newName = readlineSync.question(`Novo nome (${artistToUpdate.getName()}): `, { defaultInput: artistToUpdate.getName() });
            const newBio = readlineSync.question(`Nova biografia (${artistToUpdate.getBio()}): `, { defaultInput: artistToUpdate.getBio() });
            const newBirthYear = readlineSync.questionInt(`Novo ano de nascimento (${artistToUpdate.getBirthYear()}): `, { defaultInput: artistToUpdate.getBirthYear().toString() });
            const newInstagram = readlineSync.question(`Novo Instagram (${artistToUpdate.getInstagram()}): `, { defaultInput: artistToUpdate.getInstagram() });
            const updated = this.artistController.updateArtist(idArtist, newName, newBio, newBirthYear, newInstagram);
            if (updated) {
                console.log(`Artista com ID ${idArtist} atualizado.`);
            }
            else {
                console.log("Erro ao atualizar o artista.");
            }
        }
        else {
            console.log("Artista não encontrado.");
        }
    }
    deleteArtist() {
        const idArtistToDelete = readlineSync.questionInt("Digite o ID do artista para deletar: ");
        const deletedArtists = this.artistController.deleteArtist(idArtistToDelete);
        if (deletedArtists) {
            console.log(`Artista com ID ${idArtistToDelete} deletado.`);
        }
        else {
            console.log("Artista não encontrado.");
        }
    }
}
exports.default = ArtistView;
