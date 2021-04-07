import React, { useContext, useReducer } from "react";

import reducer from "./Reducer";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const initialState = {
		isAuthenticated: false,
		input: {
			user_email: "",
			user_password: "",
			user_name: "",
		},
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleAuth = () => {
		dispatch({ type: "SET_AUTHENTICATE" });
	};

	const registerInputs = (type, input) => {
		dispatch({ type: "REGISTER_INPUT", payload: { type, input } });
	};

	return (
		<AppContext.Provider value={{ ...state, handleAuth, registerInputs }}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
