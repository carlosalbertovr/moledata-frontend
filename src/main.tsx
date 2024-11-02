import React from "react";

import { Authenticator } from "@aws-amplify/ui-react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import "@aws-amplify/ui-react/styles.css";
import "@aws-amplify/ui-react/styles.layer.css";
import "./config/amplify/index";
import { ColorModeProvider } from "./components/ui/color-mode";
import { queryClient } from "./config/query/client";

/**
 * Lazily loads the App component using React.lazy and dynamic import.
 * @returns A React lazy component representing the lazy-loaded App component.
 */
const LazyApp = React.lazy(() => import("./app.lazy"));

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<React.StrictMode>
			<React.Suspense fallback={<div>Loading...</div>}>
				<Authenticator.Provider>
					<QueryClientProvider client={queryClient}>
						<ChakraProvider value={defaultSystem}>
							<ColorModeProvider>
								<LazyApp />
							</ColorModeProvider>
						</ChakraProvider>
					</QueryClientProvider>
				</Authenticator.Provider>
			</React.Suspense>
		</React.StrictMode>,
	);
}
