import BaseEntity from "./BaseEntity"

export default class Exhibition extends BaseEntity{
    private artWorks: number[] = [];


    //Constructor com elementos indispensaveis para a construção de um objeto Exhibition
    constructor(idExhibition: number, name: string, description: string, artWorks: number[]){
        super(idExhibition, name, description);
        this.artWorks = artWorks;
    }


    //GetInfo para retornar as informações da exibição
    public getInfo(): string{
        return this.getBasicInfo();
    }
    
    //Gets e Sets
    public getArtWorks(): number[]{
        return this.artWorks;
    }

    public setArtWorks(artWorks: number[]): void{
        this.artWorks = artWorks;
    }
}