import { Context, helpers } from "../depts.ts";
import { User } from "../types/types.ts";
import { db } from "../db/dbConn.ts";

const User = db.collection<User>("users");

export const findUser = async (ctx: Context): Promise<void> => {
	const { id } = helpers.getQuery(ctx, { mergeParams: true });

	const response = await User.findOne({ _id: id });
	ctx.response.status = 200;
	ctx.response.body = {
		status: "success",
		message: "getUser",
		data: response || { message: "id not found" },
	};

	if (response) {
		ctx.response.status = 200;
		ctx.response.body = {
			status: "Succes",
			data: response,
		};
	} else {
		ctx.response.status = 404;
		ctx.response.body = {
			status: "Not found",
			data: {},
		};
	}
};

export const createUser = async (ctx: Context): Promise<void> => {
	try {
		const { email, password, address, name, age, phone } = await ctx.request.body().value;
		if (name && password) {
			const userToCreate: User = { email, password, address, name, age, phone };
			User.insertOne(userToCreate).then(() => {
				ctx.response.status = 201;
				ctx.response.body = {
					status: "Created",
					data: userToCreate,
				};
			});
		} else {
			ctx.response.status = 400;
			ctx.response.body = {
				status: "Missing data",
				data: {},
			};
		}
	} catch (err) {
		console.log(err);
	}
};

export const deleteUser = async (ctx: Context): Promise<void> => {
	const { id } = helpers.getQuery(ctx, { mergeParams: true });
	const deletedUser = await User.deleteOne({ _id: id });

	ctx.response.status = 200;
	ctx.response.body = {
		status: "Deleted",
		data: deletedUser,
	};
};
