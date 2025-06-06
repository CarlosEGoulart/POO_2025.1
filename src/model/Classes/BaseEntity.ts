export default abstract class BaseEntity {
    protected name: string | undefined;

    constructor(id: number, name: string) {
        this.name = name;
    }
    
    public abstract getName(): string;
    
    public abstract setName(name: string): void;
}
