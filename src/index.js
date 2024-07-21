import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import { errorHandler } from './utils/handles/error.handle';
import route from './routers'
import { APP_URL_CLIENT,STORAGE_DIR } from './config/constant';

var corsOptions = {
    origin: APP_URL_CLIENT,
    optionsSuccessStatus: 200
}
export const createApp = () =>{
    const app = express();
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.get('/', (req, res) =>{
        res.write("<h1>hello express</h1>");
        res.end();
    });
    route(app);
    app.use(errorHandler);
    return app;
};