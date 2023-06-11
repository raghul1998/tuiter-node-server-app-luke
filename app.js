import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors';
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import MemoryStore from "memorystore"
import FileStore from "session-file-store"

const memoryStore = MemoryStore(session);
const filestr = FileStore(session);

const app = express()
app.use(
    session({
                secret: "any string",
                resave: false,
                saveUninitialized: true,
                store: new filestr({
                                       path: './',
                                       ttl: 86400,
                                   })
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