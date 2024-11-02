import { NotFoundRoute, RouterProvider, createRouter } from "@tanstack/react-router";

import api from "./api/index.ts";
import NotFound from "./components/layout/NotFound.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { Route as rootRoute } from "./routes/__root.tsx";
import { routeTree } from "./routeTree.gen.js";
import { useUserStore } from "./store/user.tsx";

const notFoundRoute = new NotFoundRoute({
	getParentRoute: () => rootRoute,
	component: NotFound,
});

/**
 * Creates a router with the specified route tree and default preload option.
 *
 * @param {RouteTree} routeTree - The route tree configuration.
 * @param {string} defaultPreload - The default preload option.
 * @returns {Router} The created router.
 */
const router = createRouter({
	routeTree,
	notFoundRoute,
	defaultPreload: "intent",
	context: {
		user: undefined!,
	},
});

/**
 * Declaration for the "@tanstack/react-router" module.
 */
declare module "@tanstack/react-router" {
	/**
	 * Interface for the Register object.
	 */
	interface Register {
		/**
		 * The router property of the Register object.
		 */
		router: typeof router;
	}
}

/**
 * Renders the lazy-loaded app component.
 * @returns The lazy-loaded app component wrapped in a RouterProvider.
 */
function LazyApp() {
	const userContext = useUserStore();

	const { data: userData } = api.users.getMyProfileQuery();

	if (userData) {
		userContext.signIn(userData.data);
	}

	return (
		<>
			<RouterProvider
				context={{
					user: userContext,
				}}
				router={router}
			/>
			<Toaster />
		</>
	);
}

export default LazyApp;
