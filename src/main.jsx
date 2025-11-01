import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import SignupPage from './pages/auth/SignupPage.jsx'
import PatientDashboard from './pages/dashboard/PatientDashboard.jsx'
import DoctorDashboard from './pages/dashboard/DoctorDashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/patient-dashboard',
        element: <PatientDashboard />,
      },
      {
        path: '/doctor-dashboard',
        element: <DoctorDashboard />,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
