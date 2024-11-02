import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reset-password")({
	component: () => <div>Hello /reset-password!</div>,
});
