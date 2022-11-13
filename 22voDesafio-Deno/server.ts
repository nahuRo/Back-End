import { Application, config } from "./depts.ts";
import Routes from "./routes/index.ts";
import loggerMiddleware from "./middleware/logger.middleware.ts";

const app: Application = new Application();
const { PORT } = await config();

app.use(loggerMiddleware);
app.use(Routes.routes());

app.listen({ port: Number(PORT) });
console.log("Server listening http://127.0.0.1:8080");
