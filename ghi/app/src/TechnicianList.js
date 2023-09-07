import { useEffect, useState } from 'react';

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    };

    useEffect(()=>{
        getData()
    }, []);

return (
    <div>
    <h1>Technicians</h1>

    <table className='table table-striped'>
        <thead>
            <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
            </tr>
        </thead>
        <tbody>
            {technicians.map((technician) => {
                return (
                    <tr key={technician.employee_id}>
                        <td>{technician.employee_id}</td>
                        <td>{technician.first_name}</td>
                        <td>{technician.last_name}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
    );
}

export default TechnicianList