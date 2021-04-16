import React from "react";

import { useGlobalContext } from "../Context";
import "../css/AddingModal.css";

const AddingModal = () => {
	const { currentUserId, handleNewBabyInfo, newBaby } = useGlobalContext();
	const { baby_name, baby_gender, baby_birthday, baby_owner_id } = newBaby;
	return (
		<div className="modal-container">
			<form>
				<input
					type="text"
					name="baby_onwer_id"
					placeholder="baby_onwer_id"
					value={baby_owner_id}
					onChange={() => handleNewBabyInfo("baby_owner_id", currentUserId)}
					className="modal_baby_onwer_id"
				/>
				{/* invisible */}

				<input
					type="text"
					name="baby_name"
					placeholder="baby_name"
					value={baby_name}
					onChange={(e) => handleNewBabyInfo("baby_name", e.target.value)}
					className="modal_baby_name"
				/>
				<input
					type="text"
					name="baby_gender"
					placeholder="baby_gender"
					value={baby_gender}
					onChange={(e) => handleNewBabyInfo("baby_gender", e.target.value)}
					className="modal_baby_gender"
				/>
				<input
					type="text"
					name="baby_birthday"
					placeholder="baby_birthday"
					value={baby_birthday}
					onChange={(e) => handleNewBabyInfo("baby_birthday", e.target.value)}
					className="modal_baby_birthday"
				/>
			</form>
		</div>
	);
};

export default AddingModal;
