import {Options, Sequelize} from "sequelize";
import config from "../config";
import User, {userInit} from "./User";
import {secrectionInit} from "./Secrection";
import Menstruation, {menstruationInit} from "./Menstruation";
import MenstruationMethod, {menstruationMethodInit} from "./MenstruationMethod";
import SecretInformation, {secretInformationInit} from "./SecretInformation";
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

        } as Options,
    );

    secrectionInit(sequelize);
    userInit(sequelize);
    menstruationInit(sequelize);
    menstruationMethodInit(sequelize);
    secretInformationInit(sequelize);
    connectionPartnerInit(sequelize);
    connectionCodeInit(sequelize);

    User.hasMany(Menstruation, {
        sourceKey: "id",
        foreignKey: "userId",
        as: "menstruation",
    });

    User.hasMany(SecretInformation, {
        sourceKey: "id",
        foreignKey: "userId",
        as: "secretInformation",
    });

    User.hasOne(MenstruationMethod, {
        sourceKey: "id",
        foreignKey: "userId",
        as: "menstruationMethod",
    });

    return sequelize;
}
