import CustomError from "./CustomError.js";

class DBClinet {
	connect() {
		throw new CustomError(500, "connect");
	}
	disconnect() {
		throw new CustomError(500, "disconnect");
	}
}

export default DBClinet;
