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
	}

	if (action.type === "HANDLE_ACTIVITY_INFO") {
		const { type, info } = action.payload;
		if (type === "description") {
			return {
				...state,
				newActivity: { ...state.newActivity, description: info },
			};
		}
		if (type === "amount") {
			return { ...state, newActivity: { ...state.newActivity, amount: info } };
		}
	}

	if (action.type === "SET_INFO") {
		const { babies, babyActivities, user_id } = action.payload;

		if (babies.length === 0) {
			return {
				...state,
				newBaby: {
					...state.newBaby,
					baby_owner_id: user_id,
				},
			};
		}
		return {
			...state,
			currentUserName: babies[0].user_name,
			currentUserId: user_id,
			babies: babies,
			currentBaby: babies[0].baby_id,
			currentActivity: babyActivities || null,
			newBaby: {
				...state.newBaby,
				baby_owner_id: user_id,
			},
			newActivity: {
				...state.newActivity,
				activity_owner_id: babies[0].baby_id,
			},
		};
	}

	if (action.type === "RESET_INPUT") {
		return { ...state, input: action.payload };
	}

	if (action.type === "TOGGLE_BABY") {
		return {
			...state,
			currentBaby: action.payload,
			newActivity: { ...state.newActivity, activity_owner_id: action.payload },
		};
	}

	if (action.type === "TOGGLE_MODAL") {
		return { ...state, isModalOpen: !state.isModalOpen };
	}

	if (action.type === "SET_LOADING") {
		return { ...state, isLoading: action.payload };
	}

	return { ...state };
};

export default Reducer;
