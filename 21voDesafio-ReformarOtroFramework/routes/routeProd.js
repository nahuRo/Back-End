import Router from "koa-router";

// controllers
import {
	getAllProducts,
	createProduct,
	updateOneProduct,
	deleteOneProduct,
} from "../controllers/productsControllers.js";

const router = new Router({
	prefix: "/prod",
});

router
	// Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
	.get("/:id", getAllProducts)

	// Para incorporar productos al listado (disponible para administradores)
	.post("/", createProduct)

	// Actualiza un producto por su id (disponible para administradores)
	.put("/:id", updateOneProduct)

	// Borra un producto por su id (disponible para administradores)
	.delete("/:id", deleteOneProduct);

export default router;
