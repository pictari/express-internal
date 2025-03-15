import { DataSource } from "typeorm"
import dotenv from "dotenv";
import { Account } from "./models/orm/account";
import { BrokenTelephoneGame } from "./models/orm/broken_telephone_game";
import { BrokenTelephoneEntry } from "./models/orm/broken_telephone_entry";


dotenv.config();

/**
 * Configured database connection using information from secrets.
 */
export const AccountDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    entities: [Account, BrokenTelephoneGame, BrokenTelephoneEntry],
    synchronize: false,
    logging: false, 
});

AccountDataSource.initialize()
    .catch((error) => console.log(error));