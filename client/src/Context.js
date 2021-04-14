import React, { useContext, useReducer } from "react";

import reducer from "./Reducer";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const initialState = {
		isAuthenticated: false,
		isLoading: false,
		input: {
			user_email: "",
			user_password: "",
			user_name: "",
		},
		currentUserName: "",
		currentBaby: "",
		babies: [],
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	// API END POINTS
	const registerUrl = "http://localhost:5000/auth/register";
	const loginUrl = "http://localhost:5000/auth/login";
	const dashboardUrl = "http://localhost:5000/dashboard/";
	const verifyUrl = "http://localhost:5000/auth/verify";

	// HELPER FUNCTIONS
	const handleAuth = (boolean) => {
		dispatch({ type: "SET_AUTHENTICATE", payload: boolean });
	};

	const setIsLoading = (boolean) => {
		dispatch({ type: "SET_LOADING", payload: boolean });
	};

	const handleInputs = (type, input) => {
		dispatch({ type: "HANDLE_INPUT", payload: { type, input } });
	};

	const setDashboardInfo = (info) => {
		dispatch({ type: "SET_INFO", payload: info });
	};

	const resetInputs = () => {
		const input = {
			user_email: "",
			user_name: "",
			user_password: "",
		};
		dispatch({ type: "RESET_INPUT", payload: { input } });
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

	const getInfoFromDashboard = async () => {
		try {
			const response = await fetch(dashboardUrl, {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			if (parseRes[0].user_name) {
				setDashboardInfo(parseRes);
			}
			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	};

	const logout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		handleAuth(false);
		resetInputs();
	};

	const verifyAuth = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(verifyUrl, {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			parseRes === true ? handleAuth(true) : handleAuth(false);
			setIsLoading(false);
		} catch (err) {
			console.error(err);
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
				getInfoFromDashboard,
				logout,
				verifyAuth,
				setIsLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
