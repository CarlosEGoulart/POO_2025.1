import { IEntity } from "../../model/Interfaces/IEntity";
import { IGenericRepository } from "../../model/Interfaces/IGenericRepository";


export default class GenericController<T extends IEntity> {
    private repository: IGenericRepository<T>;

    constructor(repository: IGenericRepository<T>) {
        this.repository = repository;
    }

    public getType(): string {
        return this.constructor.name;
    }

    public async read(param: number | string): Promise<any> {
        return await this.repository.read(param);
    }
        
    public async update(param: number | string, ...args: any[]): Promise<boolean> {
        const entity = await this.repository.read(param);
        if (!entity) {
            return false;
        }
        
        return await this.repository.update(entity.getId(), ...args);
    }

    public async delete(param: number | string): Promise<boolean> {
        const entity = await this.repository.read(param);
        if (!entity) {
            return false;
        }
        
        return await this.repository.delete(entity.getId());
    }

    public async list(): Promise<T[]> {
        return await this.repository.readAll();
    }
}
