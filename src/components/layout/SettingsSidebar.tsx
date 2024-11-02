import { Badge, Box, Flex, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react";
import { LinkProps, useLocation } from "@tanstack/react-router";
import { signOut } from "aws-amplify/auth";
import { HiHome, HiChartPie, HiUser, HiUsers, HiViewGrid, HiViewList, HiLogout, HiCog } from "react-icons/hi";
import { IconType } from "react-icons/lib";

import Logo from "./Logo";
import { useUserStore } from "../../store/user";
import CustomLink from "../common/CustomLink";
import { Avatar } from "../ui/avatar";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";

type TNavigationItem = {
	label: string;
	icon: IconType;
	to: LinkProps["to"];
	count?: number;
};

interface ISettingsSidebarNavigationProps {
	navGroups: {
		[group: string]: Array<TNavigationItem>;
	};
}

interface ISettingsSidebarNavigationitemProps {
	item: TNavigationItem;
}

function SettingsSidebar() {
	const { currentUser } = useUserStore();

	const navGroups: ISettingsSidebarNavigationProps["navGroups"] = {
		general: [
			{
				label: "Home",
				icon: HiHome,
				to: "/settings/home",
			},
			{
				label: "Projects",
				icon: HiViewGrid,
				to: "/settings/projects",
				count: 10,
			},
		],
		configuration: [
			{
				label: "Forms",
				icon: HiViewList,
				to: "/settings/forms",
				count: 2,
			},
			{
				label: "Dashboards",
				icon: HiChartPie,
				to: "/settings/dashboards",
				count: 1,
			},
		],
	};

	if (currentUser?.user_type === "team") {
		navGroups["users"] = [
			{
				label: "Teams",
				icon: HiUsers,
				to: "/settings/teams",
			},
			{
				label: "Members",
				icon: HiUser,
				to: "/settings/members",
			},
		];
	}

	return (
		<Box
			borderRight="1px solid"
			borderRightColor="border"
			display="flex"
			flexDirection="column"
			height="100vh"
			p={6}
			pt={0}
		>
			<Flex alignItems="center" height="4.375rem">
				<Logo />
			</Flex>
			<VStack align="stretch" flex="1" overflow="hidden">
				<VStack align="stretch" flex="1" gap={0}>
					<Separator mb={2} />
					<SettingsSidebarNavigation navGroups={navGroups} />
				</VStack>
				{currentUser && (
					<VStack align="stretch" gap={0}>
						<Separator mb={2} />
						<UserMenu />
					</VStack>
				)}
			</VStack>
		</Box>
	);
}

function SettingsSidebarNavigation(props: ISettingsSidebarNavigationProps) {
	const { navGroups } = props;

	return (
		<VStack align="stretch" gap={0}>
			{Object.entries(navGroups).map(([_group, items]) => (
				<VStack key={_group} align="stretch" gap={1}>
					{items.map((item) => (
						<SettingsSidebarNavigationitem key={item.label} item={item} />
					))}
					<Separator my={2} />
				</VStack>
			))}
		</VStack>
	);
}

function SettingsSidebarNavigationitem(props: ISettingsSidebarNavigationitemProps) {
	const { item } = props;

	const { pathname: location } = useLocation();

	const isActive = location.endsWith(item.to as string);

	return (
		<CustomLink
			_hover={{
				bg: "bg.emphasized",
				"& .icon, & .text": {
					color: "fg",
				},
			}}
			bg={isActive ? "bg.emphasized" : "transparent"}
			paddingX={2}
			paddingY={1}
			rounded="md"
			to={item.to}
			transition="all 0.2s"
		>
			<HStack w="100%">
				<HStack w="100%">
					<Icon className="icon" color={isActive ? "fg" : "fg.muted"} fontSize="lg" strokeWidth="1.5px">
						<item.icon />
					</Icon>
					<Text
						className="text"
						color={isActive ? "fg" : "fg.muted"}
						fontSize="sm"
						fontWeight={isActive ? "medium" : "normal"}
					>
						{item.label}
					</Text>
				</HStack>
				{item.count && (
					<Badge bg="fg.inverted" variant="outline">
						{item.count}
					</Badge>
				)}
			</HStack>
		</CustomLink>
	);
}

function UserMenu() {
	const { currentUser, signOut: removeUser } = useUserStore();

	async function handleLogout() {
		await signOut();
		removeUser();
		window.location.href = "/";
	}

	return (
		<MenuRoot positioning={{ placement: "right-start" }}>
			<MenuTrigger asChild>
				{currentUser && (
					<HStack
						_hover={{
							bg: "bg.emphasized",
						}}
						cursor="pointer"
						paddingX={2}
						paddingY={1}
						rounded="md"
						transition="all 0.2s"
					>
						<Avatar name={currentUser.fullname} size="sm" variant="subtle" />
						<VStack align="stretch" gap={0}>
							<Text truncate fontSize="sm" fontWeight="medium">
								{currentUser.fullname}
							</Text>
							<Text truncate fontSize="xs" fontWeight="normal">
								{currentUser.email}
							</Text>
						</VStack>
					</HStack>
				)}
			</MenuTrigger>
			<MenuContent>
				<MenuItem value="open-file">
					<HiCog />
					Settings
				</MenuItem>
				<MenuItem value="export" onClick={handleLogout}>
					<HiLogout />
					Log out
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	);
}

export default SettingsSidebar;
