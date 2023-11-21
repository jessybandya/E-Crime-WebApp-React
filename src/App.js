import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CompleteRegistration from './pages/CompleteRegistration';
import CompleteRegistrationAlert from './pages/CompleteRegistration/CompleteRegistrationAlert';
import CompleteResetAlert from './pages/CompleteResetAlert';
import Nopage from './pages/Nopage';
import Header from './components/Header';
import Login from './pages/Login';

function App() {
  return (
    <>
    <Header />
    <Routes>
       <Route exact path="/" element={<Home />} />
       <Route exact path="/complete-registration" element={<CompleteRegistration />} />
       <Route exact path="/complete-registration-alert" element={<CompleteRegistrationAlert />} />
       <Route exact path="/complete-reset-alert" element={<CompleteResetAlert />} />
       <Route exact path="*" element={<Nopage />} />
       <Route exact path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
