import React from "react";

import { Box, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";

import api from "../../api";
import CustomLink from "../../components/common/CustomLink";
import SimpleDialog from "../../components/common/SimpleDialog";
import { Button } from "../../components/ui/button";
import { useCustomDialogDisclosure } from "../../hooks/useCustomDialogDisclosure";
import { UserCreateInput } from "../../types/users";
import { UserSigninValidationSchema, userSigninSchema } from "../../validations/signin-validation";

export const Route = createFileRoute("/signin/_layout")({
	component: SignInLayout,
});

function SignInLayout() {
	const { pathname } = useLocation();
	const methods = useForm<UserSigninValidationSchema>({
		resolver: yupResolver(userSigninSchema),
		mode: "onChange",
	});

	const { mutateAsync: createUserMutation } = api.users.createUserMutation();

	const { watch, handleSubmit, formState } = methods;
	const { user_type: userType } = watch();

	const { disclosureSimpleDialogProps, setDisclosureSimpleActionModalProps } = useCustomDialogDisclosure();

	async function onSubmit(data: UserSigninValidationSchema) {
		const input: UserCreateInput = data;

		await createUserMutation(input, {
			onSuccess: () => {
				setDisclosureSimpleActionModalProps({
					title: "Your accound have been created",
					// eslint-disable-next-line max-len
					body: "You can now log in and start exploring our platform. If you need any assistance, feel free to reach out to our support team",
					dialogType: "success",
					open: true,
					buttons: [
						{
							label: "Go to login",
							variant: "solid",
							navigateTo: "/login",
						},
					],
				});
			},
		});
	}

	const isRegistrationView = pathname.includes("user-register");

	return (
		<React.Fragment>
			<Flex alignItems="center" h="100%" justifyContent="center">
				<FormProvider {...methods}>
					<form noValidate id="login" onSubmit={handleSubmit(onSubmit)}>
						<Outlet />
						<Box mt={6}>
							{isRegistrationView ? (
								<Button
									disabled={!formState.isValid}
									loading={formState.isSubmitting}
									loadingText="Creating user"
									type="submit"
									w="100%"
								>
									Create user
								</Button>
							) : (
								<CustomLink to="/signin/user-register" w="100%">
									<Button disabled={!userType} w="100%">
										Continue
									</Button>
								</CustomLink>
							)}
						</Box>
					</form>
				</FormProvider>
			</Flex>
			<SimpleDialog {...disclosureSimpleDialogProps} />
		</React.Fragment>
	);
}
