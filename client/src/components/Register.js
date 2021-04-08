import React from "react";

import { useGlobalContext } from "../Context";
import "../css/Register.css";

const Register = () => {
	const { input, handleInputs, onSubmitForm, registerUrl } = useGlobalContext();
	const { user_email, user_password, user_name } = input;

	return (
		<>
			<section className="register-container">
				<div className="reg-form-center">
					<h1 className="section-title">Register</h1>
					<form
						className="reg-form"
						onSubmit={(e) =>
							onSubmitForm(e, registerUrl, user_email, user_password, user_name)
						}
					>
						<input
							className="input-name"
							type="text"
							name="user_name"
							placeholder="username"
							value={user_name}
							onChange={(e) => handleInputs("user_name", e.target.value)}
						/>
						<input
							className="input-email"
							type="email"
							name="user_email"
							placeholder="email"
							value={user_email}
							onChange={(e) => handleInputs("user_email", e.target.value)}
						/>
						<input
							className="input-password"
							type="password"
							name="user_password"
							placeholder="password"
							value={user_password}
							onChange={(e) => handleInputs("user_password", e.target.value)}
						/>
						<button className="reg-button">Register</button>
						<button className="reg-button">Login</button>
					</form>
				</div>
			</section>
		</>
	);
};

export default Register;
