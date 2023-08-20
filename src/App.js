import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './styles/App.css';
import NavBar from './components/navigation';
import Missions from './pages/missions';
import MyProfile from './pages/myProfile';
import Rockets from './pages/rockets';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dragons from './pages/dragons';

function App() {
  return (
    <Router basename="/Space-Travelers-Hub">
      <NavBar />
      <Routes>
        <Route path="/" element={<Rockets />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/dragons" element={<Dragons />} />
      </Routes>
    </Router>
  );
}

export default App;
