import React from 'react'
import './App.css';
import LandingPage from './screens/LandingPage/LandingPage';
import SignUpPage from './screens/SignUpPage/SignUpPage';
import LoginPage from './screens/LoginPage/LoginPage';
import MyBookings from './screens/MyBookings/MyBookings';
import ApplicationForm from './screens/ApplicationForm/ApplicationForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './screens/Admin/AdminHome'
import BookSlot from './screens/Admin/BookSlot'
import ViewSlots from './screens/Admin/ViewSlots'
import RequestStatus from './screens/Admin/RequestStatus'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  
  return (
    <BrowserRouter>

      <Header />

      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/bookings' element={<MyBookings />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/apply' element={<ApplicationForm />} />
          <Route path='/adminHome' element={<AdminHome />} />
          <Route path='/bookSlot' element={<BookSlot />} />
          <Route path='/viewSlots' element={<ViewSlots />} />
          <Route path='/requestStatus' element={<RequestStatus />} />

        </Routes>
      </main>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
