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

export const getUser = async (req, res) => {
	const response = await User.UserById(req.params.id);

	res.json(response || []);
};

export const createUser = async (req, res) => {
	// logica par ver si ya esta ese email logeado
	const users = await User.getAll();
	const buscado = users.find((user) => user.email === req.body.email);

	if (buscado) res.status(400).json({ message: "Email already in use" });

	let data = {
		...req.body,
		password: encriptar(req.body.password),
	};

	const response = await User.save(data);

	res.json(response);
};

export const loginUser = async (req, res) => {
	// logica par ver si ya esta ese email logeado
	const users = await User.getAll();
	const buscado = users.find((user) => user.email === req.body.email);

	if (!buscado || !comparePassword(req.body.password, buscado.password)) {
		return res.status(400).json({ message: "Invalid credentials" });
	}

	console.log(buscado);

	const authToken = generateToken(buscado);

	res.json({ authToken });
};
