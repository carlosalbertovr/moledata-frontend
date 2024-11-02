import * as React from "react";

import { Link } from "@chakra-ui/react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { LuExternalLink } from "react-icons/lu";

interface ChakraLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> {
	isExternal?: boolean;
}

const ChakraLinkComponent = React.forwardRef<HTMLAnchorElement, ChakraLinkProps>((props, ref) => {
	const { isExternal, children, ...rest } = props;

	if (isExternal) {
		return (
			<Link ref={ref} {...rest} rel="noopener noreferrer" target="_blank">
				{children} <LuExternalLink />
			</Link>
		);
	} else {
		return (
			<Link ref={ref} {...rest} focusRing="none">
				{children}
			</Link>
		);
	}
});

const CreatedLinkComponent = createLink(ChakraLinkComponent);

const CustomLink: LinkComponent<typeof ChakraLinkComponent> = (props) => {
	return (
		<CreatedLinkComponent
			_focus={{ textDecoration: "none" }}
			_hover={{ textDecoration: "none", color: "fg.muted" }}
			color="fg"
			fontSize="sm"
			fontWeight="medium"
			preload={"intent"}
			textDecoration="none"
			transition="color 0.2s"
			{...props}
		/>
	);
};

export default CustomLink;
