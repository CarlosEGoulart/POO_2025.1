import { IGenericRepository } from "../../model/Interfaces/IGenericRepository";
import Artist from "../../model/Classes/Artist";
import Database from "../../db/Database";

export default class ArtistRepository implements IGenericRepository<Artist> {
    private db: Database;
  
    constructor(db: Database) {
      this.db = db;
    }
  
    async create(name: string, bio: string, birthYear: number, instagram: string): Promise<Artist> {
      return await this.db.createArtist(name, bio, birthYear, instagram);
    }
  
    async read(param: number | string): Promise<Artist | null> {
      if (typeof param === "number"){
        return await this.db.readArtist(param);
      } 
      
      if (typeof param === "string"){
        return await this.db.readArtistByName(param);
      }
      
      return null;
    }
  
    async readAll(): Promise<Artist[]> {
      return await this.db.readAllArtists();
    }
  
    async update(id: number, name: string, bio: string, birthYear: number, instagram: string): Promise<boolean> {
      return await this.db.updateArtist(id, name, bio, birthYear, instagram);
    }
  
    async delete(id: number): Promise<boolean> {
      return await this.db.deleteArtist(id);
    }
  }