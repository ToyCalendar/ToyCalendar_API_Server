import {NextFunction, Request, Response} from "express";

export const enum ErrorCode {
    OK = 200,
    CREATE = 201,

    INVALID_REQUEST = 400,
    UN_AUTHORIZATION = 401,
    FORBIDDEN_DENIED = 403,
    NOT_FOUND = 404,
    ALREADY_EXIST = 409,

    SERVER_ERROR = 500,
    SERVER_DOWN = 503,

    // 11000번 대 에러코드는 정보 조회를 할 수 없을 때 제공.
    NOTHING_INFO = 11001,
}

export function ErrorMessage(code: ErrorCode) {

    switch (code) {
        case ErrorCode.OK: {
            return "ok"
        }
        case ErrorCode.CREATE: {
            return "success create"
        }
        case ErrorCode.INVALID_REQUEST: {
            return "invalid request"
        }
        case ErrorCode.UN_AUTHORIZATION: {
            return "un authorization";
        }
        case ErrorCode.FORBIDDEN_DENIED: {
            return "permission denied"
        }
        case ErrorCode.NOT_FOUND: {
            return "page not found";
        }
        case ErrorCode.ALREADY_EXIST: {
            return "already exist id";
        }
        case ErrorCode.SERVER_ERROR: {
            return "server error";
        }
        case ErrorCode.SERVER_DOWN: {
            return "sorry, server is hungry..";
        }
        case ErrorCode.NOTHING_INFO: {
            return "Oops, your menstruation info is nothing";
        }
    }
}


export function responseErrorCodeWithMessage(res: Response, code: ErrorCode) {
    return res.status(code).json({msg: ErrorMessage(code)})
}
