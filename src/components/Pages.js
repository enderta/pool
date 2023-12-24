import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import CreatingPool from "./CreatingPool";

function Pages() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/*" element={<Login/>}/>
                        <Route path="/create" element={<CreatingPool/>}/>
                    </>
                ) : (
                    <>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/*" element={<Login/>}/>
                    </>
                )}
            </Routes>
        </div>
    );
}

export default Pages;