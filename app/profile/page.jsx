"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [myPosts, setMyPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch(`/api/users/${session?.user.id}/posts`);
		const data = await response.json();

		setMyPosts(data);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setMyPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
		console.log(post);
		if (hasConfirmed) {
			try {
				const response = await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.status} ${response.statusText}`);
				}

				// Re-fetch posts after successful deletion
				fetchPosts();
			} catch (error) {
				console.error("Failed to delete prompt:", error.message);
			}
		}
	};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
