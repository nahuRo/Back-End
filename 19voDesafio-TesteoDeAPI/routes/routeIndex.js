// para rutas
import { Router } from "express";
const route = Router();

// traigo las rutas a donde quiero ir
import routeCart from "./routeCart.js";
import routeProd from "./routeProd.js";
import routeUser from "./routeUser.js";

// jwt para verificar que el user este logeado
import { authMiddleware } from "../utils/jwt.js";

// funcionan todos los metodos , la unica condicion es que halla un txt creado para que empiece ejecutar todo joia
route
	.use("/cart", authMiddleware, routeCart)

	.use("/product", authMiddleware, routeProd)

	.use("/user", routeUser)

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

export default route;
