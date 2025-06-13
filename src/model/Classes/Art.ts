import BaseEntity from "./BaseEntity";
import Artist from "./Artist";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("art")
export default class Art extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        length: 50,
    })
    name!: string;

    @Column()
    description: string;
    
    @Column()
    year: number;
    
    @ManyToOne(() => Artist , (artist) => artist)
    artist?: Artist;
    
    @Column()
    imageUrl: string;

 constructor(name: string, description: string, year: number, imageUrl: string = "", artist?: Artist) {
        super(0, name);
        this.description = description;
        this.year = year;
        this.artist = artist;
        this.imageUrl = imageUrl
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
    
    public getDescription(): string {
        return this.description;
    }
    
    public getYear(): number {
        return this.year;
    }

    public getArtist(): Artist | undefined {
        return this.artist;
    }
    
    public getImageUrl(): string {
        return this.imageUrl;
    }
    
    public setId(id: number): void {
        this.id = id;
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    public setDescription(description: string): void {
        this.description = description;
    }

    public setYear(year: number): void {
        this.year = year;
    }

    public setArtist(artist: Artist): void {
        this.artist = artist;
    }
    
    public setImageUrl(imageUrl: string): void {
        this.imageUrl = imageUrl;
    }

    public getInfo(): string {
        return `Obra: ${this.name}, Descrição: ${this.description}, Ano: ${this.year}, URL da Imagem: ${this.imageUrl}, Artista: ${this.artist ? this.artist.getName() : "Desconhecido"}`;
    }

    public getType(): string {
        return "Art";
    }
}