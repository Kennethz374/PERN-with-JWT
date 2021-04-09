import React, { useEffect } from "react";
import { useGlobalContext } from "../Context";

const Dashboard = () => {
	const { getNameFromDashboard, currentUserName, logout } = useGlobalContext();

	useEffect(() => {
		getNameFromDashboard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<h1>Dashboard</h1>
			<h1>Welcome back {currentUserName}</h1>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default Dashboard;
