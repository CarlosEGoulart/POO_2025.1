import Database from "../db/Database";
import Exhibition from "../model/Classes/Exhibition";

export default class ExhibitionController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async createExhibition(name: string, description: string, artWorks: number[] = []): Promise<Exhibition> {
        return await this.db.createExhibition( name, description, artWorks);
    }

    public async getExhibition<T extends number | string>(param: T): Promise<Exhibition | null> {
        if (typeof param === "number") {
            return await this.db.readExhibition(param);
        } 
        else if (typeof param === "string") {
            return await this.db.readExhibitionByName(param);
        }
        return null;
    }

    public async listExhibitions(): Promise<Exhibition[]> {
        return await this.db.readAllExhibitions();
    }

    public async updateExhibition<T extends string | number>(param: T, name: string, description: string, artWorks: number[]): Promise<boolean> {
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

    public async deleteExhibition<T extends number | string>(param: T): Promise<boolean> {
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
    }

    public async addArtToExhibition(idExhibition: number, idArt: number): Promise<boolean> {
        return await this.db.addArtToExhibition(idExhibition, idArt);
    }

    public async removeArtFromExhibition(idExhibition: number, idArt: number): Promise<boolean> {
        return await this.db.removeArtFromExhibition(idExhibition, idArt);
    }

    public async getExhibitionArts(idExhibition: number): Promise<number[] | undefined> {
        return await this.db.getExhibitionArts(idExhibition);
    }
}
