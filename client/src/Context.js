import React, { useContext, useReducer } from "react";

import reducer from "./Reducer";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const initialState = {
		isAuthenticated: "loading",
		isLoading: false,
		isModalOpen: false,
		input: {
			user_email: "",
			user_password: "",
			user_name: "",
		},
		currentUserName: "",
		currentUserId: "",
		currentBaby: "",
		currentActivity: [],
		babies: [],
		newBaby: {
			baby_id: "",
			baby_name: "",
			baby_gender: "",
			baby_birthday: "",
			baby_owner_id: "",
		},
		newActivity: {
			activity_id: "",
			description: "",
			amount: "",
			time: "",
			activity_owner_id: "",
		},
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	// API END POINTS
	const registerUrl = "http://localhost:5000/auth/register";
	const loginUrl = "http://localhost:5000/auth/login";
	const dashboardUrl = "http://localhost:5000/dashboard/";
	const verifyUrl = "http://localhost:5000/auth/verify";
	const addBabyUrl = "http://localhost:5000/baby/create";
	const deleteActivityUrl = "http://localhost:5000/activity/delete";

	// HELPER FUNCTIONS
	const handleAuth = (boolean) => {
		dispatch({ type: "SET_AUTHENTICATE", payload: boolean });
	};

	const toggleModal = () => {
		dispatch({ type: "TOGGLE_MODAL" });
	};

	const setIsLoading = (boolean) => {
		dispatch({ type: "SET_LOADING", payload: boolean });
	};

	const handleInputs = (type, input) => {
		dispatch({ type: "HANDLE_INPUT", payload: { type, input } });
	};

	const handleNewbabyInfo = (type, info) => {
		dispatch({ type: "HANDLE_BABY_INFO", payload: { type, info } });
	};

	const setDashboardInfo = (info) => {
		dispatch({ type: "SET_INFO", payload: info });
	};

	const selectBaby = (id) => {
		dispatch({ type: "TOGGLE_BABY", payload: id });
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
			// if (parseRes.babies[0].user_name) {
			setDashboardInfo(parseRes);
			// }
			console.log(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	};

	const deleteActivity = async (activity_id) => {
		const body = { activity_id };
		try {
			const response = await fetch(deleteActivityUrl, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					// 	token: localStorage.token,
				},
				body: JSON.stringify(body),
			});
			// const parseRes = await response.json();
			window.location.replace("http://localhost:3000/dashboard");
			console.log("deleted", activity_id);
		} catch (err) {
			console.error(err.message);
		}
	};

	const onSubmitBabyForm = async (
		e,
		url,
		baby_name,
		baby_gender,
		baby_birthday,
		baby_owner_id
	) => {
		e.preventDefault();

		const body = { baby_name, baby_gender, baby_birthday, baby_owner_id };
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			const parseRes = await response.json();
			window.location.replace("http://localhost:3000/dashboard");
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
			// setIsLoading(true);
			const response = await fetch(verifyUrl, {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			parseRes === true ? handleAuth(true) : handleAuth(false);
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
				onSubmitBabyForm,
				getInfoFromDashboard,
				logout,
				verifyAuth,
				setIsLoading,
				selectBaby,
				handleNewbabyInfo,
				toggleModal,
				registerUrl,
				loginUrl,
				addBabyUrl,
				deleteActivity,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
