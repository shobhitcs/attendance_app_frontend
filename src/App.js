import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import EditProfile from './components/EditProfile';
import { useSelector } from 'react-redux';
import DashBoard from './components/Dashboard';
import { useVerifyUser } from './hooks/useVerifyUser';
import { useEffect } from 'react';


function App() {
  const user = useSelector((state) => {
    return state.users.user;
  });
  const person = useSelector((state) => {
    return state.persons.person;
  });

  const { verifystate, isVerifying } = useVerifyUser();

  useEffect(() => {
    verifystate();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* Navbar */}
        <div className="Navbar">
          {!isVerifying && <Navbar />}
        </div>

        {/* Body Content */}
        <div className="BodyContent">
          <Routes>
            <Route path="/" element={!user ? <Home /> : <DashBoard />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
