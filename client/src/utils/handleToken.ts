
export const AddTokenToLocalStorage = (token: string) => {
	return localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
	return localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
	return localStorage.getItem("token");
};
