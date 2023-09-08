// import React, { useState } from "react";

// function SalespersonHistory() {
// 	const [sales, setSales] = useState([]);
// 	const [sale, setSale] = useState("");

// 	const fetchData = async () => {
// 		const url = "http://localhost:8090/api/sales/";

// 		const response = await fetch(url);

// 		if (response.ok) {
// 			const data = await response.json();
// 			setSales(data.sales);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchData();
// 	}, []);

// 	// const handleSubmit = async (event) => {
// 	// 	event.preventDefault();

// 	// 	const data = {};
// 	// 	data.first_name = firstName;
// 	// 	data.last_name = lastName;
// 	// 	data.employee_id = employeeId;
// 	// 	console.log(data);

// 	// 	const salespersonUrl = "http://localhost:8090/api/salespeople/";
// 	// 	const fetchConfig = {
// 	// 		method: "post",
// 	// 		body: JSON.stringify(data),
// 	// 		headers: {
// 	// 			"Content-Type": "application/json",
// 	// 		},
// 	// 	};

// 	// 	const response = await fetch(salespersonUrl, fetchConfig);
// 	// 	if (response.ok) {
// 	// 		const newSalesperson = await response.json();
// 	// 		console.log(newSalesperson);
// 	// 		setFirstName("");
// 	// 		setLastname("");
// 	// 		setEmployeeId("");
// 	// 	}
// 	// };

// 	// const handleFirstNameChange = (event) => {
// 	// 	const value = event.target.value;
// 	// 	setFirstName(value);
// 	// };

// 	// const handleLastNameChange = (event) => {
// 	// 	const value = event.target.value;
// 	// 	setLastname(value);
// 	// };

// 	// const handleEmployeeIdChange = (event) => {
// 	// 	const value = event.target.value;
// 	// 	setEmployeeId(value);
// 	// };

// 	return (
// 		<div className="row">
// 			<div className="offset-3 col-6">
// 				<div className="shadow p-4 mt-4">
// 					<h1>Record a new Sale</h1>
// 					<form onSubmit={handleSubmit} id="create-sale-form">
// 						<div className="mb-3">
// 							<label htmlFor="automobile">Automobile VIN</label>
// 							<select
// 								value={automobile}
// 								onChange={handleAutomobileChange}
// 								required
// 								name="automobile"
// 								id="automobile"
// 								className="form-select"
// 							>
// 								<option value="">
// 									Choose an automobile VIN
// 								</option>
// 								{autos.map((automobile) => {
// 									return (
// 										<option
// 											key={automobile.vin}
// 											value={automobile.vin}
// 										>
// 											{automobile.vin}
// 										</option>
// 									);
// 								})}
// 							</select>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// // export default SalespersonHistory;
