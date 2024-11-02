/**
 * Object containing validation error messages.
 */
export const messages = {
	required: "field_required", //  "This field is required",
	email: {
		invalid: "invalid_email", //  "Invalid email address",
	},
	password: {
		min_length: "password_min_length", //  "Password must be at least 8 characters long",
		uppercase: "password_uppercase", //  "Password must contain at least one uppercase letter",
		lowercase: "password_lowercase", //  "Password must contain at least one lowercase letter",
		number: "password_number", //  "Password must contain at least one number",
		special_char: "password_special_char", //  "Password must contain at least one special character",
	},
};
