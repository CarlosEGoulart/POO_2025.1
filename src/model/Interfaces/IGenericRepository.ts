import { IEntity } from "./IEntity";

export interface IGenericRepository<T extends IEntity>{
    create(...args: any[]): Promise<T>;
    read(param: number | string): Promise<T | null>;
    readAll(): Promise<T[]>;
    update(param: number, ...args: any[]): Promise<boolean>;
    delete(param: number): Promise<boolean>;
}