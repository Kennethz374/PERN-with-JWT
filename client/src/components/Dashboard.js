import React, { useEffect } from "react";
import moment from "moment";

import { useGlobalContext } from "../Context";
import "../css/Dashboard.css";
import AddingModal from "../components/AddingModal";
import BabyNav from "../components/BabyNav";
import ActivityForm from "../components/ActivityForm";

const Dashboard = () => {
	const {
		getInfoFromDashboard,
		currentUserName,
		logout,
		currentActivity,
		currentBaby,
		isModalOpen,
		toggleModal,
		deleteActivity,
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

				<BabyNav />

				<ActivityForm />

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
