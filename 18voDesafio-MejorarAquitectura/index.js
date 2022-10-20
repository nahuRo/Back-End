import express from "express";
const app = express();

import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import engine from "ejs-mate";
import flash from "connect-flash";
import { fileURLToPath } from "url"; // for replicate a "__dirname"

import { config } from "./utils/config.js";
import { ConnectionDB } from "./database/config/configMongo.js";
import { loggerInfo } from "./utils/logger.js";

import route from "./routes/index.js";

// replicanting a "__dirname" of commonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const myPORT = Number(process.argv[2]) || 8080;

// configuraciones ejs
app.set("views", path.join(__dirname, "./views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// session
app.use(
	session({
		secret: config.SESSION_SECRET,
		resave: false,
		rolling: true,
		saveUninitialized: false,
	})
);

// connect-flash
app.use(flash());

// passport
import "./passport/local-auth.js";
// require("./passport/local-auth");

app.use(passport.initialize());
app.use(passport.session());

// mensajes de flash
app.use((req, res, next) => {
	app.locals.registerMsg = req.flash("registerMsg");
	app.locals.loginMsg = req.flash("loginMsg");

	app.locals.user = req.user; // app.locals.user , es como crear una variable global para toda la app
	// CON 'req.user' OBTENGO LOS DATOS DEL USUARIO ACTUAL, EL QUE HACE EL LOGIN
	// console.log("LOCALS", app.locals.user);
	next();
});

// middleware para loggers
app.use((req, res, next) => {
	loggerInfo.info(req.method, req.url);
	next();
});

// conexion a la DB
// ConnectionDB();

app.listen(process.env.PORT || myPORT, (err) => {
	err ? console.log(err) : console.log(`sevidor iniciado en http://localhost:${process.env.PORT || myPORT}/`);
});

// rutas
app.use(route);
