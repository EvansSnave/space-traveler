import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/navigation.css';

function NavBar() {
  return (
    <nav>
      <div className="parentcontainer300">
        <div className="container300">
          <img className="logo300" src={logo} alt="Space Travelers Hub" />
          <h1>Space Travelers Hub</h1>
        </div>
        <ul className="navlinkcontainer300">
          <li>
            <NavLink to="/" className="navlink300" activeclassname="active-link">Rockets</NavLink>
          </li>
          <li>
            <NavLink to="/missions" className="navlink300" activeclassname="active-link">Missions</NavLink>
          </li>
          <li>
            <NavLink to="/dragons" className="navlink300" activeclassname="active-link">Dragons</NavLink>
          </li>
          <span className="separator">|</span>
          <li>
            <NavLink to="/myprofile" className="navlink300" activeclassname="active-link">My Profile</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
