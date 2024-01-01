import React, {useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";

const Opts = () => {
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');

    const handleChanges = (e) => {
        if (e.target.name === 'option1') {
            setOption1(e.target.value);
        } else if (e.target.name === 'option2') {
            setOption2(e.target.value);
        } else if (e.target.name === 'option3') {
            setOption3(e.target.value);
        }
    }

    const handleSubmit1 = async (e) => {
        e.preventDefault();
        try {
            const responseResponse = await fetch('http://localhost:5000/api/res', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    poll_id:localStorage.getItem('pool_id')=== null ? 32 : localStorage.getItem('pool_id'),
                    option: option1
                }),
            });

            if (!responseResponse.ok) {
                throw new Error('Error creating response');
            }

            const responseData = await responseResponse.json();
            localStorage.setItem('response_id1', responseData.data.id);
            window.location = '/pools';
        } catch (error) {
            console.error("Error creating response: ", error);
        }
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const responseResponse = await fetch('http://localhost:5000/api/res', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    poll_id:localStorage.getItem('pool_id')=== null ? 32 : localStorage.getItem('pool_id'),
                    option:  option2
                }),
            });

            if (!responseResponse.ok) {
                throw new Error('Error creating response');
            }

            const responseData = await responseResponse.json();
            localStorage.setItem('response_id2', responseData.data.id);
            window.location = '/pools';
        } catch (error) {
            console.error("Error creating response: ", error);
        }
    };

    const handleSubmit3= async (e) => {
        e.preventDefault();
        try {
            const responseResponse = await fetch('http://localhost:5000/api/res', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    poll_id:localStorage.getItem('pool_id')=== null ? 32 : localStorage.getItem('pool_id'),
                    option: option3
                }),
            });

            if (!responseResponse.ok) {
                throw new Error('Error creating response');
            }

            const responseData = await responseResponse.json();
            localStorage.setItem('response_id3', responseData.data.id);
            window.location = '/pools';
        } catch (error) {
            console.error("Error creating response: ", error);
        }
    };

    return (
        <div className={'bg-dark text-light'} style={{minHeight: '100vh', padding: '10px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Card
                            className={'bg-dark text-light'}
                            style={{margin: '10px', padding: '10px', opacity: '0.9'}}
                        >
                            <h1
                                className="text-center"
                                style={{color: 'goldenrod'}}
                            >
                                Create Options
                            </h1>
                            <Form onSubmit={(e) => {handleSubmit1(e); handleSubmit2(e); handleSubmit3(e);}}>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Option 1</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Option 1"
                                        name="option1"
                                        value={option1}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Option 2</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Option 2"
                                        name="option2"
                                        value={option2}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Option 3</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Option 3"
                                        name="option3"
                                        value={option3}
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <br/>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{backgroundColor: 'goldenrod', border: 'none'}}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opts;