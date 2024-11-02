import React from "react";

import { ButtonProps, Dialog, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { LinkProps } from "@tanstack/react-router";
import { HiCheckCircle, HiExclamationCircle, HiXCircle } from "react-icons/hi";

import CustomLink from "./CustomLink";
import { Button } from "../ui/button";
import { DialogActionTrigger, DialogBody, DialogContent, DialogFooter, DialogRoot } from "../ui/dialog";

interface ISimpleDialogButton {
	label: string;
	variant: ButtonProps["variant"];
	onButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	colorPalette?: ButtonProps["colorPalette"];
	navigateTo?: LinkProps["to"];
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
}

export interface ISimpleDialogProps extends Omit<Dialog.RootProps, "children"> {
	title: string;
	buttons?: Array<ISimpleDialogButton>;
	body?: string;
	dialogType: "error" | "success" | "alert";
}

function SimpleDialog(props: ISimpleDialogProps) {
	const { buttons, title, body, dialogType, ...rest } = props;

	function renderDialogIcon() {
		switch (dialogType) {
			case "error":
				return (
					<Icon color="red.fg" fontSize="1.5rem">
						<HiXCircle />
					</Icon>
				);
			case "success":
				return (
					<Icon color="green.fg" fontSize="1.5rem">
						<HiCheckCircle />
					</Icon>
				);
			default:
				return (
					<Icon color="yellow.fg" fontSize="1.5rem">
						<HiExclamationCircle />
					</Icon>
				);
		}
	}

	function getDialogTypeColor() {
		switch (dialogType) {
			case "error":
				return "red.subtle";
			case "success":
				return "green.subtle";
			default:
				return "yellow.subtle";
		}
	}

	return (
		<DialogRoot lazyMount {...rest}>
			<DialogContent>
				<DialogBody>
					<VStack gap={4} padding={4} paddingBottom={0}>
						<Flex
							alignItems="center"
							bg={getDialogTypeColor()}
							borderRadius="full"
							height="2.5rem"
							justifyContent="center"
							width="2.5rem"
						>
							{renderDialogIcon()}
						</Flex>
						<VStack>
							<Heading as="h2" size="lg" textAlign="center">
								{title}
							</Heading>
							{body && (
								<Text color="fg.muted" fontSize="sm" textAlign="center">
									{body}
								</Text>
							)}
						</VStack>
					</VStack>
				</DialogBody>
				<DialogFooter>
					{!buttons ? (
						<DialogActionTrigger asChild>
							<Button variant="outline">Close</Button>
						</DialogActionTrigger>
					) : (
						buttons.map(({ label, onButtonClick, navigateTo, ...buttonProps }, index) => (
							<React.Fragment>
								{navigateTo ? (
									<CustomLink to={navigateTo}>
										<Button key={index} {...buttonProps} minW="8rem" onClick={onButtonClick}>
											{label}
										</Button>
									</CustomLink>
								) : (
									<Button key={index} {...buttonProps} minW="8rem" onClick={onButtonClick}>
										{label}
									</Button>
								)}
							</React.Fragment>
						))
					)}
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	);
}

export default SimpleDialog;
