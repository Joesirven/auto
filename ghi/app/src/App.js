import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import VehiclesForm from './VehiclesForm';
import VehiclesList from './VehiclesList';
import AutomobilesForm from './AutomobilesForm';
import AutomobilesList from './AutomobilesList';
import TechniciansForm from './TechniciansForm';
import TechniciansList from './TechniciansList';
import AppointmentsList from './AppointmentsList';
import AppointmentsForm from './AppointmentsForm';
import ServiceHistory from './ServiceHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
            <Route path="manufacturers">
                <Route index element={<ManufacturersList />} />
                <Route path="new" element={<ManufacturerForm />} />
            </Route>
            <Route path="automobiles">
                <Route index element={<AutomobilesList />} />
                <Route path="new" element={<AutomobilesForm />} />
            </Route>
            <Route path="vehicles">
                <Route index element={<VehiclesList />} />
                <Route path="new" element={<VehiclesForm />} />
            </Route>
            <Route path="technicians">
                <Route index element={<TechniciansList />} />
                <Route path="new" element={<TechniciansForm />} />
            </Route>
            <Route path="appointments">
                <Route index element={<AppointmentsList />} />
                <Route path="new" element={<AppointmentsForm />} />
                <Route path="history" element={<ServiceHistory />} />
            </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
