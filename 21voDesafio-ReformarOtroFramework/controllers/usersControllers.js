import UserDAO from "../database/daos/UserDAO.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

const User = new UserDAO();

// ---- BCRIPT ----
const encriptar = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, dbPassword) => {
	return bcrypt.compareSync(password, dbPassword); // retorna booleano
};

export const getUser = async (ctx) => {
	const response = await User.UserById(ctx.params.id);

	ctx.body = {
		status: "success",
		message: "getUser",
		data: response || { message: "id not found" },
	};
};

export const createUser = async (ctx) => {
	// logica par ver si ya esta ese email logeado
	const users = await User.getAll();
	const buscado = users.find((user) => user.email === ctx.request.body.email);

	if (buscado) {
		return (ctx.body = {
			status: "success",
			message: "createUser",
			data: response || { message: "Email already in use" },
		});
	}

	let data = {
		...ctx.request.body,
		password: encriptar(ctx.request.body.password),
	};

	const response = await User.save(data);

	ctx.body = {
		status: "success",
		message: "getUser",
		data: response,
	};
};

export const loginUser = async (ctx) => {
	// logica par ver si ya esta ese email logeado
	const users = await User.getAll();
	const buscado = users.find((user) => user.email === ctx.request.body.email);

	if (!buscado || !comparePassword(ctx.request.body.password, buscado.password)) {
		return (ctx.body = {
			status: "success",
			message: "Invalid credentials",
		});
	}

	const authToken = generateToken(buscado);

	ctx.body = {
		status: "success",
		data: { authToken },
	};
};
