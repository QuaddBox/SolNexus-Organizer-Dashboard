import './App.scss'
import {
  RouterProvider,
  createRoutesFromElements,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import DashboardRoot from "./layout/DashboardRoot";
import { AddOrganizerProfile, CreateEvent, DashboardEvents, DashboardHome, DashboardVerifyTickets, NotFoundError } from "./pages";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/organizations/" element={<DashboardRoot />}>
          <Route index path="home" element={<DashboardHome />} />
          <Route path="events" element={<DashboardEvents />}/>
          <Route path="tickets/verify" element={<DashboardVerifyTickets />} />
          
        </Route>
        <Route path='/manage/events/'>
          <Route path='create' element={<CreateEvent />} />
        </Route>
        <Route path='/organizations/info/profile' element={<AddOrganizerProfile />}/>
        <Route path='*' element={<NotFoundError />}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
