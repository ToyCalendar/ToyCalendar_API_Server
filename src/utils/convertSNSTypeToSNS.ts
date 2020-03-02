import {FindOptions} from "sequelize";

const enum SNSType {
    KAKAO = 1,
    GOOGLE = 2,
    FACE_BOOK = 3,
    LINE = 4,
}

export function convertSNSTypeToSNS(snsType: SNSType, id: string): {
    snsType: SNSType,
    facebookID?: string,
    googleID?: string,
    lineID?: string,
    kakaoID?: string,
} {
    switch (snsType) {
        case SNSType.FACE_BOOK: {
            return {
                snsType,
                facebookID: id,
            };
        }
        case SNSType.GOOGLE: {
            return {
                snsType,
                googleID: id,
            };
        }
        case SNSType.KAKAO: {
            return {
                snsType,
                kakaoID: id,
            };
        }
        case SNSType.LINE: {
            return {
                snsType,
                lineID: id,
            };
        }
    }

    throw new Error("invalid sns type");
}
