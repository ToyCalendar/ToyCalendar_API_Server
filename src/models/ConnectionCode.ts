import {DataTypes, Model, Sequelize} from "sequelize";

export default class ConnectionCode extends Model {
    userID!: number;
    code!: string;
    createDate!: Date;
    life!: number; // 1: 1초, 60: 1분, 3600: 1시간
}

export function connectionCodeInit(sequelize: Sequelize) {
    ConnectionCode.init({
        userID:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        createDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        life: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'connectionCode',
        engine: 'InnoDB',
        charset: 'utf8',
    })
}
