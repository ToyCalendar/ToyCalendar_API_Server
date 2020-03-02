import {DataTypes, Model, Sequelize} from "sequelize";

export default class ConnectionPartner extends Model {
    public id!: number;
    public userId!: number;
    public partnerId!: number;
    public connectionDate!: Date;
}

export function connectionPartnerInit(sequelize: Sequelize) {
    ConnectionPartner.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        partnerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        connectionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "connectionPartner",
        engine: "InnoDB",
        charset: "utf8",
    });
}
