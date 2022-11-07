import ProductDTO from "../database/clases/ProductDTO.js";
import Cotizador from "../database/clases/Cotizador.js";

import ProdDAO from "../database/daos/ProductDAO.js";

const Producto = new ProdDAO();
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

export const getAllProducts = async (req, res) => {
	try {
		const listProd = await Producto.getAll();
		const buscado = listProd.find((item) => item.id === req.params.id);

		res.json(buscado || listProd);
	} catch (err) {
		console.log(err);
	}
};

export const createProduct = async (req, res) => {
	try {
		const productsDTO = newProducts([req.body]);

		const response = await Producto.create(productsDTO[0]);

		res.json(response);
	} catch (err) {
		console.log(err);
	}
};

export const updateOneProduct = async (req, res) => {
	try {
		const response = await Producto.update(req.params.id, req.body);

		res.json(response);
	} catch (err) {
		console.log(err);
	}
};

export const deleteOneProduct = async (req, res) => {
	try {
		const response = await Producto.deleteById(req.params.id);

		res.json(response);
	} catch (err) {
		console.log(err);
	}
};
