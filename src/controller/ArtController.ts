import Art from "../model/Classes/Art";
import Database from "../db/Database";
import Artist from "../model/Classes/Artist";

export default class ArtController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async createArt(artId: number, title: string, description: string, year: number, imageUrl: string): Promise<Art> {
        return await this.db.createArt(artId, title, description, year, imageUrl);
    }

    public async getArt(id: number): Promise<Art | null>;
    public async getArt(title: string): Promise<Art | null>;
    public async getArt(param: number | string, extra?: string): Promise<Art | null> {
        if (typeof param === "number") {
            return await this.db.readArt(param);
        } 
        else if (typeof param === "string") {
            return await this.db.readArtByTitle(param);
        } 
        return null;
    }

    public async listArts(): Promise<Art[]> {
        return await this.db.readAllArts();
    }

    public async updateArt(id: number, title: string, description: string, year: number, imageUrl: string): Promise<boolean>;
    public async updateArt(param: number | string, title: string, description: string, year: number, imageUrl: string, extra?: string): Promise<boolean>;
    public async updateArt(id: number, title: string, description: string, year: number, imageUrl: string, extra?: string): Promise<boolean>;
    public async updateArt(param: number | string, title: string, description: string, year: number, imageUrl: string): Promise<boolean> {
        if (typeof param === "number") {
            return await this.db.updateArt(param, title, description, year, imageUrl);
        } 
        else if (typeof param === "string") {
            const art = await this.db.readArtByTitle(param);
            if (art) {
                return await this.db.updateArt(art.getId(), title, description, year, imageUrl);
            }
        }
        return false;
    }

    public async deleteArt(id: number): Promise<boolean>;
    public async deleteArt(title: string): Promise<boolean>;
    public async deleteArt(id: number, extra: string): Promise<boolean>;
    public async deleteArt(param: number | string): Promise<boolean> {
        if (typeof param === "number") {
            return this.db.deleteArt(param);
        } 
        else if (typeof param === "string") {
            const art = await this.db.readArtByTitle(param);
            if (art) {
                return this.db.deleteArt(art.getId());
            }
        }
        return false;
    }

    public async assignArtistToArt(artId: number, artistId: number): Promise<boolean> {
        const artist = await this.db.readArtist(artistId);
        if (artist) {
            return this.db.assignArtistToArt(artId, artist);
        }
        return false;
    }
}
