import express from 'express';
import { createApp } from '.';
import { HOST,PORT,APP_URL_API } from './config/constant';
import { connectToDatabase } from './config/mongodb';
import runAllways from './app/command';

const app = express();

const server = createApp(app);
server.listen(PORT,async ()=>{
    await connectToDatabase();
    await runAllways();
    const message = `Server is running on ${HOST}:${PORT}`;
    const message1 = `API is running on ${APP_URL_API}`
    console.log("\x1b[38;2;102;0;255m" + message + "\x1b[0m");
    console.log("\x1b[38;2;102;0;255m" + message1+ "\x1b[0m");
})



