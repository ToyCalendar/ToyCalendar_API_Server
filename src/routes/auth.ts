import * as express from 'express';
import User from "../models/User";
import {convertSNSTypeToSNS} from "../utils/convertSNSTypeToSNS";
import {WhereOptions} from "sequelize";
import * as jwt from "jwt-simple";
import config from "../config";
import {BaseDTO} from "../dto/baseDTO";
import {LoginDTO} from "../dto/loginDTO";
import {ErrorCode, ErrorMessage} from "../utils/errorCode";
import {invalid} from "../utils/validate";

const router = express.Router();

router.post('/login', async (req, res) => {

    const {snsType, snsID} = req.body;

    if (invalid(snsType) || invalid(snsID)) {
        const code = ErrorCode.INVALID_REQUEST;
        return res.status(code).json({msg: ErrorMessage(code)});
    }

    const snsTypeAndId: WhereOptions = convertSNSTypeToSNS(snsType, snsID) as WhereOptions;

    const user = await User.findOne<User>({
        where: {...snsTypeAndId}
    });

    if (!user) {
        const code = ErrorCode.FORBIDDEN_DENIED;
        return res.status(code).json({
            msg: ErrorMessage(code)
        })
    }

    const token = jwt.encode({id: user.id}, config.auth.key);
    const responseModel = new BaseDTO(new LoginDTO(token).toVO()).toVO();
    const code = ErrorCode.OK;
    return res.status(code).json(responseModel.data);

});

router.post('/signup', async (req, res) => {
    const {snsType, snsID, nickname, photo, email, birth} = req.body;

    if (invalid(snsType) || invalid(snsID) || invalid(nickname)) {
        const code = ErrorCode.INVALID_REQUEST;
        return res.status(code).json({msg: ErrorMessage(code)})
    }

    const snsTypeAndId: WhereOptions = convertSNSTypeToSNS(snsType, snsID) as WhereOptions;

    const user = await User.findOne({
        where: {...snsTypeAndId}
    });

    if (user) {
        const code = ErrorCode.ALREADY_EXIST;
        return res.status(code).json({
            msg: ErrorMessage(code)
        });
    }

    try {
        await User.create({
            nickname,
            ...snsTypeAndId,
            photo,
            email,
            birth
        });
    } catch (e) {
        const code = ErrorCode.SERVER_ERROR;
        return res.status(code).json({
            msg: ErrorMessage(code)
        });
    }

    const code = ErrorCode.CREATE;

    return res.status(code).json({
        msg: ErrorMessage(code)
    });
});

router.get('/apiToken', async (req, res) => {

});

export default router;
