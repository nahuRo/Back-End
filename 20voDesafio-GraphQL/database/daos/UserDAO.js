import CustomError from "../clases/CustomError.js";
import User from "../models/userModel.js";
import MongoClient from "../clases/MongoClient.class.js";

class UserDAO {
	constructor() {
		this.db = new MongoClient();
		this.collection = User;
	}

	async save(object) {
		try {
			await this.db.connect();

			const item = new this.collection(object);
			return await item.save();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "save user");
		} finally {
			await this.db.disconnect();
		}
	}

	async getAll() {
		try {
			await this.db.connect();

			return await this.collection.find();
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "getAll user");
		} finally {
			await this.db.disconnect();
		}
	}

	async UserById(id) {
		try {
			await this.db.connect();

			return await this.collection.findById(id);
		} catch (error) {
			console.log(error);

			throw new CustomError(500, "UserById user");
		} finally {
			await this.db.disconnect();
		}
	}
}

export default UserDAO;
