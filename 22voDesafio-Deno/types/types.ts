// Defining schema interface, como definir los modelos
export interface User {
	email: string;
	password: string;
	name: string;
	address: string;
	age: number;
	phone: number;
}

export interface Prod {
	tittle: string;
	price: number;
	thumbnail: string;
	description: string;
	stock: number;
	codeBar: number;
	ARS: string;
	CLP: string;
}
