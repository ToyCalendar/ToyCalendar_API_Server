import {NextFunction, Request, Response} from "express";
import {ErrorCode, ErrorMessage, responseErrorCodeWithMessage} from "../utils/errorCode";
import * as jwt from "jwt-simple";
import config from "../config";
import User from "../models/User";

export const checkValidUser = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.token as string;

    if (!token) {
        const code = ErrorCode.FORBIDDEN_DENIED;
        return res.status(code).json({
            msg: ErrorMessage(code)
        });
    }

    try {
        const id = jwt.decode(token, config.auth.key).id;

        const user = await User.findOne({
            where: {id}
        });

        if (!user) {
            const code = ErrorCode.FORBIDDEN_DENIED;
            return res.status(code).json({
                msg: ErrorMessage(code)
            });
        }
    } catch (e) {
        const code = ErrorCode.UN_AUTHORIZATION;
        return responseErrorCodeWithMessage(res, code);
    }

    next();
};

