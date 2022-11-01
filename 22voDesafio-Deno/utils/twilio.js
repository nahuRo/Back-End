import twilio from "twilio";
import { config } from "./config.js";

export const client = new twilio(config.accountSid, config.authToken);
