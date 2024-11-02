import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { useLocation } from "@tanstack/react-router";

function Footer() {
	const { pathname: location } = useLocation();

	const isSettingsView = location.startsWith("/settings");

	const defaultStyleProps: FlexProps = {
		padding: 6,
	};

	return (
		<Flex alignItems="center" justifyContent="space-between" {...(!isSettingsView && defaultStyleProps)}>
			<Text color="fg.subtle" fontSize="sm">
				Moledata pilot
			</Text>
		</Flex>
	);
}

export default Footer;
