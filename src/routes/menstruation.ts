import * as express from "express";
import * as jwt from "jwt-simple";
import config from "../config";
import {ErrorCode, ErrorMessage, responseErrorCodeWithMessage} from "../utils/errorCode";
import {invalid, invalidNumber, valid} from "../utils/validate";
import MenstruationMethod from "../models/MenstruationMethod";
import {response} from "express";

const router = express.Router();

router.post("/", (req, res, next) => {

});

router.post("/init", async (req, res) => {

    const token: string = req.headers.Authorization as string;

    const userId = jwt.decode(token, config.auth.key).id;

    const {averageTermYn, averageCustomTerm, averageCycleYn, averageCustomCycle} = req.body;

    const menstruation = MenstruationMethod.findOne({
        where: {userId},
    });

    // 기존에 존재하면 수정
    if (menstruation) {

        try {

            if (valid(averageTermYn)) {
                MenstruationMethod.update({
                    averageTermYn,
                }, {
                    where: {userId},
                });
            }

            if (valid(averageCustomTerm)) {
                MenstruationMethod.update({
                    averageCustomTerm,
                }, {
                    where: {userId},
                });
            }

            if (valid(averageCycleYn)) {
                MenstruationMethod.update({
                    averageCycleYn,
                }, {
                    where: {userId},
                });
            }

            if (valid(averageCustomCycle)) {
                MenstruationMethod.update({
                    averageCustomCycle,
                }, {
                    where: {userId},
                });
            }

            const code = ErrorCode.OK;
            return responseErrorCodeWithMessage(res, code);
        } catch (e) {
            const code = ErrorCode.SERVER_ERROR;
            return responseErrorCodeWithMessage(res, code);
        }
    }

    if (invalid(averageTermYn) || invalid(averageCycleYn)) {
        const code = ErrorCode.INVALID_REQUEST;
        return responseErrorCodeWithMessage(res, code);
    }

    if (!averageTermYn) {
        if (invalid(averageCustomTerm)) {
            const code = ErrorCode.INVALID_REQUEST;
            return responseErrorCodeWithMessage(res, code);
        }
    }

    if (!averageCycleYn) {
        if (invalid(averageCustomCycle)) {
            const code = ErrorCode.INVALID_REQUEST;
            return responseErrorCodeWithMessage(res, code);
        }
    }

    try {
        await MenstruationMethod.create({
            userId,
            averageTermYn,
            averageCycleYn,
            averageCustomTerm,
            averageCustomCycle,
        });

        const code = ErrorCode.CREATE;
        return responseErrorCodeWithMessage(res, code);
    } catch (e) {
        const code = ErrorCode.SERVER_ERROR;
        return responseErrorCodeWithMessage(res, code);
    }
});

export default router;
