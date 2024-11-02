import { Outlet, createRootRouteWithContext, useLocation } from "@tanstack/react-router";

import Layout from "../components/layout/Layout";
import { UserStore } from "../store/user";

type RouterContext = {
	user: UserStore;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

/**
 * Root component of the application.
 * Renders the child components wrapped in a React fragment.
 */
function RootComponent() {
	const { pathname: location } = useLocation();

	const isSettingsView = location.startsWith("/settings");

	if (isSettingsView) {
		return <Outlet />;
	}

	return <Layout />;
}
