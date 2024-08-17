"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function Nav() {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setProvider = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setProvider();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image src="/assets/images/logo.svg" width={30} height={30} className="object-contain" alt="logo" />
				<p className="logo_text">Promptchat</p>
			</Link>
			{/* desktop navigation */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
						</Link>
						<button
							type="button"
							className="outline_btn"
							onClick={() => {
								signOut();
							}}
						>
							Sign Out
						</button>
						<Link href="/profile">
							<Image
								src={session?.user?.image || "/assets/images/logo.svg"}
								width={37}
								alt="profile"
								height={37}
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
										Sign In
									</button>
								);
							})}
					</>
				)}
			</div>

			{/* mobile navigation */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div>
						<Image
							src={session?.user?.image || "/assets/images/logo.svg"}
							width={40}
							height={40}
							className="rounded-full cursor-pointer"
							alt="profile"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
									Profile
								</Link>
								<Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>
									Create Prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
										Sign In
									</button>
								);
							})}
					</>
				)}
			</div>
		</nav>
	);
}

export default Nav;
