import Router from "koa-router";

// controllers
import { getUser, createUser, loginUser } from "../controllers/usersControllers.js";

const router = new Router({
	prefix: "/user",
});

router
	// trae un usuario
	.get("/:id", getUser)

	// Registrar un nuevo usuario
	.post("/register", createUser)

	// Login usuario
	.post("/login", loginUser);

export default router;
