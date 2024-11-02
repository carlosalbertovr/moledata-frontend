import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings/_layout/forms/")({
	component: () => <div>Hello /_authenticated/settings/_layout/forms/!</div>,
});
