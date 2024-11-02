import { Center } from "@chakra-ui/react";

import { EmptyState as NotFoundState } from "../ui/empty-state";

function NotFound() {
	return (
		<Center h="100%">
			<NotFoundState description="The page you are looking for does not exist." title="Page not found" />
		</Center>
	);
}

export default NotFound;
