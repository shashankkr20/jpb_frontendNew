import React, { useEffect, useState } from 'react'
import Header from './Header';
import './../styles/main.css'
import SignupForm from './SignupForm';
import Verify from './Verify';
import Login from './Login';
import {  useNavigate } from 'react-router-dom';
function Main
  () {
    const navigate=useNavigate()
  const [verifytoggle, setverifyToggle] = useState(false)
  const [signuptoggle, setSignupToggle] = useState(true)
  const [logintoggle, setLoginToggle] = useState(false)
  const [formData,setFormData]=useState({
    name: '',
    phone: '',
    companyName: '',
    companyEmail: '',
    employeeSize: '',
    password: ''  
  })
  const handletogglesignup = (e) => {
    setFormData(e)
    setverifyToggle(!verifytoggle)
    setSignupToggle(!signuptoggle)
  }
  const handlelogintoggle=()=>{
    setverifyToggle(false)
    setSignupToggle(false)
    setLoginToggle(true)
  }
  useEffect(()=>{
    if(localStorage.getItem('authToken')) navigate('/');
  })
  return (
    <>
      <Header />
      <div className='mainCont'>
        <div className='left-side'>
          <p>Looking for a dynamic opportunity to grow your career? Join us and be part of an innovative team where your skills and passion are valued. We offer competitive benefits, a collaborative environment, and room to thrive. Apply today and shape the future with us!</p>
        </div>
        <div className='right-side'>
          {signuptoggle ? <SignupForm onSubmit={handletogglesignup} login={handlelogintoggle} /> : ""}
          {verifytoggle ? <Verify formdata={formData} onSubmit={handlelogintoggle}/> : ""}
          {logintoggle ? <Login /> : ""}
        </div>
      </div>
    </>
  )
}

export default Main;
