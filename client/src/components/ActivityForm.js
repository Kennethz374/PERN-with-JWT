import React from "react";
import { useGlobalContext } from "../Context";

const ActivityForm = () => {
	const {
		addActivityUrl,
		onSubmitActivityForm,
		newActivity,
		handleActivityInfo,
	} = useGlobalContext();
	return (
		<form
			className="add_act"
			onSubmit={(e) =>
				onSubmitActivityForm(
					e,
					addActivityUrl,
					newActivity.description,
					newActivity.amount,
					newActivity.activity_owner_id
				)
			}
		>
			<input
				type="text"
				placeholder="ex. Milk intake"
				onChange={(e) => handleActivityInfo("description", e.target.value)}
				value={newActivity.description}
				name="description"
			/>
			<input
				type="text"
				placeholder="Amt"
				value={newActivity.amount}
				name="amount"
				onChange={(e) => handleActivityInfo("amount", e.target.value)}
			/>
			<button className="add-activity">Add</button>
		</form>
	);
};

export default ActivityForm;
