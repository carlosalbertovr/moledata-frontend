import { Fieldset, VStack } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useFormContext } from "react-hook-form";

import { SelectField } from "../../../components/form/SelectField";
import { TextField } from "../../../components/form/TextField";
import countries from "../../../utils/countries.json";

export const Route = createFileRoute("/signin/_layout/user-register/")({
	component: SignInUserRegister,
});

function SignInUserRegister() {
	const navigator = useNavigate();
	const { watch } = useFormContext();

	const { user_type: userType } = watch();

	if (!userType) {
		navigator({
			to: "/signin/user-type",
			viewTransition: true,
		});
	}

	return (
		<Fieldset.Root size="md" width="20rem">
			<VStack align="stretch">
				<Fieldset.Legend fontSize="3xl" fontWeight="semibold">
					Let's get started
				</Fieldset.Legend>
			</VStack>
			<Fieldset.Content>
				<TextField required label="Email" name="email" type="text" />
				<TextField required label={userType === "individual" ? "Fullname" : "Team name"} name="fullname" type="text" />
				<SelectField
					required
					label="Country"
					name="country"
					options={countries.map((country) => ({
						label: country.name,
						value: country.name,
					}))}
				/>
				<TextField required label="Password" name="password" type="password" />
			</Fieldset.Content>
		</Fieldset.Root>
	);
}
