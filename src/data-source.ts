import "reflect-metadata"
import { DataSource } from "typeorm"
import Artist from "./model/Classes/Artist";
import Exhibition from "./model/Classes/Exhibition";
import Art from "./model/Classes/Art";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: 'carlos',
    password: '1234',
    database: 'artGallery',
    logging: false,
    entities: [Artist, Art, Exhibition],
    migrations: ["./db/Migrations/*.ts"],
    subscribers: [],
})
