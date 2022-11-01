class ProductDTO {
	constructor(data, currencies) {
		this.tittle = data.tittle;
		this.price = data.price;
		this.thumbnail = data.thumbnail;
		this.description = data.description;
		this.stock = data.stock;
		this.codeBar = data.codeBar;

		for (const [currency, value] of Object.entries(currencies)) {
			this[currency] = value;
		}
	}
}

export default ProductDTO;
