import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/_layout/projects/")({
	component: () => <div>Hello /_authenticated/settings/_layout/projects/!</div>,
});
