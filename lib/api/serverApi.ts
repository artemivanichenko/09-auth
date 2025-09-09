import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export const checkServerSession = async () => {
	const cookieStore = await cookies();
	const response = await nextServer.get("/auth/session", {
		headers: { Cookie: cookieStore.toString() },
	});
	return response;
};

interface FetchNotesProps {
	notes: Note[];
	totalPages: number;
}

export const fetchNotes = async (
	search: string,
	page: number,
	tag?: string | null
): Promise<FetchNotesProps> => {
	const cookieStore = await cookies();
	const params = {
		params: {
			page,
			search,
			perPage: 12,
			tag,
		},
		headers: { Cookie: cookieStore.toString() },
	};

	const fetchNotesResponse = await nextServer.get<FetchNotesProps>(
		"/notes",
		params
	);

	return fetchNotesResponse.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
	const cookieStore = await cookies();
	const response = await nextServer.get<Note>(`notes/${id}`, {
		headers: { Cookie: cookieStore.toString() },
	});

	return response.data;
};

export const getMeServer = async () => {
	const cookieStore = await cookies();
	const { data } = await nextServer.get<User>("/users/me", {
		headers: { Cookie: cookieStore.toString() },
	});
	return data;
};
