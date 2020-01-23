import {DataTypes, Model, Sequelize} from "sequelize";

export default class MenstruationMethod extends Model {
    public id!: number;
    public userId!: number;

    // 생리 기간 (default: 5)
    public averageTermYn!: boolean; // 평균 생리 기간 사용 여부
    public averageCustomTerm?: number; // 사용자 입력 평균 생리 기간

    // 생리 주기 (default: 28)
    // averageCycleYn true일 때, 28일적용, false일 때 custom 적용
    public averageCycleYn!: boolean; // 평균 생리 주기 사용 여부
    public averageCustomCycle?: number;
}

export function menstruationMethodInit(sequelize: Sequelize) {
    MenstruationMethod.init({
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
        averageTermYn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        averageCustomTerm: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 5
        },
        averageCycleYn: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        averageCustomCycle: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 28
        }
    }, {
        sequelize,
        tableName: 'menstruationMethod',
        engine: 'InnoDB',
        charset: 'utf8',
    });
}
