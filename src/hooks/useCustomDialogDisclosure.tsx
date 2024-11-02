import { useState } from "react";

import type { ISimpleDialogProps } from "../components/common/SimpleDialog";

type UseCustomDisclosureSimpleDialog = Partial<ISimpleDialogProps>;

export function useCustomDialogDisclosure(props?: UseCustomDisclosureSimpleDialog) {
	const onOpenChange = (): void => setDisclosureSimpleDialogProps({ ...disclosureSimpleDialogProps, open: true });

	const onExitComplete = (): void => setDisclosureSimpleDialogProps({ ...disclosureSimpleDialogProps, open: false });

	const [disclosureSimpleDialogProps, setDisclosureSimpleDialogProps] = useState<ISimpleDialogProps>({
		title: "Dialog title",
		dialogType: "success",
		open: false,
		onExitComplete,
		...props,
	});

	const setDisclosureSimpleActionModalProps = (props: Partial<ISimpleDialogProps>) => {
		setDisclosureSimpleDialogProps({
			...disclosureSimpleDialogProps,
			...props,
		});
	};

	return { onOpenChange, onExitComplete, disclosureSimpleDialogProps, setDisclosureSimpleActionModalProps };
}
