import React from "react";

const BabyNav = ({ babies, currentBaby, selectBaby }) => {
	return (
		<div className="nav-babies">
			{babies.length > 0 ? (
				babies.map((baby) => {
					return (
						<button
							className={`${
								baby.baby_gender === "Male" ? `baby-boy` : `baby-girl`
							} ${currentBaby === baby.baby_id && "selected"}`}
							key={baby.baby_id}
							onClick={() => {
								selectBaby(baby.baby_id);
							}}
						>
							{baby.baby_name}
						</button>
					);
				})
			) : (
				<h4>No baby profile created yet, create one now!</h4>
			)}
		</div>
	);
};

export default BabyNav;
