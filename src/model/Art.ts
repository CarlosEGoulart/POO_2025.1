import Artist from "./Artist"
import BaseEntity from "./BaseEntity";

export default class Art extends BaseEntity{
  private description: string;
  private year: number;
  private artist!: Artist;

  
  //Constructor com elementos indispensaveis para a construção de um objeto Art
  constructor(idArt: number, title: string, description: string, year: number){
    super(idArt, title)
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

  //GetInfo para retornar as informações da obra
  public getInfo(): string {
    return this.getBasicInfo();
  }
  
  //Gets e Sets
  public getDescription(): string{
    return this.description;
  }

  public getYear(): number{
    return this.year;
  }

  public getArtist(): Artist{
    return this.artist;
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