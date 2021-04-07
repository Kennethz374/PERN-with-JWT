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
		currentUserName: "",
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const registerUrl = "http://localhost:5000/auth/register";
	const loginUrl = "http://localhost:5000/auth/login";
	const dashboardUrl = "http://localhost:5000/dashboard/";

	const handleAuth = (boolean) => {
		dispatch({ type: "SET_AUTHENTICATE", payload: boolean });
	};

	const handleInputs = (type, input) => {
		dispatch({ type: "HANDLE_INPUT", payload: { type, input } });
	};
	const setDashboardUserName = (user_name) => {
		dispatch({ type: "SET_USERNAME", payload: user_name });
	};

	const onSubmitForm = async (
		e,
		url,
		user_email,
		user_password,
		user_name = null
	) => {
		e.preventDefault();
		const body = { user_email, user_name, user_password };
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await response.json();
			console.log(parseRes);
			if (parseRes.token) {
				localStorage.setItem("token", parseRes.token);
				handleAuth(true);
				return;
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const getNameFromDashboard = async () => {
		try {
			const response = await fetch(dashboardUrl, {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			if (parseRes.user_name) {
				setDashboardUserName(parseRes.user_name);
			}
			console.log(parseRes.user_name);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				handleAuth,
				handleInputs,
				onSubmitForm,
				registerUrl,
				loginUrl,
				getNameFromDashboard,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
