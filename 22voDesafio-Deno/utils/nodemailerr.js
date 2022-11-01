import { createTransport } from "nodemailer";
import { config } from "./config.js";

export const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: config.FROM_MAIL, // mail que envia
		pass: config.PASS_MAIL, // pass general del mail que envia
	},
});
