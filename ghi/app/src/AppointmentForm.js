import React, { useEffect, useState } from "react";

function AppointmentForm(props) {
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date_time, setDate] = useState("");
    const [technician, setTechnician] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const [reason, setReason] = useState("");


    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
      };

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
      };

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
      };


    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
      };


    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
      };



    const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = date_time;
        data.technician = technician;
        data.reason = reason;
        console.log(data)

        const AppointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };

        const response = await fetch(AppointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment)

            setVin('');
            setCustomer('');
            setDate('');
            setTechnician('');
            setReason('');
        }
    };


    useEffect(() => {
        fetchData();
      }, []);




      return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a service apppointment </h1>
              <form onSubmit={handleSubmit} id="create-appointment-form">

                <div className="form-floating mb-3">
                  <input
                    value={vin}
                    onChange={handleVinChange}
                    placeholder="VIN"
                    required
                    type="text"
                    name="vin"
                    id="vin"
                    className="form-control"
                  />
                  <label htmlFor="vin">VIN</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={customer}
                    onChange={handleCustomerChange}
                    placeholder="Customer"
                    required
                    type="text"
                    name="customer"
                    id="customer"
                    className="form-control"
                  />
                  <label htmlFor="customer">Customer</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    value={date_time}
                    onChange={handleDateChange}
                    placeholder="date_time"
                    required
                    type="datetime-local"
                    name="date_time"
                    id="date_time"
                    className="form-control"
                  />
                  <label htmlFor="date_time">Date & Time</label>
                </div>

                <div className="mb-3">
              <select
                value={technician}
                onChange={handleTechnicianChange}
                required
                name="technician"
                id="technician"
                className="form-select"
              >
                <option value="">Choose a technician</option>
                {technicians.map((technician) => {
                  return (
                    <option key={technician.employee_id} value={technician.employee_id}>
                      {technician.employee_id}
                    </option>
                  );
                })}
              </select>
            </div>


                <div className="form-floating mb-3">
                  <input
                    value={reason}
                    onChange={handleReasonChange}
                    placeholder="Reason"
                    required
                    type="text"
                    name="reason"
                    id="reason"
                    className="form-control"
                  />
                  <label htmlFor="reason">Reason</label>
                </div>

                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }


export default AppointmentForm;
