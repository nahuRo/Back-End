// para rutas
import { Router } from "express";
const route = Router();

// controllers
import {
	getAllProducts,
	createProduct,
	updateOneProduct,
	deleteOneProduct,
} from "../controllers/productsControllers.js";

// ---- Rutas para productos ----
route
	// Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
	.get("/:id", getAllProducts)

	// Para incorporar productos al listado (disponible para administradores)
	.post("/", createProduct)

	// Actualiza un producto por su id (disponible para administradores)
	.put("/:id", updateOneProduct)

	// Borra un producto por su id (disponible para administradores)
	.delete("/:id", deleteOneProduct)

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

export default route;
