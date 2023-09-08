import React, { useEffect, useState } from "react";

function SalespersonHistory() {
	const [sales, setSales] = useState([]);
	const [salespeople, setSalespeople] = useState([]);
	const [salesperson, setSalesperson] = useState("");

	const fetchData = async () => {
		const url = "http://localhost:8090/api/sales/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setSales(data.sales);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.salesperson = salesperson;
		console.log(data);

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
			setSalesperson("");
		}
	};

	const handleSalespersonChange = (event) => {
		const value = event.target.value;
		setSalesperson(value);
	};

	return (
		<div className="shadow p-4 mt-4">
			<h1>Salesperson History</h1>
			<form onSubmit={handleSubmit} id="create-history-form"></form>

			<select
				value={salesperson}
				onChange={handleSalespersonChange}
				required
				name="salesperson"
				id="salesperson"
				className="form-select"
			>
				<option value="">Choose a Salesperson</option>
				{salespeople.map((salesperson) => {
					return (
						<option
							key={salesperson.employee_id}
							value={salesperson.employee_id}
						>
							{salesperson.employee_id}
						</option>
					);
				})}
			</select>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Salesperson</th>
						<th scope="col">Customer</th>
						<th scope="col">VIN</th>
						<th scope="col">Price</th>
					</tr>
				</thead>
				<tbody>
					{sales.map((sale) => {
						return (
							<tr key={sale.salesperson.employee_id}>
								<td>{sale.salesperson.employee_id}</td>
								<td>
									{sale.salesperson.first_name}{" "}
									{sale.salesperson.last_name}
								</td>
								<td>
									{sale.customer.first_name}{" "}
									{sale.customer.last_name}
								</td>
								<td>{sale.automobile.vin}</td>
								<td>{sale.price} </td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default SalespersonHistory;
