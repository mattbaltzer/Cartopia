import { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            const filteredAppointments = data.appointments.filter(
                appointment => appointment.status !== "canceled" && appointment.status !== "finished"
            );
            setAppointments(filteredAppointments);
        }
    };

    useEffect(()=>{
        getData()
    }, []);


    async function canceled_appointment(id) {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
          method: 'PUT',
        });
        if (response.ok) {
            // setAppointments(appointments.filter(appointment => appointment.id !== id));
            getData();
        }
      }


    async function finished_appointment(id) {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
          method: 'PUT',
        });
        if (response.ok) {
            // setAppointments(appointments.filter(appointment => appointment.id !== id));
            getData();
        }
      }


return (
    <div>
    <h1>Service Appointments</h1>

    <table className='table table-striped'>
        <thead>
            <tr>
                <th scope="col">VIN</th>
                <th scope="col">Is VIP?</th>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Technician</th>
                <th scope="col">Reason</th>
            </tr>
        </thead>
        <tbody>
            {appointments.map((appointment) => {
                return (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.vip ? 'Yes': 'No'}</td>
                        <td>{appointment.customer}</td>
                        <td>{appointment.date_time.slice(0,10)}</td>
                        <td>{appointment.date_time.slice(11, 16)}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => canceled_appointment(appointment.id)}>
                            Cancel
                            </button>
                            <button className="btn btn-success" onClick={() => finished_appointment(appointment.id)}>
                            Finish
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
    );
}

export default AppointmentList;