import Art from "../model/Classes/Art";
import Database from "../db/Database";

export default class ArtController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async createArt( title: string, description: string, year: number, imageUrl: string): Promise<Art> {
        return await this.db.createArt(title, description, year, imageUrl);
    }

    public async getArt<T extends number | string>(param: T): Promise<Art | null>{
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

    public async updateArt<T extends string | number>(param: T | string, title: string, description: string, year: number, imageUrl: string): Promise<boolean> {
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

    public async deleteArt<T extends number | string>(param: T): Promise<boolean> {
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
