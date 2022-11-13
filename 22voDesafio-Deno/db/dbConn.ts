import { MongoClient } from "../depts.ts";

const client = new MongoClient();

try {
	// Connect using srv url
	await client.connect(
		"mongodb+srv://agussCoder:agus123@cluster0.ezyymjl.mongodb.net/19voDesafio?authMechanism=SCRAM-SHA-1"
	);
	console.log(`Database ${client.database().name} connected `);
} catch (err) {
	console.log(err);
}

export const db = client.database();
