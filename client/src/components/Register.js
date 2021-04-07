import React from "react";
import { useGlobalContext } from "../Context";

const Register = () => {
	const { input, registerInputs, onSubmitForm } = useGlobalContext();
	const { user_email, user_password, user_name } = input;

	// const onSubmitForm = (e) => {
	// 	e.preventDefault();
	// 	console.log("Submit");
	// };

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
					<form
						onSubmit={(e) =>
							onSubmitForm(e, user_email, user_name, user_password)
						}
						style={{ display: "flex", flexDirection: "column" }}
					>
						<input
							type="text"
							name="user_name"
							placeholder="username"
							value={user_name}
							onChange={(e) => registerInputs("user_name", e.target.value)}
						/>
						<input
							type="email"
							name="user_email"
							placeholder="email"
							value={user_email}
							onChange={(e) => registerInputs("user_email", e.target.value)}
						/>
						<input
							type="password"
							name="user_password"
							placeholder="password"
							value={user_password}
							onChange={(e) => registerInputs("user_password", e.target.value)}
						/>
						<button style={{ width: "30%" }}>Submit</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default Register;
