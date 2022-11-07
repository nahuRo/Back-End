import CustomError from "../clases/CustomError.js";
import Cart from "../models/cartModel.js";

class CartDAO {
	constructor() {
		this.collection = Cart;
	}

	async create() {
		try {
			const item = new this.collection();

			return await item.save();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "create cart");
		}
	}

	async getByIdCart(id) {
		try {
			if (id.length === 12 || id.length === 24) {
				return await this.collection.findOne({ _id: id });
			}
			return null;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "getByNameCart cart");
		}
	}

	async updateCart(id, obj) {
		try {
			const upgraded = await this.collection.findOneAndUpdate(
				{ _id: id },
				{ _id: id, products: obj }
			);
			return upgraded;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "updateCart");
		}
	}

	async deleteByIdCart(id) {
		try {
			return await this.collection.deleteOne({ _id: id });
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
}

export default CartDAO;
