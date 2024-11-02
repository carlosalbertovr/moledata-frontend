import { Flex, FlexProps, Heading, HStack } from "@chakra-ui/react";
import { useLocation } from "@tanstack/react-router";

import { ColorModeButton } from "../ui/color-mode";
import GitHubIconButton from "./common/GithubButton";
import Logo from "./Logo";
import { useUserStore } from "../../store/user";
import { Avatar } from "../ui/avatar";

function Topbar() {
	const { currentUser } = useUserStore();
	const { pathname: location } = useLocation();

	const isSettingsView = location.startsWith("/settings");

	const defaultStyleProps: FlexProps = {
		borderBottom: "1px solid",
		borderBottomColor: "border",
		justifyContent: "space-between",
		padding: 6,
	};

	return (
		<Flex
			alignItems="center"
			height="4.375rem"
			justifyContent="space-between"
			position="sticky"
			role="banner"
			{...(!isSettingsView && defaultStyleProps)}
		>
			{!isSettingsView ? (
				<Logo />
			) : (
				<Heading as="h2" fontSize="2xl" fontWeight="semibold" lineHeight={1}>
					Page name
				</Heading>
			)}
			<HStack>
				<GitHubIconButton />
				<ColorModeButton />
				{currentUser && !isSettingsView && <Avatar name={currentUser.fullname} variant="subtle" />}
			</HStack>
		</Flex>
	);
}

export default Topbar;
