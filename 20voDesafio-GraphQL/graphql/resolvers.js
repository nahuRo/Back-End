import ProdDAO from "../database/daos/ProductDAO.js";
import CartDAO from "../database/daos/CartDAO.js";
import UserDAO from "../database/daos/UserDAO.js";

import Cotizador from "../database/clases/Cotizador.js";
import bcrypt from "bcryptjs";

import ProductDTO from "../database/clases/ProductDTO.js";

import { generateToken } from "../utils/jwt.js";

const Producto = new ProdDAO();
const Cart = new CartDAO();
const User = new UserDAO();

const cotizador = new Cotizador();

const newProducts = (prod) => {
	const productsDTO = prod.map((product) => {
		const currencies = {
			ARS: cotizador.getCurrencyPrice(product.price, "ARS"),
			CLP: cotizador.getCurrencyPrice(product.price, "CLP"),
		};

		return new ProductDTO(product, currencies);
	});
	return productsDTO;
};

// ---- BCRIPT ----
const encriptar = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, dbPassword) => {
	return bcrypt.compareSync(password, dbPassword); // retorna booleano
};

// 2 - que voy hacer con esos datos, las funciones
// aqui van como los "controllers"

export const resolvers = {
	Query: {
		// product
		getAll_P: async () => await Producto.getAll(),

		// cart
		getAll_C: async (root, { id }) => await Cart.getByIdCart(id),

		// user
		getOne_U: async (root, { id }) => await User.UserById(id),
	},

	Mutation: {
		// product
		addProd: async (root, args) => {
			const productsDTO = newProducts([args]);

			const newProduct = await Producto.create(productsDTO[0]);

			return newProduct;
		},

		deleteProd: async (root, { id }) => await Producto.deleteById(id),

		updateProd: async (root, args) => await Producto.update(args.id, { ...args }),

		// cart
		addCart: async (root, args) => await Cart.create(),

		deleteCart: async (root, { id }) => await Cart.deleteByIdCart(id),

		addProdToCart: async (root, args) => {
			const cartFound = await Cart.getByIdCart(args.id);

			if (!cartFound) {
				return null;
			}
			const productDTO = newProducts([args]);

			let items = cartFound.products;
			items.push(productDTO[0]);

			const response = await Cart.updateCart(args.id, items);

			return response;
		},

		deleteProdFromOneCart: async (root, { id_C, id_P }) => {
			const cartFound = await Cart.getByIdCart(id_C);
			let objetos = cartFound.products;

			const restProducts = objetos.filter((item) => item.id !== id_P);

			const response = await Cart.updateCart(id_C, restProducts);

			return response;
		},

		// user
		addUser: async (root, args) => {
			// logica par ver si ya esta ese email logeado
			const users = await User.getAll();
			const buscado = users.find((user) => user.email === args.email);

			if (buscado) return null;

			let data = {
				...args,
				password: encriptar(args.password),
			};

			const response = await User.save(data);

			return response;
		},

		loginUser: async (root, args) => {
			// logica par ver si ya esta ese email logeado
			const users = await User.getAll();
			const buscado = users.find((user) => user.email === args.email);

			if (!buscado || !comparePassword(args.password, buscado.password)) {
				return null;
			}

			const authToken = generateToken(buscado);
			// me retorna el token pero cuando hago la query con graph
			// me retorna null

			return authToken;
		},
	},
};
