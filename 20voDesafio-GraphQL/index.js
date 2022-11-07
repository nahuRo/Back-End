import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";

import bodyParser from "body-parser";
import { ConnectionDB } from "./database/config/configMongo.js";

import { loggerInfo } from "./utils/logger.js";

import router from "./routes/routeIndex.js";

const app = express();
const myPORT = Number(process.argv[2]) || 8080;

// ---- Middleware ----

app.use(bodyParser.json());
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

app.use(
	"/graph",
	graphqlHTTP({
		graphiql: true,
		schema,
	})
);
