import {Association, DataTypes, Model, Sequelize} from "sequelize";
import Menstruation from "./Menstruation";
import MenstruationMethod from "./MenstruationMethod";
import ConnectionPartner from "./ConnectionPartner";
import Secrection from "./Secrection";
import SecretInformation from "./SecretInformation";


export default class User extends Model {

    public id!: number;
    public nickname!: string;
    public photo?: string;
    public email?: string;
    public birth?: Date;

    public snsType!: number;
    public kakaoID?: string;
    public googleID?: string;
    public facebookID?: string;
    public lineID?: string;

    public initYn?: boolean = false;
    public partnerYn?: boolean = false;

    public readonly joinDate!: Date;

    public static associations: {
        menstruation: Association<User, Menstruation>;
        menstruationMethod: Association<User, MenstruationMethod>;
        partner: Association<User, ConnectionPartner>;
        secrection: Association<Secrection, SecretInformation>;
        secrectionInfo: Association<User, SecretInformation>;
    };
}

export function userInit(sequelize: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        snsType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        kakaoID: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        googleID: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        facebookID: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        lineID: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        initYn: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        partnerYn: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    }, {
        sequelize,
        tableName: "user",
        engine: "InnoDB",
        charset: "utf8",
    });
}
