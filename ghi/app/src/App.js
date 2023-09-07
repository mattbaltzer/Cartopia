import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturersList from "./ManufacturersList";
import ManufacturerForm from "./ManufacturerForm";
import ModelsList from "./ModelsList";
import ModelForm from "./ModelForm";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import SalespersonForm from "./SalespersonForm";
import SalespeopleList from "./SalespeopleList";
import CustomersList from "./CustomerList";
import CustomerForm from "./CustomerForm";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route
						path="manufacturers/"
						element={<ManufacturersList />}
					/>
					<Route
						path="manufacturers/create"
						element={<ManufacturerForm />}
					/>
					<Route path="models/" element={<ModelsList />} />
					<Route path="models/create" element={<ModelForm />} />
					<Route path="automobiles" element={<AutomobileList />} />
					<Route
						path="automobiles/create"
						element={<AutomobileForm />}
					/>
					<Route path="salespeople" element={<SalespeopleList />} />
					<Route
						path="salespeople/create"
						element={<SalespersonForm />}
					/>
					<Route path="customers" element={<CustomersList />} />
					<Route path="customers/create" element={<CustomerForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
