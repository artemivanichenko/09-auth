import { fetchNotes } from "@/lib/api";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export const generateMetadata = async ({
	params,
}: NotesProps): Promise<Metadata> => {
	const { slug } = await params;
	const tag = slug[0];
	const title = `${tag} notes list`;
	const description = `${tag} notes to review and finalize`;

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			url: `https://notehub.com/notes/filter/${tag}`,
			siteName: "NoteHub",
			images: [
				{
					url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
		},
	};
};

interface NotesProps {
	params: Promise<{ slug: string[] }>;
}

const Notes = async ({ params }: NotesProps) => {
	const queryClient = new QueryClient();
	const { slug } = await params;

	const tag = slug[0] === "All" ? "" : slug[0];

	await queryClient.prefetchQuery({
		queryKey: ["notes", tag],
		queryFn: () => fetchNotes("", 1, tag),
	});
	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NotesClient tag={tag} />
			</HydrationBoundary>
		</div>
	);
};

export default Notes;
