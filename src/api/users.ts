import { useMutation, useQuery } from "@tanstack/react-query";

import { getMyProfile, registerUser } from "../services/users";

/**
 * A collection of functions related to user management.
 */
const users = {
	/**
	 * Creates a query function for fetching the user's profile.
	 * @returns The query function.
	 */
	getMyProfileQuery: function () {
		return useQuery({
			queryKey: ["MyProfileQuery"],
			queryFn: () => getMyProfile(),
			enabled: Object.keys(localStorage).find((key) => key.endsWith("idToken")) !== undefined,
		});
	},
	/**
	 * Creates a mutation function for registering a new user.
	 * @returns The mutation function.
	 */
	createUserMutation: function () {
		return useMutation({
			mutationFn: registerUser,
		});
	},
};

export default users;
