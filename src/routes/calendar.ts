import * as express from "express";
import {invalidNumber} from "../utils/validate";
import {ErrorCode, ErrorMessage, responseErrorCodeWithMessage} from "../utils/errorCode";
import * as jwt from "jwt-simple";
import config from "../config";
import SecretInformation from "../models/SecretInformation";
import * as sequelize from "sequelize";
import User from "../models/User";

const router = express.Router();

// TODO 미래, 과거, 현재 계산 필요
router.get('/:year', async (req, res, next) => {
    const token: string = req.headers.token as string;
    const userId = jwt.decode(token, config.auth.key).id;

    // year만 있을 경우 해당 년도 모두 조회
    if (req.params.year) {
        const year = Number(req.params.year);
        if (invalidNumber(year)) {
            const code = ErrorCode.INVALID_REQUEST;
            return responseErrorCodeWithMessage(res, code);
        }

        const startDate = `${year}-01-01`;
        const lastDate = `${year}-12-31`;

        const dates = await SecretInformation.findAll({
            where: {
                date: {
                    [sequelize.Op.gte]: startDate,
                    [sequelize.Op.lte]: lastDate
                },
                userId: userId
            }
        });

        const code = ErrorCode.OK;
        return res.status(code).json({
            msg:ErrorMessage(code),
            contents: dates
        });
    }
});

router.get('/:year/:month', async (req, res, next) => {
    const token: string = req.headers.token as string;
    const userId = jwt.decode(token, config.auth.key).id;

    // year와 Month가 있을 경우 해당 월만 조회
    if (req.params.year && req.params.month) {
        const year = Number(req.params.year);
        const month = Number(req.params.month);
        if (invalidNumber(month) || invalidNumber(year) || month > 12 || month < 1) {
            const code = ErrorCode.INVALID_REQUEST;
            return responseErrorCodeWithMessage(res, code);
        }
        // year + month 조회
        const startDate = `${year}-${month}-01`;
        const lastDate = `${year}-${month}-31`;

        const dates = await SecretInformation.findAll({
            where: {
                date: {
                    [sequelize.Op.gte]: startDate,
                    [sequelize.Op.lte]: lastDate
                },
                userId: userId
            }
        });

        console.log('date', dates);
        const code = ErrorCode.OK;
        return res.status(code).json({
            msg:ErrorMessage(code),
            contents: dates
        });
    }

    // 없을 경우 기록된 마지막 주기로부터 6개월치 조회

    const code = ErrorCode.OK;
    res.status(code).json({
        msg: ErrorMessage(code)
    });
});

// TODO milliseconds 받을 때 앞 뒤로 3달 제공
// TODO 2200년에서 새로고침 -> 해당 달 만 제공

export default router;
