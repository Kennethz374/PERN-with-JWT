import React from "react";

import { useGlobalContext } from "../Context";
import "../css/AddingModal.css";

const AddingModal = () => {
	const {
		handleNewbabyInfo,
		newBaby,
		toggleModal,
		onSubmitBabyForm,
		addBabyUrl,
	} = useGlobalContext();
	const { baby_name, baby_gender, baby_birthday, baby_owner_id } = newBaby;
	return (
		<div className="modal-container">
			<div className="form-center">
				<form
					onSubmit={(e) =>
						onSubmitBabyForm(
							e,
							addBabyUrl,
							baby_name,
							baby_gender,
							baby_birthday,
							baby_owner_id
						)
					}
					className="baby-form"
				>
					<input
						type="text"
						name="baby_name"
						placeholder="baby_name"
						value={baby_name}
						onChange={(e) => handleNewbabyInfo("baby_name", e.target.value)}
						className="modal_baby_name"
					/>
					<input
						type="text"
						name="baby_gender"
						placeholder="baby_gender"
						value={baby_gender}
						onChange={(e) => handleNewbabyInfo("baby_gender", e.target.value)}
						className="modal_baby_gender"
					/>
					<input
						type="text"
						name="baby_birthday"
						placeholder="baby_birthday"
						value={baby_birthday}
						onChange={(e) => handleNewbabyInfo("baby_birthday", e.target.value)}
						className="modal_baby_birthday"
					/>

					<div className="modal_footer">
						<button onClick={toggleModal}>Cancel</button>
						<button>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddingModal;
