import React from 'react';
import {Button} from "react-bootstrap";

const Logout = () => {
    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('pool_id');
        localStorage.removeItem('user_id');
        localStorage.removeItem('response_id');
        window.location = '/home';
    }
    return (
        <div>
        <Button className={'btn btn-success'} onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default Logout;