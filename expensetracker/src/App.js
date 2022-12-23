import React, { useContext } from 'react';
import './App.css';
import MainNavigation from './components/MainNavigation';
import Login from './pages/Login';
import Home from './pages/Home';
import { Routes, Route,Navigate, Outlet } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import Product from './pages/Product';
import loginContext from './store/login-context';
import { ProfileContextProvider } from './store/profile-context';
import Expenses from './pages/Expenses';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const loginCtx = useContext(loginContext);

  return (
    <React.Fragment>
      <MainNavigation />
      <Routes>
        <Route path='/' exact element={<Navigate replace to='/home' />} />
        <Route path='/home' element={<Home />} />

        {loginCtx.isLoggedIn ? (
          <Route path='/expenses' element={<Expenses />} />
        ) : (
          <Route path='/expenses' element={<Navigate replace to='/login' />} />
        )}

        <Route path='/about' element={<About />} />

        {loginCtx.isLoggedIn ? (
         <Route
         path='/profile'
         element={
           <ProfileContextProvider>
             <UserProfile />
           </ProfileContextProvider>
         }
       />
        ) : (
          <Route path='/profile' element={<Navigate replace to='/login' />} />
        )}

        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
