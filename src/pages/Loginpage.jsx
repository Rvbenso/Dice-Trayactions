import React from 'react';
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Login from "../components/login/login";


export default function Loginpage() {
  return (
    <div id="loginPageContainer">
      <div id="loginPageContent">
        <div id='loginPageLogic'>
          <Header/>
          <Login/>
          <Footer/>  
        </div>
      </div>  
    </div>
  )
}