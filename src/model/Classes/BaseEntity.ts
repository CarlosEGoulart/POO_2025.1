export default abstract class BaseEntity {
    protected id: number | undefined;
    protected name: string | undefined;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public abstract getId(): number;
   
    public abstract setId(id: number): void;
    
    public abstract getName(): string;
    
    public abstract setName(name: string): void;
}
