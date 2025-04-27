import Art from "../model/Art";
import Artist from "../model/Artist";
import Database from "../db/Database";

export default class ArtController{
  private db: Database;

  constructor(db: Database){
    this.db = db;
  }

  public createArt(title: string, description: string, year: number): Art | null {
    return this.db.createArt(title, description, year);
  }

  public getArt(idArt: number): Art | undefined{
    return this.db.readArt(idArt);
  }

  public getArtByTitle(name:string): Art | undefined{
    return this.db.readArtByTitle(name);
  }

  public listArts(): Art[]{
    return this.db.readAllArts();
  }

  public updateArt(idArt: number, title: string, description: string, year: number): boolean{
    return this.db.updateArt(idArt, title, description, year);
  }

  public deleteArt(idArt: number): Art [] | undefined{
    return this.db.deleteArt(idArt);
  }

  public assignArtistToArt(idArt: number, artist: Artist): boolean{
    return this.db.assignArtistToArt(idArt, artist);
  }
}