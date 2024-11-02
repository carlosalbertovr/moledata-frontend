import { QueryClient } from "@tanstack/react-query";

import { envConfig } from "../env";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: envConfig.REACT_QUERY_DEFAULT_CACHE_TIME,
		},
	},
});
