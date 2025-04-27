export default class Exhibition{
  private idExhibition: number;
  private name: string;
  private description: string;
  private artWorks: number[] = [];


//Constructor com elementos indispensaveis para a construção de um objeto Exhibition
  constructor(idExhibition: number, name: string, description: string, artWorks: number[]){
      this.idExhibition = idExhibition;
      this.name = name;
      this.description = description;
      this.artWorks = artWorks;
  }

//Formatação do nome para caso o nome não seja inserido, ser substituido pelo numero de seu Id
  private formatName(name: string): void{
      if(name == ""){
          name = "Exibição" + this.idExhibition;
          this.name = name;
      }

      else{
          this.name = name;
      }
  }


//Gets e Sets
  public getIdExhibition(): number{
      return this.idExhibition;
  }

  public getName(): string{ 
      return this.name;
  }

  public getDescription(): string{ 
      return this.description;
  }

  public getArtWorks(): number[]{
      return this.artWorks;
  }

  public setIdExhibition(idExhibition: number): void{
      this.idExhibition = idExhibition;
  }

  public setName(name: string): void{
      this.formatName(name);
  }

  public setDescription(description: string): void{
      this.description = description;
  }

  public setArtWorks(artWorks: number[]): void{
      this.artWorks = artWorks;
  }
}