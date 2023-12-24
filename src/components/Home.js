import React from 'react';
import {Button} from "react-bootstrap";


const Home = () => {


  const onCLick = () => {
      window.location = '/create';
  }

    return (
        <div>
            <Button
            onClick={onCLick}
            >
                <h1>+</h1>
            </Button>
        </div>
    );
};

export default Home;