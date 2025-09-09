export interface Credentials {
	email: string;
	password: string;
}

export interface User {
	email: string;
	username: string;
	avatar: string;
}

export interface ProfileUpdatePayload {
	email: string;
	username: string;
}
