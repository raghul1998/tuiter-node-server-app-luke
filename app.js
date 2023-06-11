import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import { createClient } from 'redis';
import RedisStore from "connect-redis"

const app = express()

const redisClient = createClient({
                                password: 'UrjMydFDdvD6XylFGieel20zzgxv0up2',
                                socket: {
                                    host: 'redis-18855.c283.us-east-1-4.ec2.cloud.redislabs.com',
                                    port: 18855
                                }
                            });
// redisClient.connect().catch(console.error)

const redisStore = new RedisStore({ client: redisClient });


app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        store: redisStore,
    })
);
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
app.use(express.json());
const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);