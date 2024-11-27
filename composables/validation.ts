interface Error {
	[key: string]: string;
}

interface Errors {
	[key: string]: Error;
}

// App global validation error holder.
const errors = ref<Errors>({});

export const useGetErrors = (): Errors => errors.value;

// Set global validation errors object.
export const useSetErrors = (errs: Errors) => (errors.value = errs);

// Check if submitted input has validation errors.
export const useHasError = (input: string): boolean =>
	Boolean(errors.value?.[input]?.[0]);

// Get submitted input first validation error.
export const useGetError = (input: string): string =>
	errors.value?.[input]?.[0];

export const useScrollToFirstError = (): void => {
	setTimeout(() => {
		const input = selectFirstElement(".v-field--error input");

		if (input) scrollToElement(input);
		else {
			const section = selectFirstElement(".validation.text-red");

			if (section) scrollToElement(section);
		}
	});
};

// Clear global validation errors object.
export const useClearErrors = (): void => {
	errors.value = {};
};

const scrollToElement = (element: HTMLElement, offset = 150): void => {
	setTimeout(() => {
		element.focus();
	});

	const y = element.getBoundingClientRect().top + window.scrollY;

	const container = document.querySelectorAll<HTMLElement>("form")[0];

	container.scroll({ top: y - offset, behavior: "smooth" });
};

const selectFirstElement = (selector: string): HTMLElement => {
	return document.querySelectorAll<HTMLElement>(selector)[0];
};
