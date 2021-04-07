import React from "react";
import { useGlobalContext } from "../Context";

const Dashboard = () => {
	const { isAuthenticated } = useGlobalContext();
	return (
		<div>
			<h1>Dashboard pAGE</h1>
		</div>
	);
};

export default Dashboard;
