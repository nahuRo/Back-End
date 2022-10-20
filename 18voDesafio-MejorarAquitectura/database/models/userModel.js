import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		name: { type: String, required: true },
		address: { type: String, required: true },
		age: { type: Number, required: true },
		phone: { type: Number, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const User = mongoose.model("user", userSchema);

export default User;
