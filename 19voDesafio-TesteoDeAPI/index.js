import express from "express";
const app = express();
import bodyParser from "body-parser";
import { ConnectionDB } from "./database/config/configMongo.js";
// import session from "express-session";

// import { config } from "./utils/config.js";
import { loggerInfo } from "./utils/logger.js";

import router from "./routes/routeIndex.js";

const myPORT = Number(process.argv[2]) || 8080;

// ---- Middleware ----

// app.use(express.json());
app.use(bodyParser.json());
// // session
// app.use(
// 	session({
// 		secret: config.SESSION_SECRET,
// 		resave: false,
// 		rolling: true,
// 		saveUninitialized: false,
// 	})
// );
ConnectionDB();

// middleware para loggers
app.use((req, res, next) => {
	loggerInfo.info(req.method, req.url);
	next();
});

app.listen(process.env.PORT || myPORT, (err) => {
	err
		? console.log(err)
		: console.log(`sevidor iniciado en http://localhost:${process.env.PORT || myPORT}/`);
});

// rutas
app.use("/api", router);
