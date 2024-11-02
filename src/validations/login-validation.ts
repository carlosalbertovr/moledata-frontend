import { InferType, boolean, object, string } from "yup";

import { messages } from "./messages";

export const userLoginSchema = object({
	email: string().email(messages.email.invalid).required(messages.required),
	password: string().required(messages.required),
	remember_me: boolean().default(false),
});

export type UserLoginValidationSchema = InferType<typeof userLoginSchema>;
