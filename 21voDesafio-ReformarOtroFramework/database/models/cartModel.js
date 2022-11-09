import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		products: [
			{
				tittle: { type: String, required: true, unique: false },
				price: { type: Number, required: true },
				thumbnail: { type: String, required: true },
				descripcion: { type: String, required: true },
				stock: { type: Number, required: true },
				codeBar: { type: Number, required: true },
				ARS: { type: String, required: true },
				CLP: { type: String, required: true },
			},
			{
				timestamps: true,
				versionKey: false,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
