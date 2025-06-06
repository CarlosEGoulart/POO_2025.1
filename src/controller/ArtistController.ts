import Database from "../db/Database";
import Artist from "../model/Classes/Artist";

export default class ArtistController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async createArtist(name: string, bio: string, birthYear: number, instagram: string): Promise<Artist> {
        return await this.db.createArtist(name, bio, birthYear, instagram);
    }

    public async getArtist(id: number): Promise<Artist | null>;
    public async getArtist(name: string): Promise<Artist | null>;
    public async getArtist(id: number, extra: string): Promise<Artist | null>;
    public async getArtist(param: number | string, extra?: string): Promise<Artist | null> {
        if (typeof param === "number") {
            return await this.db.readArtist(param);
        } 
        else if (typeof param === "string") {
            return await this.db.readArtistByName(param);
        }
        return null;
    }

    public async listArtists(): Promise<Artist[]> {
        return await this.db.readAllArtists();
    }

    public async updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string): Promise<boolean>;
    public async updateArtist(param: number | string, name: string, bio: string, birthYear: number, instagram: string, extra?: string): Promise<boolean>;
    public async updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string, extra?: string): Promise<boolean>;
    public async updateArtist(param: number | string, name: string, bio: string, birthYear: number, instagram: string, extra?: string): Promise<boolean> {
        if (typeof param === "number") {
            return await this.db.updateArtist(param, name, bio, birthYear, instagram);
        } 
        else if (typeof param === "string") {
            const artist = await this.db.readArtistByName(param);
            if (artist) {
                return await this.db.updateArtist(artist.getId(), param, bio, birthYear, instagram);
            }
        }
        return false;
    }

    public async deleteArtist(id: number): Promise<boolean>;
    public async deleteArtist(name: string): Promise<boolean>;
    public async deleteArtist(id: number, extra: string): Promise<boolean>;
    public async deleteArtist(param: number | string, extra?: string): Promise<boolean> {
        if (typeof param === "number") {
            return await this.db.deleteArtist(param);
        } 
        else if (typeof param === "string") {
            const artist = await this.db.readArtistByName(param);
            if (artist) {
                return this.db.deleteArtist(artist.getId());
            }
        }
        return false;
    }
}