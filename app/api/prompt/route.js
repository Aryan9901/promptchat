import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find().populate("creator");
		console.log(prompts);

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response({ message: "Internal Server Error" }, { status: 500 });
	}
};
