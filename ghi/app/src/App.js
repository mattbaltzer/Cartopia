import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistoryList from './ServiceHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />


          <Route path="manufacturers/" element={<ManufacturersList />} />

          <Route path="manufacturers/create" element={<ManufacturerForm />} />

          <Route path="models/" element={<ModelsList />} />

          <Route path="models/create" element={<ModelForm />} />

          <Route path="automobiles" element={<AutomobileList />} />

          <Route path="automobiles/create" element={<AutomobileForm />} />

          <Route path="technicians/" element={<TechnicianList />} />

          <Route path="technicians/create" element={<TechnicianForm />} />

          <Route path="appointments/create" element={<AppointmentForm />} />

          <Route path="appointments/" element={<AppointmentList />} />

          <Route path="history/" element={<ServiceHistoryList />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
