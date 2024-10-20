import React, { useContext, useState } from 'react'
import './../styles/login.css'

import { UserContext } from './../../Usercontext/UserContext';
import { useNavigate } from 'react-router-dom';

import { MdEmail, MdOutlineMail, MdPassword } from "react-icons/md";

function Login() {
  const navigate=useNavigate()
  const { setUser } = useContext(UserContext);
  const [verified,setVerified]=useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const handleLogin = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyEmail: email,
        password: password,
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('authToken', data.token);
      // console.log('Login successful:', data);
      setUser(data.user)
      localStorage.setItem('userData',JSON.stringify(data.user))
      
      navigate('/')
    } 
    else if(response.status==403){
          alert(data.message)
    }
    else {
      console.error('Login failed:', data.message);
    }
  };
  
  return (
    <div className='loginCont'>
    <h2>Log In</h2>
    <span>Verify</span>
    
    <div>
      <MdEmail/> 
      <input type="text" value={email} placeholder='Company Email' onChange={(e)=>setEmail(e.target.value)}/>
      
      </div>

    
        <div><MdPassword/> 
        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        
        </div>
        <button onClick={handleLogin} value={password} >Login</button>
    </div>
    
  )
}

export default Login
