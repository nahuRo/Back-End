class ProductDTO {
	constructor(data, currencies) {
		this.tittle = data.tittle;
		this.price = data.price;
		this.thumbnail = data.thumbnail;
		this.description = data.description;
		this.stock = data.stock;
		this.codeBar = Math.floor(Math.random() * (200000 - 100000 + 1) + 100000);

		for (const [currency, value] of Object.entries(currencies)) {
			this[currency] = value;
		}
	}
}

export default ProductDTO;
