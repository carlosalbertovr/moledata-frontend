import { Fieldset } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { FiUser, FiUsers } from "react-icons/fi";

import RadioCardField from "../../../components/form/RadioCardField";

export const Route = createFileRoute("/signin/_layout/user-type/")({
	component: SignInUserType,
});

function SignInUserType() {
	const items = [
		{
			icon: <FiUsers />,
			value: "team",
			title: "With my team",
			description: "Companies and groups",
		},
		{
			icon: <FiUser />,
			value: "individual",
			title: "By myself",
			description: "Individuals and freelancers",
		},
	];

	return (
		<Fieldset.Root size="md">
			<Fieldset.Legend fontSize="3xl" fontWeight="semibold" lineHeight={1} maxW="25rem">
				What are you planning to use Moledata?
			</Fieldset.Legend>
			<Fieldset.HelperText>We'll fit the experience to your need. You can change it later </Fieldset.HelperText>
			<RadioCardField name="user_type" options={items} orientation="horizontal" />
		</Fieldset.Root>
	);
}
