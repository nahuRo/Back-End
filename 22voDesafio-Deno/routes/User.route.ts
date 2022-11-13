import { Router } from "../depts.ts";
import { deleteUser, findUser, createUser } from "../controllers/user.controller.ts";
const router = new Router();

router.get("/api/user/:id", findUser);
router.delete("/api/user/:id", deleteUser);
router.post("/api/user", createUser);

export default router;
