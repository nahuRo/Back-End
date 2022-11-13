import { Router } from "../depts.ts";

import routerProd from "./Prod.route.ts";
import routerUser from "./User.route.ts";

const router = new Router();

router.use(routerProd.routes());
router.use(routerUser.routes());

export default router;
