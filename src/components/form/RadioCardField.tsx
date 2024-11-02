import React from "react";

import { Icon, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { ICustomFormProps } from ".";
import { Field } from "../ui/field";
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from "../ui/radio-card";

export type RadioCardFieldItem = {
	icon: React.ReactNode;
	value: string;
	title: string;
	description: string;
};

interface IRadioCardFieldProps extends ICustomFormProps {
	options: Array<RadioCardFieldItem>;
}

function RadioCardField(props: IRadioCardFieldProps) {
	const { options, name, label, orientation } = props;

	const {
		setValue,
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
			<RadioCardRoot
				disabled={props.disabled}
				value={watch(name)}
				w="100%"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.value, { shouldValidate: true })}
			>
				{label && <RadioCardLabel>Select permission</RadioCardLabel>}
				<Stack direction={["column", null, orientation === "horizontal" ? "row" : "column", null]}>
					{options.map((item) => (
						<RadioCardItem
							key={item.value}
							description={item.description}
							icon={
								<Icon color="fg.muted" fontSize="2xl" mb="2">
									{item.icon}
								</Icon>
							}
							label={item.title}
							value={item.value}
						/>
					))}
				</Stack>
			</RadioCardRoot>
		</Field>
	);
}

export default RadioCardField;
