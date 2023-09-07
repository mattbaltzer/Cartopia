import { useEffect, useState } from 'react';

function AutomobileList() {
    const [autos, setAutos] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };

    useEffect(()=>{
        getData()
    }, []);

return (
    <div>
        <h1>Automobiles</h1>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th scope="col">VIN</th>
                <th scope="col">Color</th>
                <th scope="col">Year</th>
                <th scope="col">Model</th>
                <th scope="col">Manufacturer</th>
                <th scope="col">Sold</th>
            </tr>
        </thead>
        <tbody>
            {autos.map((auto) => {
                return (
                    <tr key={auto.id}>
                        <td>{auto.vin}</td>
                        <td>{auto.color}</td>
                        <td>{auto.year}</td>
                        <td>{auto.model.name}</td>
                        <td>{auto.model.manufacturer.name}</td>
                        <td>{auto.sold}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
    );
}

export default AutomobileList