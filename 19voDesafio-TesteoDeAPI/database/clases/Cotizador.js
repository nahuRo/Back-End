class Cotizador {
	static currencies = {
		USD: 1,
		ARS: 290,
		CLP: 975,
	};

	getCurrencyPrice(price, currency) {
		switch (currency) {
			case "USD":
				return price * Cotizador.currencies.USD;
			case "ARS":
				const formatedARS = price * Cotizador.currencies.ARS;
				return formatedARS.toLocaleString("es", {
					style: "currency",
					currency: "ARS",
				});
			case "CLP":
				const formatedCLP = price * Cotizador.currencies.CLP;
				return formatedCLP.toLocaleString("es", {
					style: "currency",
					currency: "CLP",
				});
			default:
				break;
		}
	}
}

export default Cotizador;
