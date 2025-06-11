import Art from "../model/Classes/Art";
import Artist from "../model/Classes/Artist";
import Exhibition from "../model/Classes/Exhibition";
import { AppDataSource } from "../data-source";
import "reflect-metadata";

const artRepository = AppDataSource.getRepository(Art);
const artistRepository = AppDataSource.getRepository(Artist);
const exhibitionRepository = AppDataSource.getRepository(Exhibition);

export default class Database {
 
    // ART CRUD
 public async createArt(title: string, description: string, year: number, imageUrl: string): Promise<Art> {
        const newArt = new Art(title, description, year, imageUrl);
        return artRepository.save(newArt);
    }

    public async readArt(artId: number | undefined): Promise<Art | null>{
        return artRepository.findOneBy({ id: artId });
    }

    public async readArtByTitle(title: string): Promise<Art | null> {
        return artRepository.findOneBy({ name: title });
    }


    public async readAllArts(): Promise<Art[]> {
        return artRepository.find();
    }

    public async updateArt(artId: number, title: string, description: string, year: number, imageUrl: string): Promise<boolean> {
        const art = await this.readArt(artId);
        if (art) {
            art.setName(title);
            art.setDescription(description);
            art.setYear(year);
            art.setImageUrl(imageUrl);
            await artRepository.save(art);
            return true;
        }
        return false;
    }

    public async deleteArt(artId: number): Promise<boolean> {
        await artRepository.delete(artId);
        return true;
    }

    public async assignArtistToArt(artId: number, artist: Artist): Promise<boolean> {
        const art = await this.readArt(artId);
        if (art && artist.id) {
            art.artist = artist;
            await artRepository.save(art)
            return true;
        }
        return false;
    }

    // ARTIST CRUD
 public async createArtist(name: string, bio: string, birthYear: number, instagram: string): Promise<Artist> {
        const newArtist = new Artist(name, bio, birthYear, instagram);
        return artistRepository.save(newArtist);
    }

    public async readArtist(artistId: number): Promise<Artist | null> {
        return artistRepository.findOneBy({ id: artistId });
    }

    public async readArtistByName(name: string):  Promise<Artist | null>{
        return artistRepository.findOneBy({ name: name });
    }

    public async readAllArtists(): Promise<Artist[]> {
        return artistRepository.find();
    }

    public async updateArtist(artistId: number, name: string, bio: string, birthYear: number, instagram: string): Promise<boolean> {
        const artist = await this.readArtist(artistId);
        if (artist) {
            artist.setName(name);
            artist.setBio(bio);
            artist.setBirthYear(birthYear);
            artist.setInstagram(instagram);
            await artistRepository.save(artist);
            return true;
        }
        return false;
    }

    public async deleteArtist(artistId: number): Promise<boolean> {
        await artistRepository.delete(artistId);
        return true;
    }

    // EXHIBITION CRUD
 public async createExhibition(name: string, description: string, artWorks: number[] = []): Promise<Exhibition> {
        const newExhibition = new Exhibition(name, description, artWorks);
        return exhibitionRepository.save(newExhibition);
    }

    public async readExhibition(exhibitionId: number): Promise<Exhibition | null> {
        return exhibitionRepository.findOneBy({ id: exhibitionId});
    }

    public async readExhibitionByName(name: string): Promise<Exhibition | null> {
        return exhibitionRepository.findOneBy({ name: name});
    }

    public async readAllExhibitions(): Promise<Exhibition[]> {
        return exhibitionRepository.find();
    }

    public async updateExhibition(exhibitionId: number, name: string, description: string, artWorks: number[]): Promise<boolean> {
        const exhibition = await this.readExhibition(exhibitionId);
        if (exhibition) {
            exhibition.setName(name);
            exhibition.setDescription(description);
            exhibition.setArtWorks(artWorks);
            exhibitionRepository.save(exhibition);
            return true;
        }
        return false;
    }

    public async deleteExhibition(exhibitionId: number): Promise<boolean> {
        await exhibitionRepository.delete(exhibitionId);
        return true;
    }

    public async addArtToExhibition(exhibitionId: number, artId: number): Promise<boolean> {
        const exhibition = await this.readExhibition(exhibitionId);
        const art = await this.readArt(artId);
        if (exhibition && art) {
            const currentArtWorks = exhibition.getArtWorks();
            if (!currentArtWorks.includes(artId)) {
                exhibition.setArtWorks([...currentArtWorks, artId]);
                await exhibitionRepository.save(exhibition);
                return true;
            }
        }
        return false;
    }

    public async removeArtFromExhibition(exhibitionId: number, artId: number): Promise<boolean> {
        const exhibition = await this.readExhibition(exhibitionId);
        if (exhibition) {
            const updatedArtWorks = exhibition.getArtWorks().filter(id => id !== artId);
            exhibition.setArtWorks(updatedArtWorks);
            await exhibitionRepository.save(exhibition);
            return true;
        }
        return false;
    }

    public async getExhibitionArts(exhibitionId: number): Promise<number[] | undefined> {
        const exhibition = await this.readExhibition(exhibitionId);
        if (exhibition) {
            const artIds = exhibition.getArtWorks();
            return artIds;
        }
    }
}
