"use client";

import { register } from "@/lib/api/clientApi";
import { Credentials } from "@/types/user";
import React from "react";

const SingUpPage = () => {
	const handleSubmit = async (formData: FormData) => {
		const values = Object.fromEntries(formData) as unknown as Credentials;
		const user = await register(values);
		console.log(user);
	};
	return (
		<>
			<h1>Sign up</h1>
			<form action={handleSubmit}>
				<label>
					Email
					<input type="email" name="email" required />
				</label>
				<label>
					Password
					<input type="password" name="password" required />
				</label>
				<button type="submit">Register</button>
			</form>
		</>
	);
};

export default SingUpPage;
