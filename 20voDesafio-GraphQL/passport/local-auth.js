import passportLocal from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";

// instancia de la base de datos
import CartDAO from "../database/daos/CartDAO.js";
import UserDAO from "../database/daos/UserDAO.js";

const Cart = new CartDAO();
const User = new UserDAO();

// nodemailer
import { transporter } from "../utils/nodemailerr.js";

// ---- BCRIPT ----
const encriptar = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, dbPassword) => {
	return bcrypt.compareSync(password, dbPassword); // retorna booleano
};

// 1 ---- ESTRATEGIAS DE PASSPORT (logica) ----

// passport.use(nombre del metodo de autentificacion, nueva estrategia)
passport.use(
	"register",
	new passportLocal.Strategy( // (lo que recibo del cliente, la logica de esa info)
		{
			// en este objeto, va lo que recibo del cliente, del req
			// va lo mismo que elvalor de 'name' del formulario
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true, // con esta propiedad puedo usar el 'req' en el siguiente callback
		},
		async (req, username, password, done) => {
			// en este callback va, lo que voy a hacer con esos datos del objeto anterior
			// en el req, puedo usar los demas campos del formulario, lo traigo por si quiero hacer algo con esos datos

			// logica par registrar un usuario en la base de datos
			const users = await User.getAll();
			const buscado = users.find((user) => user.email === username);

			if (buscado) return done(null, false, req.flash("registerMsg", "The Email is already taken"));

			// cart
			const theCart = await Cart.getByNameCart(username);
			if (theCart.length === 0) await Cart.create(username);

			// mail
			const mailOptions = {
				from: "Server Node.js",
				to: config.TO_MAIL, // mail al que le envio el mensaje
				subject: "Nuevo Registro",
				html: `<h1 style="color:blue">Datos del Nuevo Usuario</h1>
				<h3>Nombre: ${req.body.name}</h3>
				<h3>Mail: ${username}</h3>
				<h3>Dirección: ${req.body.address}</h3>
				<h3>Edad: ${req.body.age}</h3>
				<h3>Teléfono: ${req.body.phone}</h3>`,
			};
			await transporter.sendMail(mailOptions);

			let data = {
				...req.body,
				password: encriptar(password),
				// esparzo todo lo del body y a la propiedad 'password' la piso con este nuevo valor
			};

			// guardo al usuario (userData) en la base de datos
			const user = await User.save(data);

			// respuesta al cliente
			done(null, user); // done(error, lo que devuelvo)
		}
	)
);

passport.use(
	"login",
	new passportLocal.Strategy( // (lo que recibo del cliente, la logica de esa info)
		{
			// en este objeto, va lo que recibo del cliente, del req
			// va lo mismo que elvalor de 'name' del formulario
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true, // con esta propiedad puedo usar el 'req' en el siguiente callback
		},
		async (req, username, password, done) => {
			// en este callback va, lo que voy a hacer con esos datos del objeto anterior

			// logica par ver si ya esta ese email logeado
			const users = await User.getAll();
			const buscado = users.find((user) => user.email === username);

			if (!buscado || !comparePassword(password, buscado.password)) {
				return done(null, false, req.flash("loginMsg", "invalid credentials"));
			}

			done(null, buscado);
		}
	)
);

// 2 ---- SERIALIZARDO ----

// serializacion --> lo que guardo en el navegador para las distintas pestañas/rutas
passport.serializeUser((user, done) => {
	done(null, user.id); // almaceno el id en el navegador, en este caso
});

// deserializacion --> para ir corroborando que este todo ok con la session
passport.deserializeUser(async (id, done) => {
	// recibo el id que guarde en el navegador y busco el usuario para enviar este
	const user = await User.UserById(id);

	// en user tengo los datos que serialice en serializeUser
	done(null, user); // creo que el app.locals 'user' lo genero aca
});
