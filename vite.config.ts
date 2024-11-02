import * as child from "child_process";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const commitHash = child.execSync("git rev-parse --short HEAD").toString();

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		"import.meta.env.VITE_COMMIT_HASH": JSON.stringify(commitHash),
	},
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	plugins: [TanStackRouterVite({}), react(), tsconfigPaths()],
});
