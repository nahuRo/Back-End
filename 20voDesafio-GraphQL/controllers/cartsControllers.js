import ProductDTO from "../database/clases/ProductDTO.js";
import Cotizador from "../database/clases/Cotizador.js";

import CartDAO from "../database/daos/CartDAO.js";

const Cart = new CartDAO();
const cotizador = new Cotizador();

const newProducts = (prod) => {
	const productsDTO = prod.map((product) => {
		const currencies = {
			ARS: cotizador.getCurrencyPrice(product.price, "ARS"),
			CLP: cotizador.getCurrencyPrice(product.price, "CLP"),
		};

		return new ProductDTO(product, currencies);
	});
	return productsDTO;
};

export const createOneCart = async (req, res) => {
	const response = await Cart.create();
	res.json(response);
};

export const deleteOneCart = async (req, res) => {
	const response = await Cart.deleteByIdCart(req.params.id);

	res.json(response || { message: "Invalid Id Cart" });
};

export const getAllProdFromOneCart = async (req, res) => {
	const response = await Cart.getByIdCart(req.params.id);

	res.json(response || []);
};

export const createProdForOneCart = async (req, res) => {
	const cartFound = await Cart.getByIdCart(req.params.id);

	if (!cartFound) {
		return res.json({ message: "Invalid Id Cart" });
	}

	const productDTO = newProducts([req.body]);

	let items = cartFound.products;
	items.push(productDTO[0]);

	const response = await Cart.updateCart(req.params.id, items);

	res.json(response);
};

//
export const deleteOneProdFromOneCart = async (req, res) => {
	const cartFound = await Cart.getByIdCart(req.params.idCart);

	let objetos = cartFound.products;

	const restProducts = objetos.filter((item) => item.id !== req.params.idProd);

	const response = await Cart.updateCart(req.params.idCart, restProducts);

	res.json(response);
};
