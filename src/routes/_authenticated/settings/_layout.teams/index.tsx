import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/_layout/teams/")({
	component: () => <div>Hello /_authenticated/settings/_layout/teams/!</div>,
});
