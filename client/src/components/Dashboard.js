import React, { useEffect } from "react";
import moment from "moment";

import { useGlobalContext } from "../Context";
import "../css/Dashboard.css";
import AddingModal from "../components/AddingModal";

const Dashboard = () => {
	const {
		getInfoFromDashboard,
		currentUserName,
		logout,
		babies,
		currentActivity,
		currentBaby,
		selectBaby,
		isModalOpen,
		toggleModal,
		deleteActivity,
		onSubmitActivityForm,
		addActivityUrl,
		handleActivityInfo,
		newActivity,
	} = useGlobalContext();

	useEffect(() => {
		getInfoFromDashboard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const activities = currentActivity.filter(
		(act) => act.baby_id === currentBaby
	);

	return (
		<>
			{isModalOpen && <AddingModal />}
			<div className="dashboard-container">
				<div className="dashboard-header">
					<h3>{moment().format("MMM Do YYYY")} </h3>
					<h2>{moment().format("LT")}</h2>
					<h4>Welcome back {currentUserName}</h4>
				</div>

				<div className="add-baby" onClick={toggleModal}>
					Add A Baby
				</div>

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

				<div className="dashboard-body">
					<ul className="activity-list">
						{activities.length > 0 ? (
							activities.map((act) => {
								return (
									<li className="activity-card" key={act.activity_id}>
										<p>
											{act.description} {act.amount} at {""}
											{moment(act.time).format("LT")}
										</p>
										<button onClick={() => deleteActivity(act.activity_id)}>
											Delete
										</button>
									</li>
								);
							})
						) : (
							<h3>No activity created yet, create one for now</h3>
						)}
					</ul>
				</div>

				<button className="logout-btn" onClick={logout}>
					Logout
				</button>
			</div>
		</>
	);
};

export default Dashboard;
