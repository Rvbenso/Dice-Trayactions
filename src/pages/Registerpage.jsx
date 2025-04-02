import React from "react";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Register from "../components/register/register";

export default function Registerpage() {

    return (
        <div id="registerPageContainer">
            <div id="registerPageContent">
                <div id="registerPageLogic">
                    <Header></Header>
                    <Register></Register>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    )
}