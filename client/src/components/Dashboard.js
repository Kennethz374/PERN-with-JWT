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
					{babies.map((baby) => {
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
					})}
				</div>

				<div className="add_act">
					<input type="text" placeholder="ex. Milk intake" />
					<input type="text" placeholder="Amt" />
					<div className="add-activity">Add</div>
				</div>

				<div className="dashboard-body">
					<ul className="activity-list">
						{activities &&
							activities.map((act) => {
								return (
									<li className="activity-card">
										<p>
											{act.description} at {moment(act.time).format("LT")}
										</p>
										<button>Delete</button>
									</li>
								);
							})}
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
