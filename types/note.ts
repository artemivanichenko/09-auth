export interface Note {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	tag: string;
}

export interface NewNote {
	title: string;
	content: string;
	tag: NoteTag;
}

export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export const tags = [
	"All",
	"Todo",
	"Work",
	"Personal",
	"Meeting",
	"Shopping",
] as const;
