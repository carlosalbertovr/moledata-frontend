import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { Checkbox, CheckboxProps } from "../ui/checkbox";

interface ICheckboxFieldProps extends CheckboxProps {
	name: string;
	label: string;
}

export function CheckboxField(params: ICheckboxFieldProps) {
	const { name, label, ...props } = params;

	const {
		register,
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<Checkbox size="sm" {...register(name)} disabled={isSubmitting} {...props}>
			<Text as="label" fontWeight="normal">
				{label}
			</Text>
		</Checkbox>
	);
}
