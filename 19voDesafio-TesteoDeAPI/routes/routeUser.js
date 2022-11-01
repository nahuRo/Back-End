// para rutas
import { Router } from "express";
const route = Router();

// controllers
import { getUser, createUser, loginUser } from "../controllers/usersControllers.js";

// ---- Rutas para productos ----
route
	// trae un usuario
	.get("/:id", getUser)

	// Registrar un nuevo usuario
	.post("/register", createUser)

	// Login usuario
	.post("/login", loginUser);

export default route;
