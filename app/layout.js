import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Suspense } from "react";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/assets/icons/logo.ico" />
				<meta name="description" content="Discover & share AI Prompts" />
				<title>Promptchat - Home</title>
			</head>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Nav />
						<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
					</main>
				</Provider>
			</body>
		</html>
	);
}
