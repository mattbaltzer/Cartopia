import React, { useEffect, useState } from "react";

function RecordSaleForm() {
	const [sales, setSales] = useState([]);
	const [vin, setVin] = useState("");
	const [salesperson, setSalesperson] = useState("");
	const [customer, setCustomer] = useState("");
	const [price, setPrice] = useState(0);

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
		data.vin = vin;
		data.salesperson = salesperson;
		data.customer = customer;
		data.price = price;
		console.log(data);

		const recordsaleUrl = "http://localhost:8090/api/sales/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(recordsaleUrl, fetchConfig);
		if (response.ok) {
			const newRecordedSale = await response.json();
			console.log(newRecordedSale);
			setVin("");
			setSalesperson("");
			setCustomer("");
		}
	};

	const handleVinChange = (event) => {
		const value = event.target.value;
		setVin(value);
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
							<select
								value={vin}
								onChange={handleVinChange}
								required
								name="vin"
								id="vin"
								className="form-select"
							>
								<option value="">
									Choose an automobile VIN
								</option>
								{sales.map((sale) => {
									return (
										<option
											key={sale.automobile.id}
											value={sale.automobile.id}
										>
											{sale.automobile.vin}
										</option>
									);
								})}
							</select>
						</div>

						<div className="mb-3">
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
									return (
										<option
											key={sale.salesperson.employee_id}
											value={sale.salesperson.employee_id}
										>
											{sale.salesperson.name}
										</option>
									);
								})}
							</select>
						</div>

						<div className="mb-3">
							<select
								value={customer}
								onChange={handleCustomerChange}
								required
								name="customer"
								id="customer"
								className="form-select"
							>
								<option value="">Choose a customer</option>
								{sales.map((sale) => {
									return (
										<option
											key={sale.customer.id}
											value={sale.customer.id}
										>
											{sale.customer.name}
										</option>
									);
								})}
							</select>
						</div>

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
							<label htmlFor="price">Price</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default RecordSaleForm;
