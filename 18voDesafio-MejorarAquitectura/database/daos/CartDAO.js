import CustomError from "../clases/CustomError.js";
import Cart from "../models/cartModel.js";
import MongoClient from "../clases/MongoClient.class.js";

let intanceDAO;

class CartDAO {
	constructor() {
		this.collection = Cart;
	}

	async create(nameCart) {
		try {
			const item = new this.collection({ tittle: nameCart, products: [] });
			await item.save();
			return console.log("cart created --> ", nameCart);
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "create cart");
		}
	}

	async getByNameCart(nameCart) {
		try {
			const productos = await this.collection.find({ tittle: nameCart });

			return productos;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "getByNameCart cart");
		}
	}

	async updateCart(nameCart, obj) {
		try {
			const upgraded = await this.collection.findOneAndUpdate(
				{ tittle: nameCart },
				{ tittle: nameCart, products: obj }
			);
			return upgraded;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "updateCart");
		}
	}

	async deleteByNameCart(nameCart) {
		try {
			let borrado = await this.collection.deleteOne({ tittle: nameCart });
			if (borrado.deletedCount === 0) return false;
			return borrado;
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
}

export default CartDAO;
