export default abstract class BaseEntity {
    protected id: number;
    protected name: string;
    private description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    //Formatação do nome para caso o nome não seja inserido
    private formatName(name:string): void{
        if (name == ""){
            name = "Desconhecido";
            this.name = name;
        }
    
        else{
        this.name = name;
        }
    }

    //Gets e Sets
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setName(name: string): void {
        this.formatName(name);
    }

    public setId(id: number): void{
        this.id = id;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    // Método que será sobrescrito pelas classes filhas
    public abstract getInfo(): string;

    
    // Método que pode ser sobreposto pelas classes filhas
    public getBasicInfo():  string{
        return `ID: ${this.id}, Nome: ${this.name}`;
    }
}
