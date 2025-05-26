import { createBrowserRouter } from 'react-router-dom';
import LandLordlayout from '../layouts/landlord/LandlordLayout';
import AllBusiness from '../features/landlord/AllBusiness/AllBusiness';

const landlordRoutes = createBrowserRouter([
  {
    path: '/',
    element: <LandLordlayout />,
    children: [
      { path: 'businesses', element: <AllBusiness/> },
     
    ],
  },
]);

export default landlordRoutes;
