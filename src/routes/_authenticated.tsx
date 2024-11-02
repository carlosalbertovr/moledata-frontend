import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ context }) => {
		const { isAuthenticated } = context.user;

		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
			});
		}
	},
});
