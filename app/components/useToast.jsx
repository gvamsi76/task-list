import React from "react";
import { useSnackbar, VariantType } from "notistack";

const useToast = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const showToast = (
		variant,
		message,
		key,
		duration
	) => {
		const refId = `${key}`;
		const ref = document.getElementById(refId);
		if (ref) {
			ref.innerText = message;
		}
		const toastKey = enqueueSnackbar(<div id={refId}>{message}</div>, {
			variant: variant,
			key: key,
			persist: !!key,
			preventDuplicate: true,
			anchorOrigin: {
				horizontal: "right",
				vertical: "top",
			},
			autoHideDuration: duration || 2000,
			
		});

        return toastKey
       
	};

	const dissmisToast = (key) => {
		closeSnackbar(key);
	};

	return { showToast, dissmisToast };
};

export default useToast;
