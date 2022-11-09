import ProdDAO from "../database/daos/ProductDAO.js";

import { newProducts } from "../utils/addCotizador.js";

const Producto = new ProdDAO();

export const getAllProducts = async (ctx) => {
	try {
		const listProd = await Producto.getAll();
		const buscado = listProd.find((item) => item.id === ctx.params.id);
		ctx.body = {
			status: "success",
			message: "getAllProducts",
			data: buscado || listProd,
		};
	} catch (err) {
		console.log(err);
	}
};

export const createProduct = async (ctx) => {
	try {
		const productsDTO = newProducts([ctx.request.body]);
		const response = await Producto.create(productsDTO[0]);

		ctx.body = {
			status: "success",
			message: "createProduct",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};

export const updateOneProduct = async (ctx) => {
	try {
		const response = await Producto.update(ctx.params.id, ctx.request.body);

		ctx.body = {
			status: "success",
			message: "updateOneProduct",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};

export const deleteOneProduct = async (ctx) => {
	try {
		const response = await Producto.deleteById(ctx.params.id);

		ctx.body = {
			status: "success",
			message: "deleteOneProduct",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};
