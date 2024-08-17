import Feed from "@components/Feed";

function Home() {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Discover & Share <br />
				<span className="orange_gradient">AI-Powered Prompts</span>
			</h1>
			<p className="desc text-center">
				Promptchat is an open-source AI platform empowering the modern world to craft, explore, and share imaginative prompts.
			</p>
			<Feed />
		</section>
	);
}

export default Home;
