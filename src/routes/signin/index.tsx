import React from "react";

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/")({
	component: () => <React.Fragment />,
	beforeLoad: function () {
		throw redirect({
			to: "/signin/user-type",
		});
	},
});
