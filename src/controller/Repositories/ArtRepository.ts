import { IGenericRepository } from "../../model/Interfaces/IGenericRepository";
import Database from "../../db/Database";
import Art from "../../model/Classes/Art";
import Artist from "../../model/Classes/Artist";

export default class ArtRepository implements IGenericRepository<Art> {
    private db: Database;
  
    constructor(db: Database) {
      this.db = db;
    }
  
    async create(title: string, description: string, year: number, imageUrl: string): Promise<Art> {
      return await this.db.createArt(title, description, year, imageUrl);
    }
  
    async read(param: number | string): Promise<Art | null> {
        if (typeof param === "number"){
            return await this.db.readArt(param);
        }
        
        if (typeof param === "string"){
            return await this.db.readArtByTitle(param);
        }
      
        return null;
    }
  
    async readAll(): Promise<Art[]> {
      return await this.db.readAllArts();
    }
  
    async update(id: number, title: string, description: string, year: number, imageUrl: string): Promise<boolean> {
      return await this.db.updateArt(id, title, description, year, imageUrl);
    }
  
    async delete(id: number): Promise<boolean> {
      return await this.db.deleteArt(id);
    }

    async assignArtistToArt(artId: number, artist: Artist): Promise<boolean> {
        return await this.db.assignArtistToArt(artId, artist);
    }
}