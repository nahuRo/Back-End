import Koa from "koa";
import { koaBody } from "koa-body";
import { ConnectionDB } from "./database/config/configMongo.js";

import routes from "./routes/index.js";

const app = new Koa();

app.use(koaBody());

ConnectionDB();

// rutas
app.use(routes.routes());

app.use((ctx) => {
	ctx.response.statusCode = 404;
	ctx.body = {
		status: "not found",
		message: "route not found",
	};
});

app.listen(8080);
console.log("listening on http://localhost:8080");
