import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContextProvider from './context/context';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import SystemManager from './pages/SystemManager';
import PrivateRoutes from './components/PrivateRoutes'


function App() {


  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<Profile />} path="/Profile/:username"  />
              <Route element={<EditProfile />} path="/EditProfile/:username"  />
              <Route element={<SystemManager />} path="/SystemManager" />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App

