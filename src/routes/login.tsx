import { useEffect } from "react";

import { Fieldset, Flex, HStack, Separator, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { AuthError, signIn } from "aws-amplify/auth";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

import CustomLink from "../components/common/CustomLink";
import { CheckboxField } from "../components/form/CheckboxField";
import { TextField } from "../components/form/TextField";
import { Button } from "../components/ui/button";
import { toaster } from "../components/ui/toaster";
import { getMyProfile } from "../services/users";
import { useUserStore } from "../store/user";
import { UserLoginValidationSchema, userLoginSchema } from "../validations/login-validation";

export const Route = createFileRoute("/login")({
	component: LoginView,
	beforeLoad: async ({ context }) => {
		const { isAuthenticated } = context.user;

		if (isAuthenticated) {
			throw redirect({
				to: "/settings",
			});
		}
	},
});

function LoginView() {
	const navigator = useNavigate();
	const methods = useForm<UserLoginValidationSchema>({
		resolver: yupResolver(userLoginSchema),
		mode: "onChange",
	});
	const { signIn: addUser, currentUser } = useUserStore();

	useEffect(() => {
		if (currentUser) {
			navigator({
				to: "/settings/home",
				viewTransition: true,
			});
		}
	}, [currentUser]);

	async function onSubmit(data: UserLoginValidationSchema) {
		try {
			const response = await signIn({
				username: data.email,
				password: data.password,
			});

			if (response.isSignedIn) {
				const { data: currentUser } = await getMyProfile();

				addUser(currentUser);

				toaster.create({
					description: `You are now logged in as ${currentUser.email}`,
					type: "success",
				});
			}
		} catch (error) {
			if (error instanceof AuthError) {
				switch (error.name) {
					case "NotAuthorizedException": {
						toaster.create({
							title: "Error",
							description: error.message,
							type: "error",
						});

						return;
					}
					default: {
						toaster.create({ title: "Error", description: "An error ocurred", type: "error" });

						return;
					}
				}
			}
		}
	}

	return (
		<Flex alignItems="center" h="100%" justifyContent="center">
			<form noValidate id="login" onSubmit={methods.handleSubmit(onSubmit)}>
				<FormProvider {...methods}>
					<Fieldset.Root size="md" width="20rem">
						<Stack gap={4}>
							<Fieldset.Legend fontSize="3xl" fontWeight="semibold">
								Log in
							</Fieldset.Legend>
							<Fieldset.HelperText>Hi, welcome back 👋</Fieldset.HelperText>
							<Button variant="outline">
								<FcGoogle /> Continue with Google
							</Button>
							<HStack>
								<Separator />
								<Text color="fg.subtle" flexShrink="0" fontSize="sm">
									Or log in with email
								</Text>
								<Separator />
							</HStack>
						</Stack>
						<Fieldset.Content>
							<TextField required label="Email" name="email" type="text" />
							<TextField required label="Password" name="password" type="password" />
							<HStack justifyContent="space-between">
								<CheckboxField label="Remember me" name="remember_me" />
								<CustomLink to="/forgot-password">Forgot password?</CustomLink>
							</HStack>
						</Fieldset.Content>

						<Button
							colorScheme="blue"
							disabled={!methods.formState.isValid}
							form="login"
							loading={methods.formState.isSubmitting}
							type="submit"
						>
							Log in
						</Button>
						<Flex justifyContent="center">
							<Text fontSize="sm">
								Don't have an account? <CustomLink to="/signin">Sing in</CustomLink>
							</Text>
						</Flex>
					</Fieldset.Root>
				</FormProvider>
			</form>
		</Flex>
	);
}
