import BaseEntity from "./BaseEntity"

export default class Exhibition extends BaseEntity{
    private description: string;
    private artWorks: number[] = [];


    //Constructor com elementos indispensaveis para a construção de um objeto Exhibition
    constructor(idExhibition: number, name: string, description: string, artWorks: number[]){
        super(idExhibition, name);
        this.description = description;
        this.artWorks = artWorks;
    }


    //GetInfo para retornar as informações da exibição
    public getInfo(): string{
        return this.getBasicInfo();
    }
    
    //Gets e Sets
    public getDescription(): string{ 
        return this.description;
    }

    public getArtWorks(): number[]{
        return this.artWorks;
    }

    public setDescription(description: string): void{
        this.description = description;
    }

    public setArtWorks(artWorks: number[]): void{
        this.artWorks = artWorks;
    }
}