import { Box, BoxProps, Grid } from "@chakra-ui/react";
import { Outlet, useLocation } from "@tanstack/react-router";

import Footer from "./Footer";
import Topbar from "./Topbar";

function Layout() {
	const { pathname: location } = useLocation();

	const isSettingsView = location.startsWith("/settings");

	const defaultStyleProps: BoxProps = {
		paddingX: { base: 4, md: 8, lg: 16 },
	};

	return (
		<Grid
			backgroundColor="bg"
			gridTemplateRows="auto 1fr auto"
			minHeight="100dvh"
			rowGap={4}
			{...(isSettingsView && {
				padding: 6,
				paddingTop: 0,
			})}
		>
			<Box as="header">
				<Topbar />
			</Box>
			<Box as="main" {...(!isSettingsView && defaultStyleProps)}>
				<Outlet />
			</Box>
			<Box as="footer">
				<Footer />
			</Box>
		</Grid>
	);
}

export default Layout;
