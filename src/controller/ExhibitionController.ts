// controller/ExhibitionController.ts
import Database from "../db/Database";
import Exhibition from "../model/Exhibition";
import Art from "../model/Art";

export default class ExhibitionController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public createExhibition(name: string, description: string, artWorks: number[] = []): Exhibition | null {
        try {
            return this.db.createExhibition(name, description, artWorks);
        } catch (error: any) {
            console.error("Erro ao criar exposição:", error.message);
            return null;
        }
    }

    public getExhibition(idExhibition: number): Exhibition | undefined {
        return this.db.readExhibition(idExhibition);
    }

    public listExhibitions(): Exhibition[] {
        return this.db.readAllExhibitions();
    }

    public updateExhibition(idExhibition: number, name: string, description:string, artWorks: number[]): boolean {
        return this.db.updateExhibition(idExhibition, name, description, artWorks);
    }

    public deleteExhibition(idExhibition: number): boolean  {
        return this.db.deleteExhibition(idExhibition);
    }

    public addArtToExhibition(idExhibition: number, idArt: number): boolean {
        return this.db.addArtToExhibition(idExhibition, idArt);
    }

    public removeArtFromExhibition(idExhibition: number, idArt: number): boolean {
        return this.db.removeArtFromExhibition(idExhibition, idArt);
    }

    public getExhibitionArts(idExhibition: number): Art[] | undefined{
        return this.db.getExhibitionArts(idExhibition);
    }

    public listAllArts(): Art[] {
        return this.db.readAllArts();
    }

    public getArt(idArt: number): Art | undefined {
        return this.db.readArt(idArt);
    }
}