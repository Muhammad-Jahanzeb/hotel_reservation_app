import { useContext, useState } from 'react'
import './Login.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
      username: null,
      password: null
    });

    const {loading, error, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleInput = (e) => {
        setCredentials(prev => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick = async(e) => {
      e.preventDefault()
        dispatch({ type: "LOGIN_START" });
        try{
            const result = await axios.post('/api/auth/login', credentials)
            dispatch({type:"LOGIN_SUCCESSFUL", payload: result.data})
            navigate("/")
        }
        catch(error){
          console.log("Error:  ", error)
            dispatch({type:"LOGIN_FAILED", payload: error.response.message})
        }
    }
    return (
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            className="lInput"
            onChange={handleInput}
          />
          <input
            type="password"
            placeholder="password"
            className="lInput"
            id="password"
            onChange={handleInput}
          />
          <button disabled = {loading} onClick={handleClick} className="lButton">Login</button>
          {error ?? <span>{error}</span>}
        </div>
      </div>
    );
}

export default Login
