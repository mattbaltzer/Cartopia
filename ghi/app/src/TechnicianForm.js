import React, { useState } from "react";

function TechnicianForm() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [employee_id, setEmployeeId] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = first_name;
        data.last_name = last_name;
        data.employee_id = employee_id;

        const TechnicianUrl = "http://localhost:8080/api/technicians/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };

        const response = await fetch(TechnicianUrl, fetchConfig);
        if (response.ok) {

            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    };

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
      };

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
      };

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
      };

      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a Technician</h1>
              <form onSubmit={handleSubmit} id="create-technician-form">

                <div className="form-floating mb-3">
                  <input
                    value={first_name}
                    onChange={handleFirstNameChange}
                    placeholder="First Name"
                    required
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                  />
                  <label htmlFor="first_name">First name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={last_name}
                    onChange={handleLastNameChange}
                    placeholder="Last Name"
                    required
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                  />
                  <label htmlFor="last_name">Last name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={employee_id}
                    onChange={handleEmployeeIdChange}
                    placeholder="Employee ID"
                    required
                    type="text"
                    name="employee_id"
                    id="employee_id"
                    className="form-control"
                  />
                  <label htmlFor="employee_id">Employee ID</label>
                </div>


                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }


export default TechnicianForm;


