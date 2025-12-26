import React, { useContext } from 'react'
import './Navbar.css'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">BookinApp</span>
        <div className="navItems">
          {!user?.username && (
            <div className="buttonContainer">
              <button className="navButton">Register</button>
              <button onClick = {() => navigate("/login")} className="navButton">Login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar