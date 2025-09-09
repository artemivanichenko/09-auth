import { fetchNoteById } from "@/lib/api";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import React from "react";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NotesDetailsProps {
	params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
	params,
}: NotesDetailsProps): Promise<Metadata> => {
	const { id } = await params;
	const note = await fetchNoteById(id);

	const title = `Note: ${note.title}`;
	const description = note.content.slice(0, 100);

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			url: `https://08-zustand-pi-peach.vercel.app/notes/${id}`,
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

const NotesDetails = async ({ params }: NotesDetailsProps) => {
	const { id } = await params;
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
	});
	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<NoteDetailsClient />
			</HydrationBoundary>
		</div>
	);
};

export default NotesDetails;
