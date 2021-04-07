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

	const handleAuth = (boolean) => {
		dispatch({ type: "SET_AUTHENTICATE", payload: boolean });
	};

	const registerInputs = (type, input) => {
		dispatch({ type: "REGISTER_INPUT", payload: { type, input } });
	};

	const onSubmitForm = async (e, user_email, user_name, user_password) => {
		e.preventDefault();
		const body = { user_email, user_name, user_password };
		try {
			const response = await fetch("http://localhost:5000/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await response.json();
			console.log(parseRes);

			localStorage.setItem("token", parseRes.token);
			handleAuth(true);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<AppContext.Provider
			value={{ ...state, handleAuth, registerInputs, onSubmitForm }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
