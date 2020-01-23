import {DataTypes, Model, Sequelize} from "sequelize";

export default class SecretInformation extends Model {
    id!: number;
    userId!: number;
    date!: Date;
    contraceptiveYn?: boolean; // 피임 기구 사용 여부
    secretion?: string; // 체크 된 것만 ,로 구분하여 저장
}

export function secretInformationInit(sequelize: Sequelize) {
    SecretInformation.init({
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        contraceptiveYn: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        secretion: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'secretInformation',
        engine: 'InnoDB',
        charset: 'utf8',
    });
}
