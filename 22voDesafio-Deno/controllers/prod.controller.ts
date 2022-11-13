import { Context, helpers } from "../depts.ts";
import { Prod } from "../types/types.ts";
import { db } from "../db/dbConn.ts";

const Prod = db.collection<Prod>("products");

export const getAllProducts = async (ctx: Context) => {
	const { id } = helpers.getQuery(ctx, { mergeParams: true });
	try {
		const response = await Prod.find();
		ctx.body = {
			status: "success",
			message: "getAllProducts",
			data: response,
		};
	} catch (err) {
		console.log(err);
	}
};

export const createProduct = async (ctx: Context) => {
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

export const updateOneProduct = async (ctx: Context) => {
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

export const deleteOneProduct = async (ctx: Context) => {
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
