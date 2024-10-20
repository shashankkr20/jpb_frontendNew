import React, { useContext } from 'react'
import './../styles/header.css'
import cuvette from './../../assets/cuvette.png'
import { MdArrowDropDown } from "react-icons/md";
import { UserContext } from './../../Usercontext/UserContext';
import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate=useNavigate()
  const { user,setUser } = useContext(UserContext);
  const handleLogout=()=>{
    
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        setUser({
          name: '',
          companyEmail: '',
        })
        navigate('/main')
  }
  return (
    <div className='headerCont'>
        <img src={cuvette} alt="" />
        <div style={{display:'flex',alignItems:"center",gap:10}}>
        <span style={{fontSize:25}}>Contact</span>
        {localStorage.getItem('authToken')?<div className='userDet'>
            <div style={{width:30,height:30,backgroundColor:"#A8A8A8",borderRadius:30}}></div>
            <span style={{}}>{user.name}</span>
            <MdArrowDropDown />
            <span onClick={handleLogout} style={{cursor:"pointer",fontSize:16,color:"red",textDecoration:'underline'}}>Logout</span>
        </div>:""}
        
        </div>
    </div>
  )
}

export default Header