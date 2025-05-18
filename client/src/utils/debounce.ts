export const debounce = (
	fn: (...args: React.ChangeEvent<HTMLInputElement>[]) => void,
	delay: number
) => {
	let timeoutId = 1;
	return (...args: React.ChangeEvent<HTMLInputElement>[]) => {
		const context = this || debounce;
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(context, [...args]), delay);
	};
};
