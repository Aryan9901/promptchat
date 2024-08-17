import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
	title: "Home Page",
	description: "Discover & share AI Prompts",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
