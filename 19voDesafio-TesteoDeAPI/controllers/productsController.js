import CartDAO from "../database/daos/CartDAO.js";
import ProductDTO from "../database/clases/ProductDTO.js";
import cotizador from "../database/clases/Cotizador.js";
import { loggerArchivoE } from "../utils/logger.js";
import { config } from "../utils/config.js";

const Cart = new CartDAO();
const Cotizador = new cotizador();

// nodemailer
import { transporter } from "../utils/nodemailerr.js";

// sms twilio
import { client } from "../utils/twilio.js";

const newProducts = (prod) => {
	const productsDTO = prod.map((product) => {
		const currencies = {
			ARS: Cotizador.getCurrencyPrice(product.price, "ARS"),
			CLP: Cotizador.getCurrencyPrice(product.price, "CLP"),
		};

		return new ProductDTO(product, currencies);
	});
	return productsDTO;
};

export const getAllProducts = async (req, res) => {
	try {
		const myCart = await Cart.getByNameCart(req.user.email);
		const { products } = myCart[0];

		const productsDTO = newProducts(products);

		res.render("products", { productsDTO });
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

export const postProducts = async (req, res) => {
	const cartFound = await Cart.getByNameCart(req.user.email);
	let objetos = cartFound[0].products;
	objetos.push(req.body);
	await Cart.updateCart(req.user.email, objetos);

	res.redirect("/products");
};

export const getOrden = async (req, res) => {
	try {
		const myCart = await Cart.getByNameCart(req.user.email);
		const { products } = myCart[0];

		const productsDTO = newProducts(products);

		res.render("orden", { productsDTO });
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

export const postCart = async (req, res) => {
	const myCart = await Cart.getByNameCart(req.user.email);
	const { products } = myCart[0];
	const ProdArrayCart = [...products];

	// envio de pedido via mail
	await transporter.sendMail({
		from: "Server Node.js",
		to: config.TO_MAIL, // mail al que le envio el mensaje
		subject: `Nuevo Pedido de: ${req.user.name} con email: ${req.user.email}`,
		html: ProdArrayCart.map((prod) => {
			return `<h1 style="color:blue">Articulo</h1><h3>Nombre: ${prod.tittle}</h3><h3>Precio: ${prod.price}</h3><h3>Descripción: ${prod.description}</h3><h3>codeBar: ${prod.codeBar}</h3><img style="width:300px" src=${prod.thumbnail}/>`;
		}).toString(),
	});

	// envio de sms twilio
	await client.messages.create({
		body: "Su pedido ha sido recibido y se encuentra en proceso",
		messagingServiceSid: "MG7cf0cd35d95730fa35f667086c3652b4",
		to: config.toSmsNumber,
	});
	// envio de whatsapp twilio
	await client.messages.create({
		body: `Nuevo Pedido\n\nde: ${req.user.name}\ncon email: ${req.user.email}`,
		from: `whatsapp:${config.wspTwilioNumber}`,
		to: `whatsapp:${config.toWspNumber}`,
	});

	res.redirect("/orden");
};
