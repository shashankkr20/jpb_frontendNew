import React, { useState } from 'react';
import './../styles/signup.css';
import { GoPerson } from 'react-icons/go';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineMail, MdPassword } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { FaBuildingColumns } from "react-icons/fa6";
function SignupForm({ onSubmit,login }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    companyName: '',
    companyEmail: '',
    employeeSize: '',
    password: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onSubmit(formData); 
      // console.log(data); 
    } catch (error) {
      console.error('Error during signup:', error); 
    }
     
  };

  return (
    <form className='signupform' onSubmit={handleForm}>
      <h2>Sign Up</h2>
      <span>Enter Your Detail to SignUp</span>

      <div>
        <IoPerson />
        <input
          type="text"
          name="name"
          placeholder="Name"
          pattern="[A-Za-z\s]+"
          title="Name should contain only letters and spaces."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <FaPhoneAlt />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          pattern="\d{10}"
          title="Phone number should be a 10-digit number."
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        < FaBuildingColumns/>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <MdEmail />
        <input
          type="email"
          name="companyEmail"
          placeholder="Company Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address."
          value={formData.companyEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <MdPassword />
        <input
          type="password"
          name="password"
          placeholder="Password"
          pattern=".{6,}"
          title="Password must be at least 6 characters long."
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <IoIosPeople />
        <input
          type="number"
          name="employeeSize"
          placeholder="Employee Size"
          min="1"
          title="Employee size should be a number greater than 0."
          value={formData.employeeSize}
          onChange={handleChange}
          required
        />
      </div>

      

      <p>
        By clicking on proceed you will accept our{' '}
        <span>Terms</span> & <span>Conditions</span>
      </p>
      <input type="submit" value="Proceed" />
      <span onClick={()=>{login()}} style={{alignSelf:"flex-end",color:"blue",textDecoration:"underline",cursor:'pointer'}}>Login</span>
    </form>
  );
}

export default SignupForm;
