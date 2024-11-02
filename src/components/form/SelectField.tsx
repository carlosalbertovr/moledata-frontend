import { createListCollection } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { ICustomFormProps } from ".";
import { Field } from "../ui/field";
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";

interface ISelectFieldProps extends ICustomFormProps {
	options: Array<{
		value: string;
		label: string;
	}>;
}

export function SelectField(params: ISelectFieldProps) {
	const { name, options, placeholder, ...props } = params;

	const {
		setValue,
		getFieldState,
		watch,
		formState: { errors, isSubmitting },
	} = useFormContext();

	const frameworks = createListCollection({
		items: options,
	});

	return (
		<Field
			{...props}
			defaultValue={watch(name)}
			disabled={isSubmitting || props.disabled}
			errorText={errors[name]?.message as string}
			invalid={getFieldState(name).invalid}
		>
			<SelectRoot
				collection={frameworks}
				positioning={{ placement: "bottom", flip: false }}
				size="md"
				onValueChange={(e) => setValue(name, e.value[0])}
			>
				<SelectTrigger>
					<SelectValueText placeholder={placeholder ?? "Select"} />
				</SelectTrigger>
				<SelectContent maxH="10rem">
					{frameworks.items.map((option) => (
						<SelectItem key={option.value} item={option}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>
		</Field>
	);
}
