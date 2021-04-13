import React, { useEffect } from "react";
import moment from "moment";
import { useGlobalContext } from "../Context";
import "../css/Dashboard.css";
const Dashboard = () => {
	const { getNameFromDashboard, currentUserName, logout } = useGlobalContext();

	useEffect(() => {
		getNameFromDashboard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h3>{moment().format("MMM Do YYYY")} </h3>
				<h2>{moment().format("LT")}</h2>
				<h4>Welcome back {currentUserName}</h4>
			</div>

			<div className="dashboard-body">
				<ul className="activity-list">
					<li className="activity-card">
						<p>Drink Milk 220 ml</p>
						<button>edit</button>
					</li>
					<li className="activity-card">
						<p>Drink Milk 220 ml</p>
						<button>edit</button>
					</li>
					<li className="activity-card">
						<p>Drink Milk 220 ml</p>
						<button>edit</button>
					</li>
				</ul>
			</div>

			<button className="logout-btn" onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default Dashboard;
