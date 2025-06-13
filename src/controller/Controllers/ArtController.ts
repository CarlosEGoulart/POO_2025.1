import Database from "../../db/Database";
import Art from "../../model/Classes/Art";
import GenericController from "./GenericController";
import ArtRepository from "../Repositories/ArtRepository";
import Artist from "../../model/Classes/Artist";


export default class ArtController {
    private controller: GenericController<Art>;
    private repository: ArtRepository;
  
    constructor(db: Database) {
      this.repository = new ArtRepository(db);
      this.controller = new GenericController<Art>(this.repository);
    }

    public async createArt(title: string, description: string, year: number, imageUrl: string): Promise<Art> {
        return await this.repository.create(title, description, year, imageUrl);
    }

    public async getArt(param: number | string): Promise<Art | null> {
        return await this.controller.read(param);
    }

    public async listArt(): Promise<Art[]> {
        return await this.controller.list();
    }

    public async updateArt(title: string, description: string, year: number, imageUrl: string): Promise<boolean> {
        return await this.controller.update(title, description, year, imageUrl);
    }

    public async deleteArt(param: number | string): Promise<boolean> {
        return await this.controller.delete(param);
    }

    public async assignArtistToArt(artId: number, artist: Artist): Promise<boolean> {
        return await this.repository.assignArtistToArt(artId, artist);
    }
}

