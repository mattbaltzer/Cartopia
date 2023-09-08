import React, { useEffect, useState } from "react";

function SalespersonHistory() {
	const [sales, setSales] = useState([]);
	const [salesperson, setSalesperson] = useState("");

	const handleSalespersonChange = (event) => {
		const value = event.target.value;
		setSalesperson(value);
	};

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

	return (
		<div className="shadow p-4 mt-4">
			<h1>Salesperson History</h1>
			<select
				value={salesperson}
				onChange={handleSalespersonChange}
				required
				name="salesperson"
				id="salesperson"
				className="form-select"
			>
				<option value="">Choose a salesperson</option>
				{sales.map((sale) => {
					const salesFullName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`;
					return (
						<option
							key={sale.salesperson.employee_id}
							value={salesFullName}
						>
							{salesFullName}
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
					{sales
						.filter(
							(sale) =>
								`${sale.salesperson.first_name} ${sale.salesperson.last_name}` ===
								salesperson
						)
						.map((sale) => {
							const salespersonFullName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`;
							const customerFullName = `${sale.customer.first_name} ${sale.customer.last_name}`;
							return (
								<tr key={sale.salesperson.employee_id}>
									<td>{salespersonFullName}</td>
									<td>{customerFullName}</td>
									<td>{sale.automobile.vin}</td>
									<td>${sale.price} </td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default SalespersonHistory;
