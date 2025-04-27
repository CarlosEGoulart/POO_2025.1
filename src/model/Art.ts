import Artist from "./Artist"

export default class Art{
  private idArt: number;
  private title: string;
  private description: string;
  private year: number;
  private artist!: Artist;

  
  //Constructor com elementos indispensaveis para a construção de um objeto Art
  constructor(idArt: number, title: string, description: string, year: number){
    this.idArt = idArt;
    this.title = title;
    this.description = description;
    this.year = year;
  }

  //Validação do ano de criação da obra
  private validateYear(year: number): void{
    if (year < 0 || year > new Date().getFullYear())
      console.log("Ano invalido!");

    else{
      this.year = year;
    }
  }

  //Gets e Sets
  public getIdArt(): number{
    return this.idArt;
  }

  public getTitle(): string{
    return this.title;
  }

  public getDescription(): string{
    return this.description;
  }

  public getYear(): number{
    return this.year;
  }

  public getArtist(): Artist{
    return this.artist;
  }

  public setIdArt(idArt: number): void{
    this.idArt = idArt;
  }  

  public setTitle(title: string): void{
    this.title = title;
  }

  public setDescription(description: string): void{
    this.description = description;
  }

  public setYear(year: number): void{
    this.validateYear(year)
  }

  public setArtist(artist: Artist): void{
    this.artist = artist;
  }
}