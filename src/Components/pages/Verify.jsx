import React, { useEffect, useState } from 'react'
import './../styles/verify.css'
import { GoPerson } from "react-icons/go";
import { FaCircleCheck, FaPhone } from "react-icons/fa6";
import { MdEmail } from 'react-icons/md';
function Verify({formdata,onSubmit}) {
  const [mobverified,setMobileVerified]=useState(false);
  const [emailverified,setEmailVerified]=useState(false);
  const [emailsnt,setemailsnt]=useState(true)
  const [mobilesnt,setmobilesnt]=useState(true)
  const [mobile,setMobile]=useState(formdata.phone)
  const [email,setEmail]=useState(formdata.companyEmail)
  async function verifyuser (){
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/verifyuser/verify-both`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyEmail: formdata.companyEmail }),
      });
      if (response.ok) {
        alert("user verified")
        onSubmit()
      } else {
        alert('Failed to verify');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  }
  useEffect(()=>{
    if(mobverified&&emailverified)
    {
      verifyuser();
    }
  },[mobverified,emailverified])
  const handleMobileSent = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mobile-otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formdata.phone }), 
      });
      if (response.ok) {
        setMobile('')
        setmobilesnt(!mobilesnt);
        alert('OTP sent to mobile');
      } else {
        alert('Failed to send mobile OTP');
      }
    } catch (error) {
      console.error('Error sending mobile OTP:', error);
    }
  };

  const handleEmailSent = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/email-otp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formdata.companyEmail }), 
      });
      if (response.ok) {
        setEmail('')
        setemailsnt(!emailsnt)
        alert('OTP sent to email');
      } else {
        alert('Failed to send email OTP');
      }
    } catch (error) {
      console.error('Error sending email OTP:', error);
    }
  };

  const handleMobileVerify = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/mobile-otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formdata.phone, otp: mobile }), 
      });
      if (response.ok) {
        setMobileVerified(true);
        alert('Mobile verified successfully');
      } else {
        alert('Mobile OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying mobile OTP:', error);
    }
  };
  const handleEmailVerify = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/email-otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formdata.companyEmail, otp: email }),
      });
      if (response.ok) {
        setEmailVerified(true);
        alert('Email verified successfully');
      } else {
        alert('Email OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying email OTP:', error);
    }
  };
  
  return (
    <div className='verifyCont'>
    <h2>Sign Up</h2>
    <span>Verify</span>
    
    <div>
      <MdEmail/> 
      <input type="text" placeholder={emailsnt?'Enter Email':"Enter Otp sent on Email"}  readOnly={emailsnt} value={email} onChange={(e)=>setEmail(e.target.value)}/>
      {emailverified?<FaCircleCheck style={{color:"#1EB700"}}/>:""}
      </div>

    <button onClick={emailsnt?handleEmailSent:handleEmailVerify} disabled={emailverified}>{emailsnt?"Send":"Verify"}</button>
        <div><FaPhone/> 
        <input type="text" placeholder={mobilesnt?'Mobile No':"Enter Otpsent on Mobile"}  readOnly={mobilesnt} value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
        {mobverified?<FaCircleCheck style={{color:"#1EB700"}}/>:""}
        </div>
        <button onClick={mobilesnt?handleMobileSent:handleMobileVerify} disabled={mobverified}>{mobilesnt?"Send":"Verify"}</button>
    </div>
    
  )
}

export default Verify