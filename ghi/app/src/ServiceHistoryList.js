import { useEffect, useState } from 'react';

function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };

    useEffect(()=>{
        getData()
    }, []);



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
                <th scope="col">Status</th>
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
                        <td>{appointment.status}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
    );
}

export default ServiceHistoryList;