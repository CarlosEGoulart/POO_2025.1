import { IEntity } from "../model/Interfaces/IEntity";
import Database from "../db/Database";

export default class GenericController<T extends IEntity> {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public getType(): string {
        return this.constructor.name;
    }

    public async read(param: T): Promise<any> {
        if (this.getType() === "Artist"){
            if (typeof param === "number") {
                return await this.db.readArtist(param);
            } 
            else if (typeof param === "string") {
                return await this.db.readArtistByName(param);
            }
            return null;
        }
        
        else if (this.getType() === "Art"){
            if (typeof param === "number") {
                return await this.db.readArt(param);
            } 
            else if (typeof param === "string") {
                return await this.db.readArtByTitle(param);
            } 
            return null;
        }
        
        else if (this.getType() === "Exhibition"){
            if (typeof param === "number") {
                return await this.db.readExhibition(param);
            } 
            else if (typeof param === "string") {
                return await this.db.readExhibitionByName(param);
            }
            return null;
        }
    };

    public async update(param: T, name: string, description: string, year: number, instagram: string, imageUrl: string, artWorks: number[]): Promise<any> {
        if (this.getType() === "Artist"){  
            if (typeof param === "number") {
                return await this.db.updateArtist(param, name, description, year, instagram);
            } 
            else if (typeof param === "string") {
                const artist = await this.db.readArtistByName(param);
                if (artist) {
                    return await this.db.updateArtist(artist.getId(), param, description, year, instagram);
                }
            }
            return false;
        }
        else if (this.getType() === "Art"){
            if (typeof param === "number") {
                return await this.db.updateArt(param, name, description, year, imageUrl);
            } 
            else if (typeof param === "string") {
                const art = await this.db.readArtByTitle(param);
                if (art) {
                    return await this.db.updateArt(art.getId(), name, description, year, imageUrl);
                }
            }
            return false;
        }
        else if (this.getType() === "Exhibition"){
            if (typeof param === "number") {
                return await this.db.updateExhibition(param, name, description, artWorks);
            } 
            else if (typeof param === "string") {
                const exhibition = await this.db.readExhibitionByName(param);
                if (exhibition) {
                    return await this.db.updateExhibition(exhibition.getId(), name, description, artWorks);
                }
            }
            return false;
        }
    };

    public async delete(param: T): Promise<any> {
        if (this.getType() === "Artist"){
            if (typeof param === "number") {
                return await this.db.deleteArtist(param);
            } 
            else if (typeof param === "string") {
                const artist = await this.db.readArtistByName(param);
                if (artist) {
                    return await this.db.deleteArtist(artist.getId());
                }
            }
            return false;
        }
        else if (this.getType() === "Art"){
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
        else if (this.getType() === "Exhibition"){
            if (typeof param === "number") {
                return await this.db.deleteExhibition(param);
            } 
            else if (typeof param === "string") {
                const exhibition = await this.db.readExhibitionByName(param);
                if (exhibition) {
                    return await this.db.deleteExhibition(exhibition.getId());
                }
            }
            return false;
        };
    };
}
