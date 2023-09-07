import React, { useEffect, useState } from "react";

function AutomobileForm() {
    const [models, setModels] = useState([]);
    const [vin, setVin] = useState("");
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [model, setModel] = useState("");

    const fetchData = async () => {
		const url = "http://localhost:8100/api/models/";

		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setModels(data.models);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;
        console.log(data)

        const autosUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };

        const response = await fetch(autosUrl, fetchConfig);
        if (response.ok) {
            const newAuto = await response.json();
            console.log(newAuto)
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    };

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
      };

      const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
      };

      const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
      };

      const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
      };

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add an automobile to inventory</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">

                <div className="form-floating mb-3">
                  <input
                    value={color}
                    onChange={handleColorChange}
                    placeholder="Color"
                    required
                    type="text"
                    name="color"
                    id="color"
                    className="form-control"
                  />
                  <label htmlFor="color">Color</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={year}
                    onChange={handleYearChange}
                    placeholder="year"
                    required
                    type="text"
                    name="year"
                    id="year"
                    className="form-control"
                  />
                  <label htmlFor="year">Year</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={vin}
                    onChange={handleVinChange}
                    placeholder="vin"
                    required
                    type="text"
                    name="vin"
                    id="vin"
                    className="form-control"
                  />
                  <label htmlFor="vin">VIN</label>
                </div>

                <div className="mb-3">
							<select
								onChange={handleModelChange}
								required
								id="model"
								name="model"
								className="form-select"
								value={model}
							>
								<option value="model">Choose a model</option>
								{models.map((model) => {
									return (
										<option key={model.id} value={model.id}>
											{model.name}
										</option>
									);
								})}
								;
							</select>
						</div>



                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }


export default AutomobileForm;

