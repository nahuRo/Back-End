// para rutas
import { Router } from "express";
const route = Router();

// controllers
import {
	createOneCart,
	deleteOneCart,
	getAllProdFromOneCart,
	createProdForOneCart,
	deleteOneProdFromOneCart,
} from "../controllers/cartsControllers.js";

// ---- Rutas para cart ----

route
	// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
	.get("/:id/products", getAllProdFromOneCart)

	// POST: '/' - Crea un carrito y devuelve su id.
	.post("/", createOneCart)

	// DELETE: '/:id' - Vacía un carrito y lo elimina.
	.delete("/:id", deleteOneCart)

	// POST: '/:id/productos' - Para incorporar productos al carrito por e; id del carrito
	.post("/:id/products", createProdForOneCart)

	//

	// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
	.delete("/:idCart/products/:idProd", deleteOneProdFromOneCart)

	// Atajo URLs no validas
	.use((req, res) => {
		res.status(404).json({
			error: -1,
			descripcion: req.path,
			método: "no autorizada",
		});
	});

export default route;
