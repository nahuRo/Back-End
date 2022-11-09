import CartDAO from "../database/daos/CartDAO.js";

import { newProducts } from "../utils/addCotizador.js";

const Cart = new CartDAO();

export const createOneCart = async (ctx) => {
	try {
		const response = await Cart.create();
		ctx.body = {
			status: "success",
			message: "createOneCart",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};

export const deleteOneCart = async (ctx) => {
	try {
		const response = await Cart.deleteByIdCart(ctx.params.id);
		ctx.body = {
			status: "success",
			message: "deleteOneCart",
			data: response || { message: "id not found" },
		};
	} catch (err) {
		console.log(err);
	}
};

export const getAllProdFromOneCart = async (ctx) => {
	try {
		const response = await Cart.getByIdCart(ctx.params.id);
		ctx.body = {
			status: "success",
			message: "getAllProdFromOneCart",
			data: response || { message: "id not found" },
		};
	} catch (err) {
		console.log(err);
	}
};

export const createProdForOneCart = async (ctx) => {
	try {
		const cartFound = await Cart.getByIdCart(ctx.params.id);

		if (!cartFound) {
			return (ctx.body = {
				status: "Invalid Id Cart",
				message: "createProdForOneCart",
			});
		}

		const productDTO = newProducts([ctx.request.body]);

		let items = cartFound.products;
		items.push(productDTO[0]);

		const response = await Cart.updateCart(ctx.params.id, items);
		ctx.body = {
			status: "success",
			message: "createProdForOneCart",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};

export const deleteOneProdFromOneCart = async (ctx) => {
	try {
		const cartFound = await Cart.getByIdCart(ctx.params.idCart);

		if (!cartFound) {
			return (ctx.body = {
				status: "Invalid Id Cart",
				message: "deleteOneProdFromOneCart",
			});
		}

		let objetos = cartFound.products;

		const restProducts = objetos.filter((item) => item.id !== ctx.params.idProd);

		console.log(restProducts.length);
		console.log(objetos.length);

		if (objetos.length === restProducts.length) {
			return (ctx.body = {
				status: "Invalid Id Product",
				message: "deleteOneProdFromOneCart",
			});
		}

		const response = await Cart.updateCart(ctx.params.idCart, restProducts);

		ctx.body = {
			status: "success",
			message: "deleteOneProdFromOneCart",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};
