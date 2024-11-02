import { produce } from "immer";
import { create } from "zustand";

import { UserOutput } from "../types/users";

export interface UserStore {
	currentUser: UserOutput | null;
	isAuthenticated: boolean;
	signIn: (user: UserOutput) => void;
	signOut: () => void;
}

const defaultState: UserStore = {
	currentUser: null,
	isAuthenticated: Object.keys(localStorage).find((key) => key.endsWith("idToken")) !== undefined,
	signIn: (user: UserOutput) =>
		userStore.setState(
			produce((state: UserStore) => {
				state.currentUser = user;
			}),
		),
	signOut: () => userStore.setState({ currentUser: null }),
};

const userStore = create<UserStore>(() => ({
	...defaultState,
}));

export const useUserStore = userStore;
