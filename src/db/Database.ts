import Art from "../model/Art";
import Artist from "../model/Artist";
import Exhibition from "../model/Exhibition";

export default class Database{
  private ArtDb: Art[] = [];
  private ArtistDb: Artist[] = [];
  private ExhibitionDb: Exhibition[] = [];
  private nextArtId: number = 1;
  private nextArtistId: number = 1;
  private nextExhibitionId: number = 1

//Métodos CRUD para Art
  public createArt(title: string, description: string, year: number): Art {
    const newArt = new Art(this.nextArtId++, title, description, year);
    this.ArtDb.push(newArt);
    return newArt;
  }

  public readArt(idArt: number): Art | undefined{
    for(let i = 0; i < this.ArtDb.length; i++){
      if(this.ArtDb[i].getId() === idArt){
        return this.ArtDb[i];
      }
      else{
        console.log("Obra não encontrada!");
      }
    }
  }

  public readArtByTitle(name:string): Art | undefined{
    for(let i = 0; i < this.ArtDb.length; i++){
      if(this.ArtDb[i].getName() === name){
        return this.ArtDb[i];
      }
      else{
        console.log("Obra não encontrada!")
      }
    }
  }

  public readAllArts(): Art[]{
    return this.ArtDb;
  }
  
  public updateArt(idArt: number, title:string, description: string, year: number):boolean{
    const art = this.readArt(idArt);
    if(art){
      art.setName(title);
      art.setDescription(description);
      art.setYear(year);
      return true; 
    }
    return false;
  }

  public deleteArt(idArt: number): Art[] | undefined{
    for(let i = 0; i < this.ArtDb.length; i++){
      if(this.ArtDb[i].getId() === idArt){
        this.ArtDb.splice(i, 1);
        return this.ArtDb;
      }
      else{
        console.log("Obra não encontrada!");
        return undefined;
      }
    }
  }

  public assignArtistToArt(idArt: number, artist: Artist): boolean {
    const art = this.readArt(idArt);
    if (art && artist) {
      art.setArtist(artist);
      return true;
    }
    return false;
  }
  

//Métodos CRUD para Artist
  public createArtist(name: string, bio: string, birthYear: number, instagram: string): Artist{
    const newArtist = new Artist(this.nextArtistId++, name, bio, birthYear, instagram);
    this.ArtistDb.push(newArtist);
    return newArtist;
  }

  public readArtist(idArtist: number): Artist | undefined{
    for(let i = 0; i < this.ArtistDb.length; i++){
      if(this.ArtistDb[i].getId() === idArtist){
        return this.ArtistDb[i];
      }
      else{
        console.log("Artista não encontrado!");
      }
    }
  }

  public readArtistByName(name:string): Artist | undefined{
    for(let i = 0; i < this.ArtistDb.length; i++){
      if(this.ArtistDb[i].getName() === name){
        return this.ArtistDb[i];
      }
      else{
        console.log("Artista não encontrado!");
      }
    }
  }

  public readAllArtists(): Artist[]{
    return this.ArtistDb;
  }

  public updateArtist(idArtist: number, name: string, bio: string, birthYear: number, instagram: string): boolean{
    const artist = this.readArtist(idArtist);
    if(artist){
      artist.setName(name);
      artist.setDescription(bio);
      artist.setBirthYear(birthYear);
      artist.setInstagram(instagram);
      return true;
    }
    else{
      return false;
    }  
  }

  public deleteArtist(idArtist: number): Artist[] | undefined{
    for(let i = 0; i < this.ArtistDb.length; i++){
      if(this.ArtistDb[i].getId() === idArtist){
        this.ArtistDb.splice(i, 1);
        return this.ArtistDb;
      }
      else{
        console.log("Artista não encontrado!");
        return undefined;
      }
    }
  }

//Métodos CRUD para Exhibition
  public createExhibition(name: string, description: string, artWorks: number[] = []): Exhibition {
    const newExhibition = new Exhibition(this.nextExhibitionId++, name, description, artWorks);
    this.ExhibitionDb.push(newExhibition);
    return newExhibition;
  }

  public readExhibition(idExhibition: number): Exhibition | undefined{
    for(let i = 0; i < this.ExhibitionDb.length; i++){
      if(this.ExhibitionDb[i].getId() === idExhibition){
        return this.ExhibitionDb[i];
      }
      else{
        console.log("Exibição não encontrada!");
      }
    }
  }

  public readExhibitionByName(name:string): Exhibition | undefined{
    for(let i = 0; i < this.ExhibitionDb.length; i++){
      if(this.ExhibitionDb[i].getName() === name){
        return this.ExhibitionDb[i];
      }
      else{
        console.log("Exibição não encontrada!")
      }
    }
  }
  

  public readAllExhibitions(): Exhibition[] {
    return this.ExhibitionDb;
  }

  public updateExhibition(idExhibition: number, name: string, description: string, artWorks: number[]): boolean {
    const Exhibition = this.readExhibition(idExhibition);
    if (Exhibition){
      Exhibition.setName(name);
      Exhibition.setDescription(description);
      Exhibition.setArtWorks(artWorks);
      return true;
    }
    else{
      return false;
    }     
  }

  public deleteExhibition(idExhibition: number): boolean {
    for(let i = 0; i < this.ExhibitionDb.length; i++){
      if(this.ExhibitionDb[i].getId() === idExhibition){
        this.ExhibitionDb.splice(i, 1);
        return true;
      }
    }
    return false;           
  }
           
  public addArtToExhibition(idExhibition: number, idArt: number): boolean {
    const exhibition = this.readExhibition(idExhibition);
    const art = this.readArt(idArt);
    if (exhibition && art) {
      const currentArtWorks = exhibition.getArtWorks();
      if (!currentArtWorks.includes(idArt)) {
        exhibition.setArtWorks([...currentArtWorks, idArt]);
        return true;
      }
    }
    return false;
  }

  public removeArtFromExhibition(idExhibition: number, idArt: number): boolean {
    const exhibition = this.readExhibition(idExhibition);
    if (exhibition) {
      const updatedArtWorks = exhibition.getArtWorks().filter(id => id !== idArt);
      exhibition.setArtWorks(updatedArtWorks);
      return true;
    }
    return false;
  }

  public getExhibitionArts(idExhibition: number): Art[] | undefined {
    for(let i = 0; i < this.ExhibitionDb.length; i++){
      if(this.ExhibitionDb[i].getId() === idExhibition){
        const artIds = this.ExhibitionDb[i].getArtWorks();
        const arts = artIds.map(id => this.readArt(id)).filter(art => art !== undefined) as Art[];
        return arts;
      }
      else{
        console.log("Exibição não encontrada!");
      }
    }
  }
}