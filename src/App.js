import { Routes, Route, Link } from "react-router-dom";
import RenderRockets from "./components/RenderRockets";
import RenderMissions from "./components/RenderMissions";
import ProfilePage from "./components/ProfilePage";
import planet from "./assets/planet.png"

function App() {
  return (
    <div className="App">
      <nav>
        <div>
          <img src={planet} />
          <h1>Space Travelers' Hub</h1>
        </div>
        <ul>
          <li><Link to="/rockets">Rockets</Link></li>
          <li><Link to="/missions">Missions</Link></li>
          <li><Link to="/myprofile">| My profile</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/rockets" element={<RenderRockets />} />
        <Route path="/missions" element={<RenderMissions />} />
        <Route path="/myprofile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
