import { config } from "./depts.ts";

const { PORT } = await config();

export const APP_PORT = PORT || 3000;
