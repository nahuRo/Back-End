import DBClient from "./DBClient.js";
import mongoose from "mongoose";
import CustomError from "./CustomError.js";

import { config } from "../../utils/config.js";
class MongoClient extends DBClient {
	constructor() {
		super();
		this.connected = false;
		this.client = mongoose;
	}

	async connect() {
		try {
			// me conecto a mi DB
			await this.client.connect(config.DB_URI);

			this.connected = true;

			console.log("DB connect ------");
		} catch (error) {
			console.log(error);

			CustomError(500, "Error connecting");
		}
	}

	async disconnect() {
		try {
			// me desconecto a mi DB
			await this.client.connection.close();

			this.connected = false;

			console.log("------ DB disconnect");
		} catch (error) {
			console.log(error);

			CustomError(500, "Error disconnecting");
		}
	}
}

export default MongoClient;
