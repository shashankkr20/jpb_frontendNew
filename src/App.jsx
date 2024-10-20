import React, { useState } from 'react'
import Main from './Components/pages/Main';
import './App.css'
import Home from './Components/pages/Home';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
function App() {



  

  return (
<BrowserRouter>
<Routes>
  <Route path="*" element={<Main/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='/main' element={<Main/>}/>
</Routes>
</BrowserRouter>


  );
}







export default App