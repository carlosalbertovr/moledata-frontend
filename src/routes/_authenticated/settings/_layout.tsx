import { Grid, GridItem } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

import Layout from "../../../components/layout/Layout";
import SettingsSidebar from "../../../components/layout/SettingsSidebar";

export const Route = createFileRoute("/_authenticated/settings/_layout")({
	component: SettingsLayout,
});

function SettingsLayout() {
	return (
		<Grid bg={{ base: "bg.subtle", _dark: "bg" }} templateColumns="repeat(12, 1fr)">
			<GridItem colSpan={2}>
				<SettingsSidebar />
			</GridItem>
			<GridItem colSpan={10}>
				<Layout />
			</GridItem>
		</Grid>
	);
}
