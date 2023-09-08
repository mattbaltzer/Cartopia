import { useEffect, useState } from 'react';


function ServiceHistoryList() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
            setFilteredAppointments(data.appointments);
        }
    };

    useEffect(()=>{
        getData()
    }, []);



    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm === "") {
            setFilteredAppointments(appointments);
        } else {
        setFilteredAppointments(
            appointments.filter((appointment) =>
                appointment.vin.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
};

return (
    <div>
    <h1>Service History</h1>

<form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder='Search by VIN'
                    className='search-bar'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style = {{ width: '90%' }}
                />
                <button className="button" type="submit">
                    Search
                </button>
            </form>




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
            {filteredAppointments.map((appointment) => {
                const new_date = new Date(appointment.date_time);
                const date = new_date.toLocaleDateString("en-US");
                const options = { timeZone: "UTC", timeZoneName: "short", hour: "2-digit", minute: "2-digit" };
                const time = new_date.toLocaleTimeString("en-US", options);
                return (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.vip ? 'Yes': 'No'}</td>
                        <td>{appointment.customer}</td>
                        <td>{date}</td>
                        <td>{time}</td>
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