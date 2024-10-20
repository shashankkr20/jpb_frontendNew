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
          <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
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
