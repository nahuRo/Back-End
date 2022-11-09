import ProductDTO from "../database/clases/ProductDTO.js";
import Cotizador from "../database/clases/Cotizador.js";

const cotizador = new Cotizador();

export const newProducts = (prod) => {
	const productsDTO = prod.map((product) => {
		const currencies = {
			ARS: cotizador.getCurrencyPrice(product.price, "ARS"),
			CLP: cotizador.getCurrencyPrice(product.price, "CLP"),
		};

		return new ProductDTO(product, currencies);
	});
	return productsDTO;
};
