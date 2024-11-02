import { Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { ICustomFormProps } from ".";
import { Field } from "../ui/field";

interface ITextFieldProps extends ICustomFormProps {
	type: string;
}

export function TextField(params: ITextFieldProps) {
	const { name, ...props } = params;

	const {
		register,
		getFieldState,
		watch,
		formState: { errors, isSubmitting },
	} = useFormContext();

	return (
		<Field
			{...props}
			defaultValue={watch(name)}
			disabled={isSubmitting || props.disabled}
			errorText={errors[name]?.message as string}
			invalid={getFieldState(name).invalid}
		>
			<Input type={props.type} {...register(name)} />
		</Field>
	);
}
