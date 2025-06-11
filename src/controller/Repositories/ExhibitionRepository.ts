import { IGenericRepository } from "../../model/Interfaces/IGenericRepository";
import Database from "../../db/Database";
import Exhibition from "../../model/Classes/Exhibition";
import Art from "../../model/Classes/Art";

export default class ExhibitionRepository implements IGenericRepository<Exhibition> {
    private db: Database;
  
    constructor(db: Database) {
      this.db = db;
    }
  
    async create(name: string, description: string): Promise<Exhibition> {
      return await this.db.createExhibition(name, description);
    }
  
    async read(param: number | string): Promise<Exhibition | null> {
        if (typeof param === "number"){
            return await this.db.readExhibition(param);
        }
        
        if (typeof param === "string"){
            return await this.db.readExhibitionByName(param);
        }
      
        return null;
    }
  
    async readAll(): Promise<Exhibition[]> {
        return await this.db.readAllExhibitions();
    }
  
    async update(id: number, title: string, description: string, year: number, imageUrl: string): Promise<boolean> {
        return await this.db.updateArt(id, title, description, year, imageUrl);
    }
  
    async delete(id: number): Promise<boolean> {
        return await this.db.deleteExhibition(id);
    }

    async addArtToExhibition(exhibitionId: number, artId: number): Promise<boolean> {
        return await this.db.addArtToExhibition(exhibitionId, artId);
    }

    async removeArtFromExhibition(exhibitionId: number, artId: number): Promise<boolean> {
        return await this.db.removeArtFromExhibition(exhibitionId, artId);
    }

    async listArtByExhibition(exhibitionId: number): Promise<number[] | undefined> {
        return await this.db.getExhibitionArts(exhibitionId);
    }
}
