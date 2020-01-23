import {Options, Sequelize} from 'sequelize';
import config from '../config';
import {userInit} from "./User";
import {secrectionInit} from "./Secrection";
import {menstruationInit} from "./Menstruation";
import {menstruationMethodInit} from "./MenstruationMethod";
import {secretInformationInit} from "./SecretInformation";
import {connectionPartnerInit} from "./ConnectionPartner";
import {connectionCodeInit} from "./ConnectionCode";

export function init(): Sequelize {
    const sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        {
            host: config.db.host,
            dialect: config.db.dialect,
            port: config.db.port,
            timezone: "+09:00",

        } as Options
    );

    secrectionInit(sequelize);
    userInit(sequelize);
    menstruationInit(sequelize);
    menstruationMethodInit(sequelize);
    secretInformationInit(sequelize);
    connectionPartnerInit(sequelize);
    connectionCodeInit(sequelize);

    return sequelize;
}
