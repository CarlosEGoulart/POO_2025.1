import Art from './Art';
import BaseEntity from './BaseEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity("exhibition")
export default class Exhibition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 50,
    })
    name!: string
    
    @Column()
    description: string;
    
    @ManyToOne(() => Art, (art) => art)
    artWorks: number[];
    

    constructor(name: string, description: string, artWorks: number[] = []) {
        super(0, name);
        this.description = description;
        this.artWorks = artWorks;
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

    public getArtWorks(): number[] {
        return this.artWorks;
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

    public setArtWorks(artWorks: number[]): void {
        this.artWorks = artWorks;
    }

    public getInfo(): string {
        return `Exposição: ${this.name}, Descrição: ${this.description}, Obras: ${this.artWorks.length}`;
    }

    public getType(): string {
        return "Exhibition";
    }
}