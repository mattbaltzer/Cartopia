import React, { useEffect, useState } from "react";

function RecordSaleForm() {
	const [sales, setSales] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [salespeople, setSalespeople] = useState([]);
	const [autos, setAutos] = useState([]);
	const [automobile, setAutomobile] = useState("");
	const [salesperson, setSalesperson] = useState("");
	const [customer, setCustomer] = useState("");
	const [price, setPrice] = useState(0);

	const getData = async () => {
		const url = "http://localhost:8090/api/customers/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setCustomers(data.customers);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const grabData = async () => {
		const url = "http://localhost:8090/api/salespeople/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setSalespeople(data.salespeople);
		}
	};

	useEffect(() => {
		grabData();
	}, []);

	const fetchData = async () => {
		const url = "http://localhost:8100/api/automobiles/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			const unsoldAutomobiles = data.autos.filter(
				(sales) => sales.sold === false
			);
			setAutos(unsoldAutomobiles);
			setAutos(data.autos);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const snatchData = async () => {
		const url = "http://localhost:8090/api/sales/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setSales(data.sales);
		}
	};

	useEffect(() => {
		snatchData();
	}, []);

	const onSale = async (vin) => {
		const updateUrl = `http://localhost:8100/api/automobiles/${vin}/`;
		const grabConfig = {
			method: "PUT",
			body: JSON.stringify({ sold: true }),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const otherResponse = await fetch(updateUrl, grabConfig);

		if (otherResponse.ok) {
			fetchData();
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.automobile = automobile;
		data.salesperson = salesperson;
		data.customer = customer;
		data.price = price;

		const recordSaleUrl = "http://localhost:8090/api/sales/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(recordSaleUrl, fetchConfig);
		if (response.ok) {
			const newRecordedSale = await response.json();
			console.log(newRecordedSale);
			setAutomobile("");
			setSalesperson("");
			setCustomer("");
			setPrice(0);
		}
	};

	const handleAutomobileChange = (event) => {
		const value = event.target.value;
		setAutomobile(value);
	};

	const handleSalespersonChange = (event) => {
		const value = event.target.value;
		setSalesperson(value);
	};

	const handleCustomerChange = (event) => {
		const value = event.target.value;
		setCustomer(value);
	};

	const handlePriceChange = (event) => {
		const value = event.target.value;
		setPrice(value);
	};

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Record a new Sale</h1>
					<form onSubmit={handleSubmit} id="create-sale-form">
						<div className="mb-3">
							<label htmlFor="automobile">Automobile VIN</label>
							<select
								value={automobile}
								onChange={handleAutomobileChange}
								required
								name="automobile"
								id="automobile"
								className="form-select"
							>
								<option value="">
									Choose an automobile VIN
								</option>
								{autos.map((automobile) => {
									return (
										<option
											key={automobile.vin}
											value={automobile.vin}
										>
											{automobile.vin}
										</option>
									);
								})}
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="salesperson">Salesperson</label>
							<select
								value={salesperson}
								onChange={handleSalespersonChange}
								required
								name="salesperson"
								id="salesperson"
								className="form-select"
							>
								<option value="">Choose a salesperson</option>
								{salespeople.map((salesperson) => {
									return (
										<option
											key={salesperson.employee_id}
											value={salesperson.employee_id}
										>
											{salesperson.first_name}{" "}
											{salesperson.last_name}
										</option>
									);
								})}
							</select>
						</div>

						<div className="mb-3">
							<label htmlFor="customer">Customer</label>
							<select
								value={customer}
								onChange={handleCustomerChange}
								required
								name="customer"
								id="customer"
								className="form-select"
							>
								<option value="">Choose a customer</option>
								{customers.map((customer) => {
									return (
										<option
											key={customer.id}
											value={customer.id}
										>
											{customer.first_name}{" "}
											{customer.last_name}
										</option>
									);
								})}
							</select>
						</div>
						<label htmlFor="price">Price</label>
						<div className="form-floating mb-3">
							<input
								value={price}
								onChange={handlePriceChange}
								placeholder="Price"
								required
								type="text"
								name="price"
								id="price"
								className="form-control"
							/>
						</div>
						<button
							className="btn btn-primary"
							onClick={() => onSale(automobile)}
						>
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RecordSaleForm;
