import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "carlos",
    password: "1234",
    database: "galeria_arte",
    synchronize: true,
    logging: false,
    entities: [__dirname + '/model/Classes/*.{js,ts}'],
    migrations: [],
    subscribers: [],
})
