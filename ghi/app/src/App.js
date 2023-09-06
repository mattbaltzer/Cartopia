import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import ModelForm from './ModelForm';
import AutomobileList from './AutomobileList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>

        <Routes>
          <Route path="manufacturers/" element={<ManufacturersList />} />
        </Routes>

        <Routes>
          <Route path="manufacturers/create" element={<ManufacturerForm />} />
        </Routes>

        <Routes>
          <Route path="models/" element={<ModelsList />} />
        </Routes>

        <Routes>
          <Route path="models/create" element={<ModelForm />} />
        </Routes>

        <Routes>
          <Route path="automobiles" element={<AutomobileList />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
