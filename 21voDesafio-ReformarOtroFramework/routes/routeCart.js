import Router from "koa-router";

// controllers
import {
	createOneCart,
	deleteOneCart,
	getAllProdFromOneCart,
	createProdForOneCart,
	deleteOneProdFromOneCart,
} from "../controllers/cartsControllers.js";

const router = new Router({
	prefix: "/cart",
});

router
	// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
	.get("/:id/products", getAllProdFromOneCart)

	// POST: '/' - Crea un carrito y devuelve su id.
	.post("/", createOneCart)

	// DELETE: '/:id' - Vacía un carrito y lo elimina.
	.delete("/:id", deleteOneCart)

	// POST: '/:id/productos' - Para incorporar productos al carrito por el id del carrito
	.post("/:id/products", createProdForOneCart)

	// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
	.delete("/:idCart/prod/:idProd", deleteOneProdFromOneCart);

export default router;
