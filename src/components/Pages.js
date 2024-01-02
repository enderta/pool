import React from "react";
import {Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import CreatingPool from "./CreatingPool";
import Opts from "./Opts";
import PollPage from "./PollPage";
import MyPolls from "./MyPolls";

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
                        <Route path='/all' element={<MyPolls/>}/>
                    </>
                ) : (
                    <>
                        <Route path={"/*"} element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/pools" element={<PollPage/>}/>
                        <Route path='/all' element={<MyPolls/>}/>
                    </>
                )}
            </Routes>
        </div>
    );
}

export default Pages;