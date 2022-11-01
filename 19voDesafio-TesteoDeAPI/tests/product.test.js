import { expect } from "chai";
import supertest from "supertest";

let request;
let token;

const myUser = {
	email: "mail@gmai.com",
	password: "123",
	name: "hola",
	address: "hola",
	age: 12,
	phone: 123,
};

const myProd = {
	tittle: "borrar",
	price: "8000",
	thumbnail:
		"https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8emFwYXRpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
	descripcion: "Zapatillas",
	stock: "5",
};

describe("Testing product routes", () => {
	before(async () => {
		request = supertest("http://localhost:3000");

		const postResponse = await request.post("/api/user/register").send(myUser);

		const createdUser = postResponse.body;

		const response = await request
			.post("/api/user/login")
			.send({ email: createdUser.email, password: createdUser.password });

		token = response.body.token;
	});

	describe("- POST /api/product", () => {
		let response;

		it("Should return 201", async () => {
			response = await request
				.post("/api/product")
				.set({ Authorization: `Bearer ${token}` })
				.send(myProd);

			expect(response.status).to.eql(201);
		});

		it("Should return the created product", () => {
			expect(response.body.tittle).to.eql(myProd.tittle);
			expect(response.body.price).to.eql(Number(myProd.price));
			expect(response.body.thumbnail).to.eql(myProd.thumbnail);
			expect(response.body.descripcion).to.eql(myProd.descripcion);
			expect(response.body.stock).to.eql(Number(myProd.stock));
			expect(response.body.codeBar).to.eql(Number(myProd.codeBar));
		});
	});
});
