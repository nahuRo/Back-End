import { expect } from "chai";
import supertest from "supertest";

const myUser = {
	email: "mail@gmai.com",
	password: "123",
	name: "hola",
	address: "hola",
	age: 12,
	phone: 123,
};

let request;

describe("Testing user routes", () => {
	before(() => {
		request = supertest("http://localhost:8080");
	});

	describe("- POST /api/user/register", () => {
		let response;

		it("Should return 201", async () => {
			response = await request.post("/api/user").send(myUser);
			expect(response.status).to.eql(201);
		});

		it("Should return the created user", () => {
			expect(response.body.email).to.eql(myUser.email);
			expect(response.body.name).to.eql(myUser.name);
			expect(response.body).to.keys("email", "id", "name");
			userId = response.body.id;
		});
	});
});
