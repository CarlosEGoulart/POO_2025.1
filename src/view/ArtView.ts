import ArtController from "../controller/ArtController";
import * as readlineSync from "readline-sync";
import Art from "../model/Art";

export default class ArtView {
  private artController: ArtController;

  constructor(artController: ArtController) {
    this.artController = artController;
  }

  public start(): void {
    while (true) {
      console.log("\n--- Gerenciar Obras de Arte ---");
      console.log("1. Criar Nova Obra de Arte");
      console.log("2. Visualizar Detalhes da Obra");
      console.log("3. Listar Obras de Arte");
      console.log("4. Atualizar Obra de Arte");
      console.log("5. Deletar Obra de Arte");
      console.log("6. Atribuir Artista à Obra");
      console.log("0. Voltar ao Menu Principal");

      const choice = readlineSync.questionInt("Escolha uma opção: ");

      switch (choice) {
        case 1:
          this.createArt();
          break;
        case 2:
          this.viewArtDetails();
          break;
        case 3:
          this.listArts();
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

  private createArt(): void {
    const title = readlineSync.question("Digite o título da obra: ");
    const description = readlineSync.question("Digite a descrição da obra: ");
    const year = readlineSync.questionInt("Digite o ano de criação da obra: ");

    const newArt = this.artController.createArt(title, description, year);
    if (newArt) {
      console.log(
        `Obra de arte "${newArt.getName()}" criada com ID: ${newArt.getId()}.`
      );
    } else {
      console.log("Erro ao criar a obra de arte.");
    }
  }

  private viewArtDetails(): void {
    const searchOption = readlineSync
      .question("Deseja buscar a obra de arte por (ID/Título)? ", {
        limit: ["ID", "Título"],
        caseSensitive: false,
      })
      .toUpperCase();

    let artToView: Art | undefined;

    if (searchOption === "ID") {
      const idArt = readlineSync.questionInt("Digite o ID da obra de arte: ");
      artToView = this.artController.getArt(idArt);
    } else if (searchOption === "TÍTULO") {
      const titleArt = readlineSync.question(
        "Digite o título da obra de arte: "
      );
      artToView = this.artController.getArtByTitle(titleArt);
    } else {
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
      } else {
        console.log("Artista: Não atribuído");
      }
    } else {
      console.log("Obra de arte não encontrada.");
    }
  }

  private listArts(): void {
    const arts = this.artController.listArts();
    if (arts.length === 0) {
      console.log("Nenhuma obra de arte cadastrada.");
      return;
    }
    console.log("\n--- Lista de Obras de Arte ---");
    arts.forEach((art) => {
      console.log(
        `ID: ${art.getId()}, Título: ${art.getName()}, Ano: ${art.getYear()}`
      );
    });
  }

  private updateArt(): void {
    const searchOption = readlineSync
      .question(
        "Deseja buscar a obra de arte para atualizar por (ID/Título)? ",
        { limit: ["ID", "Título"], caseSensitive: false }
      )
      .toUpperCase();

    let artToUpdate: Art | undefined;
    let artId: number | undefined;

    if (searchOption === "ID") {
      artId = readlineSync.questionInt(
        "Digite o ID da obra de arte para atualizar: "
      );
      artToUpdate = this.artController.getArt(artId);
    } else if (searchOption === "TÍTULO") {
      const titleArt = readlineSync.question(
        "Digite o título da obra de arte para atualizar: "
      );
      artToUpdate = this.artController.getArtByTitle(titleArt);
      if (artToUpdate) {
        artId = artToUpdate.getId();
      } else {
        console.log(`Obra de arte com título "${titleArt}" não encontrada.`);
        return;
      }
    } else {
      console.log("Opção inválida.");
      return;
    }

    if (artToUpdate) {
      console.log(
        `\n--- Atualizando Obra de Arte: ${artToUpdate.getName()} (ID: ${artToUpdate.getId()}) ---`
      );

      const newTitle = readlineSync.question(
        `Novo título (${artToUpdate.getName()}): `,
        { defaultInput: artToUpdate.getName() }
      );
      const newDescription = readlineSync.question(
        `Nova descrição (${artToUpdate.getDescription()}): `,
        { defaultInput: artToUpdate.getDescription() }
      );
      const newYear = readlineSync.questionInt(
        `Novo ano (${artToUpdate.getYear()}): `,
        { defaultInput: artToUpdate.getYear().toString() }
      );

      if (artId !== undefined) {
        const updated = this.artController.updateArt(
          artId,
          newTitle,
          newDescription,
          newYear
        );
        if (updated) {
          console.log(`Obra de arte com ID ${artId} atualizada.`);
        } else {
          console.log("Erro ao atualizar a obra de arte.");
        }
      } else {
        console.log(
          "Erro interno: ID da obra de arte não disponível para atualização."
        );
      }
    } else {
      console.log("Obra de arte não encontrada.");
    }
  }

  private deleteArt(): void {
    const searchOption = readlineSync
      .question("Deseja buscar a obra de arte para deletar por (ID/Título)? ", {
        limit: ["ID", "Título"],
        caseSensitive: false,
      })
      .toUpperCase();

    let artToDeleteId: number | undefined;
    let artToDeleteTitle: string | undefined;

    if (searchOption === "ID") {
      artToDeleteId = readlineSync.questionInt(
        "Digite o ID da obra de arte para deletar: "
      );
    } else if (searchOption === "TÍTULO") {
      artToDeleteTitle = readlineSync.question(
        "Digite o título da obra de arte para deletar: "
      );
      const artToDelete = this.artController.getArtByTitle(artToDeleteTitle);
      if (artToDelete) {
        artToDeleteId = artToDelete.getId();
      } else {
        console.log(
          `Obra de arte com título "${artToDeleteTitle}" não encontrada.`
        );
        return;
      }
    } else {
      console.log("Opção inválida.");
      return;
    }

    if (artToDeleteId !== undefined) {
      const deletedArts = this.artController.deleteArt(artToDeleteId);
      if (deletedArts) {
        console.log(`Obra de arte com ID ${artToDeleteId} deletada.`);
      } else {
        console.log("Obra de arte não encontrada.");
      }
    }
  }

  private assignArtistToArt(): void {
    console.log(
      "Funcionalidade de atribuir artista não completamente implementada nesta view."
    );
  }
}
