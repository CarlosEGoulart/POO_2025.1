import Database from "../../db/Database";
import Artist from "../../model/Classes/Artist";
import GenericController from "./GenericController";
import ArtistRepository from "../Repositories/ArtistRepository";


export default class ArtistController {
    private controller: GenericController<Artist>;
    private repository: ArtistRepository;
  
    constructor(db: Database) {
      this.repository = new ArtistRepository(db);
      this.controller = new GenericController<Artist>(this.repository);
    }

    public async createArtist(name: string, bio: string, birthYear: number, instagram: string): Promise<Artist> {
        return await this.repository.create(name, bio, birthYear, instagram);
    }

    public async getArtist(param: number | string): Promise<Artist> {
        return await this.controller.read(param);
    }

    public async listArtists(): Promise<Artist[]> {
        return await this.controller.list();
    }

    public async updateArtist(param: number | string, name: string, bio: string, birthYear: number, instagram: string): Promise<boolean> {
        return await this.controller.update(param, name, bio, birthYear, instagram);
    }

    public async deleteArtist(param: number | string): Promise<boolean> {
        return await this.controller.delete(param);
    }

}