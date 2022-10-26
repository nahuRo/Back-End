import util from "util";
import os from "os";

import { loggerArchivoE } from "../utils/logger.js";

const mensaje = "hola".repeat(1000);
const myPORT = Number(process.argv[2]) || 8080;

export const getInfo = (req, res) => {
	try {
		res.render("info", {
			argumentsEntri: myPORT, // puerto
			systemName: process.platform,
			nodeV: process.version,
			memory: util.inspect(process.memoryUsage()),
			pathEjecusion: process.execPath,
			idPross: process.pid,
			ruta: process.cwd(),
			cpus: os.cpus().length,
			mensaje,
		});
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

export const getInfoGzip = (req, res) => {
	try {
		res.render("info", {
			argumentsEntri: myPORT, // puerto
			systemName: process.platform,
			nodeV: process.version,
			memory: util.inspect(process.memoryUsage()),
			pathEjecusion: process.execPath,
			idPross: process.pid,
			ruta: process.cwd(),
			cpus: os.cpus().length,
			mensaje,
		});
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

export const getProfile = (req, res) => {
	try {
		res.render("profile");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};
