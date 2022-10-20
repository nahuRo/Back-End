import mongoose from "mongoose";
import { config } from "../../utils/config.js";

export const ConnectionDB = () => {
	// conexion con la bd
	mongoose.connect(config.DB_URI, {}, (err) => {
		err ? console.log("Error de Conexion", err) : console.log("Conexion con Exitosa con DB");
	});
};

export const OtraManera2 = async () => {
	await mongoose.connect(config.DB_URI);

	console.log("Conexion con Exitosa con DB");
};

export const OtraManera3 = () => {
	mongoose
		.connect(config.DB_URI)
		.then(() => {
			console.log("Conexion con Exitosa con DB");
		})
		.catch((err) => {
			console.log(err);
		});
};
