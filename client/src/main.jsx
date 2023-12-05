import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginSignup from './pages/LoginSignup.jsx'
import EmployerPage from './pages/EmployerPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import DonationPage from './pages/DonationPage.jsx'
// import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/loginsignup',
        element: <LoginSignup />
      },
      {
        path: '/employer/:employerId',
        element: <EmployerPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/results',
        element: <ResultsPage />
      },
      {
        path: '/donate',
        element: <DonationPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
