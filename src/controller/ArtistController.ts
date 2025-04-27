import DataBase from "../db/Database";
import Artist from "../model/Artist";

export default class ArtistController{
  private db: DataBase;

  constructor(db: DataBase){
    this.db = db;
  }

  public crateArtist(name: string, bio: string, birthYear: number, instagram: string): Artist | null{
    return this.db.createArtist(name, bio, birthYear, instagram);
  }

  public getArtist(idArtist: number): Artist | undefined{
    return this.db.readArtist(idArtist);
  }

  public getArtistByName(name: string): Artist | undefined{
    return this.db.readArtistByName(name);
  }

  public listArtists(): Artist[]{
    return this.db.readAllArtists();
  }

  public updateArtist(idArtist: number, name: string, bio: string, birthYear: number, instagram: string): boolean{
    return this.db.updateArtist(idArtist, name, bio, birthYear, instagram);
  }

  public deleteArtist(idArtist: number): Artist[] | undefined{
    return this.db.deleteArtist(idArtist);
  } 
}