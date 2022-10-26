import passport from "passport";
import { loggerArchivoE } from "../utils/logger.js";

export const getRegister = (req, res) => {
	try {
		res.render("register");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

export const getLogin = (req, res) => {
	try {
		res.render("login");
	} catch (error) {
		loggerArchivoE.error(error);
	}
};

export const logout = (req, res) => {
	req.logout((err) => {
		if (err) return next(err);
		res.redirect("/login");
	});
};

export const resgisterPassport = passport.authenticate("register", {
	successRedirect: "/login",
	failureRedirect: "/register",
	passReqToCallback: true,
});

export const loginPassport = passport.authenticate("login", {
	successRedirect: "/profile",
	failureRedirect: "/login",
	passReqToCallback: true,
});
