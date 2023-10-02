import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './styles/App.css';
import NavBar from './components/navigation';
import Missions from './pages/missions';
import MyProfile from './pages/myProfile';
import Rockets from './pages/rockets';
import Dragons from './pages/dragon';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router basename="/EvansSnave">
      <NavBar />
      <Routes>
        <Route path="/space-traveler" element={<Rockets />} />
        <Route path="/dragons" element={<Dragons />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
