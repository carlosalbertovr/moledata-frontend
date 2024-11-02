import { InferType, object, string } from "yup";

import { messages } from "./messages";

export const userSigninSchema = object({
	email: string().email(messages.email.invalid).required(messages.required),
	fullname: string().required(messages.required),
	country: string().required(messages.required),
	password: string()
		.required(messages.required)
		.min(8, messages.password.min_length)
		.matches(/[A-Z]/, messages.password.uppercase)
		.matches(/[a-z]/, messages.password.lowercase)
		.matches(/[0-9]/, messages.password.number)
		.matches(/[@$!%*?&#]/, messages.password.special_char),
	user_type: string().oneOf(["individual", "team"]).required(messages.required),
});

export type UserSigninValidationSchema = InferType<typeof userSigninSchema>;
