import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import CreatingPool from "./CreatingPool";
import Opts from "./Opts";
import PollPage from "./PollPage";

function Pages() {
    const isLoggedIn = localStorage.getItem("token");

    return (
        <div>
            <Routes>
                {isLoggedIn ? (
                    <>

                        <Route path={"/*"} element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/create" element={<CreatingPool/>}/>
                        <Route path="/opts" element={<Opts/>}/>
                        <Route path="/pools" element={<PollPage/>}/>
                    </>
                ) : (
                    <>
                        <Route path={"/*"} element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </>
                )}
            </Routes>
        </div>
    );
}

export default Pages;