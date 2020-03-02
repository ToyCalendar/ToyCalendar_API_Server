import {DataTypes, Model, Sequelize} from "sequelize";


export default class Menstruation extends Model {

    public id!: number;
    public userId!: number;

    public startMenstruationDate?: Date; // 생리 시작일
    public endMenstruationDate?: Date; // 생리 종료일
}

export function menstruationInit(sequelize: Sequelize) {
    Menstruation.init({
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
        startMenstruationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endMenstruationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: "menstruation",
        engine: "InnoDB",
        charset: "utf8",
    });
}
