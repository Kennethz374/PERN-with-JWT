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

	if (action.type === "HANDLE_BABY_INFO") {
		const { type, info } = action.payload;
		if (type === "baby_name") {
			return { ...state, newBaby: { ...state.newBaby, baby_name: info } };
		}
		if (type === "baby_gender") {
			return { ...state, newBaby: { ...state.newBaby, baby_gender: info } };
		}
		if (type === "baby_birthday") {
			return { ...state, newBaby: { ...state.newBaby, baby_birthday: info } };
		}
		if (type === "baby_owner_id") {
			return { ...state, newBaby: { ...state.newBaby, baby_owner_id: info } };
		}
	}

	if (action.type === "SET_INFO") {
		const { babies, babyActivities } = action.payload;
		return {
			...state,
			currentUserName: babies[0].user_name,
			currentUserId: babies[0].user_id,
			babies: babies,
			currentBaby: babies[0].baby_id,
			currentActivity: babyActivities,
		};
	}

	if (action.type === "RESET_INPUT") {
		const { user_email, user_name, user_password } = action.payload;

		return {
			...state,
			input: {
				...state.input,
				user_email: user_email,
				user_name: user_name,
				user_password: user_password,
			},
		};
	}

	if (action.type === "TOGGLE_BABY") {
		return { ...state, currentBaby: action.payload };
	}

	if (action.type === "SET_LOADING") {
		return { ...state, isLoading: action.payload };
	}

	return { ...state };
};

export default Reducer;
