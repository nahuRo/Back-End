import CustomError from "../clases/CustomError.js";
import Prod from "../models/prodModel.js";

class ProdDAO {
	constructor() {
		this.collection = Prod;
	}

	async create(object) {
		console.log(object);
		try {
			const item = new this.collection(object);
			return await item.save();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "create cart");
		}
	}

	async getAll() {
		try {
			return await this.collection.find();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "getByNameCart cart");
		}
	}

	async update(idProd, obj) {
		try {
			const upgraded = await this.collection.findOneAndUpdate({ _id: idProd }, obj);
			return upgraded;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "updateCart");
		}
	}

	async deleteById(idProd) {
		try {
			const borrado = await this.collection.deleteOne({ _id: idProd });

			return borrado;
		} catch (error) {
			console.log(`Hubo un error en - deleteById: ${error}`);
		}
	}
}

export default ProdDAO;
