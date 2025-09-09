"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";

import { useRouter } from "next/navigation";
import { NewNote, Note } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";

const NoteForm = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: createNote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notes"] });
			clearDraft();
			router.back();
		},
	});

	const { draft, setDraft, clearDraft } = useNoteDraftStore();

	const handleSubmit = (formData: FormData) => {
		// const title = formData.get("title");
		// const description = formData.get("description")
		const values = Object.fromEntries(formData) as unknown as NewNote;
		mutation.mutate(values);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		setDraft({ ...draft, [e.target.name]: e.target.value });
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<form className={css.form} action={handleSubmit}>
			<div className={css.formGroup}>
				<label htmlFor="title">Title</label>
				<input
					id="title"
					type="text"
					name="title"
					className={css.input}
					onChange={handleChange}
					value={draft.title}
				/>
			</div>

			<div className={css.formGroup}>
				<label htmlFor="content">Content</label>
				<textarea
					id="content"
					name="content"
					rows={8}
					className={css.textarea}
					onChange={handleChange}
					value={draft.content}
				/>
			</div>

			<div className={css.formGroup}>
				<label htmlFor="tag">Tag</label>
				<select
					id="tag"
					name="tag"
					className={css.select}
					onChange={handleChange}
					value={draft.tag}>
					<option value="Todo">Todo</option>
					<option value="Work">Work</option>
					<option value="Personal">Personal</option>
					<option value="Meeting">Meeting</option>
					<option value="Shopping">Shopping</option>
				</select>
			</div>
			<div className={css.actions}>
				<button
					onClick={handleCancel}
					type="button"
					className={css.cancelButton}>
					Cancel
				</button>
				<button type="submit" className={css.submitButton}>
					Create note
				</button>
			</div>
		</form>
	);
};

export default NoteForm;
