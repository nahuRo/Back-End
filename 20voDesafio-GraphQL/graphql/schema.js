import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers.js";

// 1 - estructura de mis datos
// aqui van la "routes"
// en type Product, van las propiedades que quiero usar, si no pongo tittle cuando valla a hacer una consulta no voy a poder ver el
// tittle pero eso no significa que no exista un tittle seria algo como que no llamo a esa propieda pero si a las demas(las que tengo declaradas)
const typeDefs = `

	type Product {
		_id: ID!
		tittle: String
		price: Int
		thumbnail: String
		description: String
		stock: Int
		codeBar: Int
		ARS: String
		CLP: String
	}

	type User {
		_id: ID!
		email: String
		password: String
		name: String
		address: String
		age: Int
		phone: Int
	}

	type Cart {
		_id: ID!
		products: [Product]
	}

	type Token {
		token: String
	}




	type Query {
		getAll_P: [Product]

		getAll_C(id: String!): Cart

		getOne_U(id: String!): User
	}

	type Mutation {
		addProd(
			tittle: String!
			price: Int!
			thumbnail: String!
			description: String!
			stock: Int!
			codeBar: Int!
			ARS: String!
			CLP: String!
		): Product

		deleteProd(id: String!): Product

		updateProd(
			id: String!
			tittle: String
			price: Int
			thumbnail: String
			description: String
			stock: Int
			codeBar: Int
			ARS: String
			CLP: String	
		): Product

		addUser(
			email: String!
			password: String!
			name: String!
			address: String!
			age: Int!
			phone: Int!
		): User

		loginUser(
			email: String!
			password: String!
		): Token

		addCart : User

		deleteCart(id: String!): Cart

		addProdToCart(
			id: String!
			tittle: String!
			price: Int!
			thumbnail: String!
			description: String!
			stock: Int!
		): Cart

		deleteProdFromOneCart(
			id_C: String!
			id_P: String!
		): Cart

	}

`;

export default makeExecutableSchema({
	typeDefs,
	resolvers,
});
