import * as express from "express";
import Secrection from "../models/Secrection";
import {ErrorCode, responseErrorCodeWithMessage} from "../utils/errorCode";
import * as jwt from "jwt-simple";
import config from "../config";
import {invalid} from "../utils/validate";
import SecretInformation from "../models/SecretInformation";

const router = express.Router();

// 민감정보 조회 API
router.get("", async (req, res) => {
    const data = await Secrection.findAll();

    const result = data.map((it) => ({
        code: it.code,
        name: it.name,
    }));

    if (data) {
        return res.status(ErrorCode.OK).json({
            data: result,
        });
    }

    return res.status(ErrorCode.INVALID_REQUEST);
});

// 민감정보 저장 API
router.post("/save", async (req, res) => {
    const token: string = req.headers.Authorization as string;

    const userId = jwt.decode(token, config.auth.key).id;

    const {contraceptiveYn, date, secretion} = req.body;

    // date는 필수
    if (invalid(date)) {
        const code = ErrorCode.INVALID_REQUEST;
        return responseErrorCodeWithMessage(res, code);
    }

    const info = await SecretInformation.findOne({
        where: {
            userId,
            date,
        },
    });

    if (info) {
        try {
            await SecretInformation.update({
                contraceptiveYn,
                date,
                secretion,
            }, {
                where: {
                    userId,
                    date,
                },
            });

            const code = ErrorCode.OK;
            return responseErrorCodeWithMessage(res, code);
        } catch (e) {
            const code = ErrorCode.SERVER_ERROR;
            return responseErrorCodeWithMessage(res, code);
        }
    }

    try {
        await SecretInformation.create({
            userId,
            contraceptiveYn,
            date,
            secretion,
        });
        const code = ErrorCode.CREATE;
        return responseErrorCodeWithMessage(res, code);
    } catch (e) {
        const code = ErrorCode.SERVER_ERROR;
        return responseErrorCodeWithMessage(res, code);
    }
});

export default router;
