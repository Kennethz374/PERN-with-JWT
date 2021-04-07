const Reducer = (state, action) => {
	if (action.type === "SET_AUTHENTICATE") {
		return { ...state, isAuthenticated: action.payload };
	}

	if (action.type === "HANDLE_INPUT") {
		const { type, input } = action.payload;
		if (type === "user_name") {
			return { ...state, input: { ...state.input, user_name: input } };
		}
		if (type === "user_email") {
			return { ...state, input: { ...state.input, user_email: input } };
		}
		if (type === "user_password") {
			return { ...state, input: { ...state.input, user_password: input } };
		}
	}

	if (action.type === "SET_USERNAME") {
		return { ...state, currentUserName: action.payload };
	}
	return { ...state };
};

export default Reducer;
