import Router from "koa-router";
import prodRouter from "./routeProd.js";
import cartRouter from "./routeCart.js";
import userRouter from "./routeUser.js";

const router = new Router({
	prefix: "/api",
});

router.use(userRouter.routes());
router.use(cartRouter.routes());
router.use(prodRouter.routes());

export default router;
