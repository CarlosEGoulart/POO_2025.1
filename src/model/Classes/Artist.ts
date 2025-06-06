import BaseEntity from "./BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("artist")
export default class Artist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({
        length: 50,
    })
    name!: string

    @Column()
    bio: string;
    
    @Column()
    birthYear: number;
    
    @Column()
    instagram: string;

    constructor(name: string, bio: string, birthYear: number, instagram: string) {
        super(0, name);
        this.bio = bio;
        this.birthYear = birthYear;
        this.instagram = instagram;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    
    public getBio(): string {
        return this.bio;
    }

    public setBio(bio: string): void {
        this.bio = bio;
    }

    public getBirthYear(): number {
        return this.birthYear;
    }

    public setBirthYear(birthYear: number): void {
        this.birthYear = birthYear;
    }

    public getInstagram(): string {
        return this.instagram;
    }

    public setInstagram(instagram: string): void {
        this.instagram = instagram;
    }

    public getInfo(): string {
        return `Artista: ${this.name}, Bio: ${this.bio}, Ano de Nascimento: ${this.birthYear}, Instagram: ${this.instagram}`;
    }
}