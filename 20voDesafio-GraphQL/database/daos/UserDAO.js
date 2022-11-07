import CustomError from "../clases/CustomError.js";
import User from "../models/userModel.js";

class UserDAO {
	constructor() {
		this.collection = User;
	}

	async save(object) {
		try {
			const item = new this.collection(object);
			return await item.save();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "save user");
		}
	}

	async getAll() {
		try {
			return await this.collection.find();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "getAll user");
		}
	}

	async UserById(id) {
		try {
			if (id.length === 12 || id.length === 24) {
				return await this.collection.findById(id);
			}
			return null;
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "UserById user");
		}
	}
}

export default UserDAO;
