import React from "react";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	/**
	 * Renders the component for the root path.
	 * @returns The rendered React component.
	 */
	component: function () {
		return <React.Fragment />;
	},
	/**
	 * Executes before the component is loaded.
	 * Throws a redirect to the "/login" path.
	 */
	beforeLoad: function () {
		throw redirect({
			to: "/login",
		});
	},
});
