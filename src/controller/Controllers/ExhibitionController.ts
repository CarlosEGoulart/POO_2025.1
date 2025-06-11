import Database from "../../db/Database";
import Exhibition from "../../model/Classes/Exhibition";
import GenericController from "./GenericController";
import ExhibitionRepository from "../Repositories/ExhibitionRepository";

export default class ExhibitionController {
    private controller: GenericController<Exhibition>;
    private repository: ExhibitionRepository;
  
    constructor(db: Database) {
      this.repository = new ExhibitionRepository(db);
      this.controller = new GenericController<Exhibition>(this.repository);
    }

    public async createExhibition(name: string, description: string): Promise<Exhibition> {
        return await this.repository.create(name, description);
    }

    public async getExhibition(param: number | string): Promise<Exhibition | null> {
        return await this.controller.read(param);
    }

    public async listExhibitions(): Promise<Exhibition[]> {
        return await this.controller.list();
    }

    public async updateExhibition(id: number, name: string, description: string): Promise<boolean> {
        return await this.controller.update(id, name, description);
    }

    public async deleteExhibition(param: number | string): Promise<boolean> {
        return await this.controller.delete(param);
    }

    public async addArtToExhibition(exhibitionId: number, artId: number): Promise<boolean> {
        return await this.repository.addArtToExhibition(exhibitionId, artId);
    }

    public async removeArtFromExhibition(exhibitionId: number, artId: number): Promise<boolean> {
        return await this.repository.removeArtFromExhibition(exhibitionId, artId);
    }

    public async listArtByExhibition(exhibitionId: number): Promise<number[] | undefined> {
        return await this.repository.listArtByExhibition(exhibitionId);
    }
}