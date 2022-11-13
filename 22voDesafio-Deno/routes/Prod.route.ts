import { Router } from "../depts.ts";

const router = new Router();

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
