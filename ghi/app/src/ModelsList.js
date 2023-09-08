import { useEffect, useState } from 'react';

function ModelsList() {
    const [models, setModels] = useState([]);


    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    };

    useEffect(()=>{
        getData()
    }, []);

return (
    <div>
        <h1>Models</h1>
    <table className='table table-striped'>
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Manufacturer</th>
                <th scope="col">Picture</th>
            </tr>
        </thead>
        <tbody>
            {models.map((model) => {
                return (
                    <tr key={model.id}>
                        <td>{model.name}</td>
                        <td>{model.manufacturer.name}</td>
                        <td><img src={model.picture_url}/></td>
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
    );
}

export default ModelsList