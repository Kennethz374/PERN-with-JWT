import React from "react";
import { useGlobalContext } from "../Context";

const Register = () => {
	const { input, registerInputs } = useGlobalContext();
	const { user_email, user_password, user_name } = input;
	return (
		<>
			<section
				className="register-container"
				style={{
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					backgroundColor: "lightblue",
					height: "100vh",
				}}
			>
				<div
					className="reg-form-center"
					style={{ margin: "4rem auto", width: "80%" }}
				>
					<h1>Register</h1>
					<form style={{ display: "flex", flexDirection: "column" }}>
						<input
							type="text"
							name="name"
							placeholder="username"
							value={user_name}
							onChange={(e) => registerInputs("user_name", e.target.value)}
						/>
						<input
							type="email"
							name="email"
							placeholder="email"
							value={user_email}
							onChange={(e) => registerInputs("user_email", e.target.value)}
						/>
						<input
							type="password"
							name="password"
							placeholder="password"
							value={user_password}
							onChange={(e) => registerInputs("user_password", e.target.value)}
						/>
					</form>
					<button>Submit</button>
				</div>
			</section>
		</>
	);
};

export default Register;
