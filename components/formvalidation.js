export const checkEmptyField = (formData) => {
	const result = formData.map((data) =>
		Object.values(data) == "" || Object.values(data) == []
			? Object.keys(data).join()
			: ""
	);

	const filledFormData = formData.map((data) =>
		Object.values(data) == "" || Object.values(data) == []
			? ""
			: Object.keys(data).join()
	);
	if (!filledFormData.includes("")) {
		return false;
	} else {
		return result;
	}
};

export const isValidEmail = (email) => {
	return /\S+@\S+\.\S+/.test(email);
};
