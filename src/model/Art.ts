import BaseEntity from "./BaseEntity";
import Artist from "./Artist";

export default class Art extends BaseEntity {
    private description: string;
    private year: number;
    private artist?: Artist;

    constructor(id: number, name: string, description: string, year: number, artist?: Artist) {
        super(id, name);
        this.description = description;
        this.year = year;
        this.artist = artist;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getYear(): number {
        return this.year;
    }

    public setYear(year: number): void {
        this.year = year;
    }

    public getArtist(): Artist | undefined {
        return this.artist;
    }

    public setArtist(artist: Artist): void {
        this.artist = artist;
    }

    public getInfo(): string {
        return `Obra: ${this.name}, Descrição: ${this.description}, Ano: ${this.year}, Artista: ${this.artist ? this.artist.getName() : "Desconhecido"}`;
    }
}