import log4js from "log4js";

log4js.configure({
	appenders: {
		miLoggerConsole: { type: "console" },
		miLoggerArchivoWarnings: { type: "file", filename: "warn.log" },
		miLoggerArchivoErrores: { type: "file", filename: "error.log" },
	},
	categories: {
		default: { appenders: ["miLoggerConsole"], level: "info" },
		archivoWarn: { appenders: ["miLoggerArchivoWarnings"], level: "warn" },
		archivoError: { appenders: ["miLoggerArchivoErrores"], level: "error" },
	},
});

export const loggerInfo = log4js.getLogger("default");
export const loggerArchivoW = log4js.getLogger("archivoWarn");
export const loggerArchivoE = log4js.getLogger("archivoError");
