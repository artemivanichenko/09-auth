import { Credentials, User } from "@/types/user";
import { nextServer } from "./api";
import { NewNote, Note } from "@/types/note";

export const register = async (credentials: Credentials) => {
	const { data } = await nextServer.post("/auth/register", credentials);
	return data;
};

export const login = async (credentials: Credentials) => {
	const { data } = await nextServer.post<User>("/auth/login", credentials);
	return data;
};

export const logout = async () => {
	await nextServer.post<User>("/auth/logout");
};

interface SessionStatus {
	success: boolean;
}

export const checkSession = async () => {
	const { data } = await nextServer.get<SessionStatus>("/auth/session");
	return data.success;
};

export const getMe = async () => {
	const { data } = await nextServer.get<User>("/users/me");
	return data;
};

export type ProfileUpdatePayloadProps = { username: string };

export const userUpdate = async (
	profileUpdPayload: ProfileUpdatePayloadProps
) => {
	const { data } = await nextServer.patch<User>(
		"/users/me",
		profileUpdPayload
	);
	return data;
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
	const params = {
		params: {
			page,
			search,
			perPage: 12,
			tag,
		},
	};

	const fetchNotesResponse = await nextServer.get<FetchNotesProps>(
		"/notes",
		params
	);
	return fetchNotesResponse.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
	const response = await nextServer.get<Note>(`notes/${id}`);
	return response.data;
};

export const createNote = async (newTask: NewNote): Promise<Note> => {
	const createNoteResponse = await nextServer.post<Note>("/notes", newTask);
	console.log(createNoteResponse.data);
	return createNoteResponse.data;
};

export const deleteNote = async (taskID: string): Promise<Note> => {
	const deleteNoteResponse = await nextServer.delete<Note>(`notes/${taskID}`);
	return deleteNoteResponse.data;
};
