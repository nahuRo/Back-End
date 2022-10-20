import compression from "compression";
import { Router } from "express";
const route = Router();

import { loggerArchivoW, loggerInfo } from "../utils/logger.js";
import { getInfo, getInfoGzip, getProfile } from "../controllers/infoController.js";
import { getAllProducts, postProducts, getOrden, postCart } from "../controllers/productsController.js";
import { getLogin, getRegister, loginPassport, logout, resgisterPassport } from "../controllers/sessionController.js";
import { getHome, getRandoms, postRandoms } from "../controllers/viewsController.js";

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
};

route
	.post("/register", resgisterPassport)

	.post("/login", loginPassport)

	.get("/register", getRegister)

	.get("/login", getLogin)

	.get("/logout", logout)

	.get("/", getHome)

	// is Authenticated

	.post("/cart", isAuthenticated, postCart)

	.get("/orden", isAuthenticated, getOrden)

	.get("/profile", isAuthenticated, getProfile)

	.get("/products", isAuthenticated, getAllProducts)

	.post("/products", isAuthenticated, postProducts)

	.get("/info", isAuthenticated, getInfo)

	.get("/infoGzip", isAuthenticated, compression(), getInfoGzip)

	.get("/api/randoms", isAuthenticated, getRandoms)

	.post("/api/randoms", isAuthenticated, postRandoms)

	// Atajo URLs no validas

	.use((req, res) => {
		loggerInfo.warn("ruta no implementada");
		loggerArchivoW.warn("ruta no implementada");
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

export default route;
