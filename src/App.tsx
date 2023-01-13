import React, { useState } from 'react';
import About from './about';
 //import './App.css';
 import HeaderNavBar from './navbar';
import AppRoutes from './routes/App.rotes';
import SignIn from './signIn';
import ThirdPartyapi from './thirt-party-api';


function App() {
  
  return (
     <>
       <AppRoutes/>  
     {/* <HeaderNavBar handleShow={handleVisible}/>  */}
    
      {/* <ThirdPartyapi/> */}
   {/* <About/>  */}
    </>
  );
}

export default App;
