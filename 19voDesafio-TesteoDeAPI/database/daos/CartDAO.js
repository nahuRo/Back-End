import CustomError from "../clases/CustomError.js";
import Cart from "../models/cartModel.js";
import MongoClient from "../clases/MongoClient.class.js";

let intanceDAO;

class CartDAO {
	constructor() {
		this.db = new MongoClient();
		this.collection = Cart;
	}

	async create(nameCart) {
		try {
			await this.db.connect();

			const item = new this.collection({ tittle: nameCart, products: [] });
			await item.save();
			return console.log("cart created --> ", nameCart);
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "create cart");
		} finally {
			await this.db.disconnect();
		}
	}

	async getByNameCart(nameCart) {
		try {
			await this.db.connect();

			const productos = await this.collection.find({ tittle: nameCart });

			return productos;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "getByNameCart cart");
		} finally {
			await this.db.disconnect();
		}
	}

	async updateCart(nameCart, obj) {
		try {
			await this.db.connect();

			const upgraded = await this.collection.findOneAndUpdate({ tittle: nameCart }, { tittle: nameCart, products: obj });
			return upgraded;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "updateCart");
		} finally {
			await this.db.disconnect();
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

	static getIntance() {
		if (!intanceDAO) {
			intanceDAO = new CartDAO();
		}
		return intanceDAO;
	}
}

export default CartDAO;
