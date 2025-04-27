import BaseEntity from "./BaseEntity"

export default class Artist extends BaseEntity{
  private bio: string;
  private birthYear: number;
  private instagram: string;

//Constructor com elementos indispensaveis para a construção de um objeto Artist
  constructor(idArtist: number, name: string, bio: string, birthYear: number, instagram: string){
    super(idArtist, name);
    this.bio = bio;
    this.birthYear = birthYear;
    this.instagram = instagram;
  }

  //Validação do ano de nascimento do artista
  private validateBirthYear(birthYear: number): void{
    if (birthYear < 0 || birthYear > new Date().getFullYear()){
      console.log("Ano de nascimento invalido!");
    }

    else{
      this.birthYear = birthYear;
    }
  }

  //Formatação do instagram para inseriro @ caso não esteja presente
  private formatInstagram(instagram: string): void{
    if (!instagram.startsWith('@')){
      instagram = '@' + instagram;
      this.instagram = instagram;
    }

    else{
      this.instagram = instagram;
    }
  }

  //GetInfo para retornar as informações do artista
    public getInfo(): string{
      return this.getBasicInfo();
    }
  
    //Gets e Sets 
    public getBio(): string{
      return this.bio;
    }
  
    public getBirthYear(): number{
      return this.birthYear;
    }
  
    public getInstagram(): string{
      return this.instagram;
    }
  
    public setBio(bio: string): void{
      this.bio = bio;
    }
  
    public setBirthYear(birthYear: number): void{
      this.validateBirthYear(birthYear);
    }
  
    public setInstagram(instagram: string): void{
      this.formatInstagram(instagram);
    }
  
}