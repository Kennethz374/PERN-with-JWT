import { Redirect } from "react-router-dom";

const Reducer = (state, action) => {
	if (action.type === "SET_AUTHENTICATE") {
		return { ...state, isAuthenticated: !state.isAuthenticated };
	}

	if (action.type === "REGISTER_INPUT") {
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
	return { ...state };
};

export default Reducer;
