import { useEffect, useState } from "react";

function CustomersList() {
	const [customers, setCustomers] = useState([]);

	const getData = async () => {
		const response = await fetch("http://localhost:8090/api/customers/");

		if (response.ok) {
			const data = await response.json();
			setCustomers(data.customers);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th scope="col">First Name</th>
						<th scope="col">Last Name</th>
						<th scope="col">Phone Number</th>
						<th scope="col">Address</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer) => {
						return (
							<tr key={customer.id}>
								<td>{customer.first_name}</td>
								<td>{customer.last_name}</td>
								<td>{customer.phone_number}</td>
								<td>{customer.address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default CustomersList;
