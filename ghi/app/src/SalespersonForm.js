import React, { useState } from "react";

function SalespersonForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastname] = useState("");
	const [employeeId, setEmployeeId] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.first_name = firstName;
		data.last_name = lastName;
		data.employee_id = employeeId;

		const salespersonUrl = "http://localhost:8090/api/salespeople/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(salespersonUrl, fetchConfig);
		if (response.ok) {
			const newSalesperson = await response.json();
			console.log(newSalesperson);
			setFirstName("");
			setLastname("");
			setEmployeeId("");
		}
	};

	const handleFirstNameChange = (event) => {
		const value = event.target.value;
		setFirstName(value);
	};

	const handleLastNameChange = (event) => {
		const value = event.target.value;
		setLastname(value);
	};

	const handleEmployeeIdChange = (event) => {
		const value = event.target.value;
		setEmployeeId(value);
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a Salesperson</h1>
					<form onSubmit={handleSubmit} id="create-salesperson-form">
						<div className="form-floating mb-3">
							<input
								value={firstName}
								onChange={handleFirstNameChange}
								placeholder="First Name"
								required
								type="text"
								name="first_name"
								id="first_name"
								className="form-control"
							/>
							<label htmlFor="color">First name</label>
						</div>

						<div className="form-floating mb-3">
							<input
								value={lastName}
								onChange={handleLastNameChange}
								placeholder="Last Name"
								required
								type="text"
								name="last_name"
								id="last_name"
								className="form-control"
							/>
							<label htmlFor="year">Last name</label>
						</div>

						<div className="form-floating mb-3">
							<input
								value={employeeId}
								onChange={handleEmployeeIdChange}
								placeholder="Employee ID"
								required
								type="text"
								name="employee_id"
								id="employee_id"
								className="form-control"
							/>
							<label htmlFor="vin">Employee ID</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SalespersonForm;
