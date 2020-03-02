import * as path from "path";
import * as express from "express";
import * as DB from "./models";
import * as http from "http";
import * as cors from "cors";
import {Sequelize} from "sequelize/types";
import authRouter from "./routes/auth";
import secrectionRouter from "./routes/secrection";
import menstruationRouter from "./routes/menstruation";
import calendarRouter from "./routes/calendar";
import logger from "./logger";
import {checkValidUser} from "./middle_ware/checkValidUser";

const stopServer = async (server: http.Server, sequelize: Sequelize, signal?: string) => {
    logger.info(`Stopping server with signal: ${signal}`);
    await server.close();
    await sequelize.close();
    process.exit();
};

async function runServer() {
    const sequelize = DB.init();
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(express.static(path.join(__dirname, "public")));
    app.use("/api/auth", authRouter);
    app.use("/api/calendar", checkValidUser, calendarRouter);
    app.use("/api/secrection", checkValidUser, secrectionRouter);
    app.use("/api/menstruation", checkValidUser, menstruationRouter);
    sequelize.sync();

    const server = app.listen(3000, () => {
        logger.info("Example app listening on port 3000!");
    });

    try {
        await sequelize.authenticate();
    } catch (e) {
        stopServer(server, sequelize);
        throw e;
    }

}

runServer()
    .then(() => {
        logger.info("run succesfully");
    })
    .catch((ex: Error) => {
        logger.error("Unable run:", ex);
    });

