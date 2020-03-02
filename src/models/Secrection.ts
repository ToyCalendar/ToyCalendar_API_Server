import {DataTypes, Model, Sequelize} from "sequelize";

export default class Secrection extends Model {
    public code!: string;
    public name!: string;
}


export function secrectionInit(sequelize: Sequelize) {
    Secrection.init({
        code: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "secrection",
        engine: "InnoDB",
        charset: "utf8",
    });
}
