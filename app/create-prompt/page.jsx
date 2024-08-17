"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
	const [submitting, setSubmitting] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch("/api/prompt/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: post.prompt,
					userId: session?.user.id,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setSubmitting(false);
		}
	};

	return <Form type="create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
}

export default page;
