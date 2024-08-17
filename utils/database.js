import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery");

	if (isConnected) {
		console.log("Mongodb is already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "share_prompt",
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log("Mongodb is connected");
	} catch (error) {
		console.error(error);
	}
};
