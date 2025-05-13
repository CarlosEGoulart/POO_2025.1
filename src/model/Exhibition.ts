import BaseEntity from "./BaseEntity";

export default class Exhibition extends BaseEntity {
    private description: string;
    private artWorks: number[]; // IDs das obras

    constructor(id: number, name: string, description: string, artWorks: number[] = []) {
        super(id, name);
        this.description = description;
        this.artWorks = artWorks;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getArtWorks(): number[] {
        return this.artWorks;
    }

    public setArtWorks(artWorks: number[]): void {
        this.artWorks = artWorks;
    }

    public getYear(): number {
        // Exemplo: retorna o ano do nome, se estiver no nome, ou 0
        const match = this.name.match(/\d{4}/);
        return match ? parseInt(match[0]) : 0;
    }

    public getInfo(): string {
        return `Exposição: ${this.name}, Descrição: ${this.description}, Obras: ${this.artWorks.length}`;
    }
}