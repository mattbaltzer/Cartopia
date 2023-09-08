import { useEffect, useState } from "react";

function SalespeopleList() {
	const [salespeople, setSalespeople] = useState([]);

	const getData = async () => {
		const response = await fetch("http://localhost:8090/api/salespeople/");

		if (response.ok) {
			const data = await response.json();
			setSalespeople(data.salespeople);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="shadow p-4 mt-4">
			<h1>Salespeople</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">Employee ID</th>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
					</tr>
				</thead>
				<tbody>
					{salespeople.map((salesperson) => {
						return (
							<tr key={salesperson.id}>
								<td>{salesperson.employee_id}</td>
								<td>{salesperson.first_name}</td>
								<td>{salesperson.last_name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default SalespeopleList;
