import React, {useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";


const CreatingPool = () => {
    const [question, setQuestion] = useState('');


    const handleChanges = (e) => {
        if (e.target.name === 'question') {
            setQuestion(e.target.value);
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let user_id = localStorage.getItem('user_id') === null ? 2 : localStorage.getItem('user_id');
        console.log(user_id);

        try {
            const questionResponse = await fetch('http://localhost:5000/api/q', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    user_id: Number(user_id),
                    question: question,
                }),
            });
            if (questionResponse.status !== 200) { // Change this to the status your server sends
                throw new Error('Error creating question');
            }

            const questionData = await questionResponse.json();
            console.log(questionData)
            window.location = '/opts';
            localStorage.setItem('pool_id', questionData.data.id);
            console.log(questionData);
        } catch (error) {
            console.error("Error creating question: ", error);
        }
    };

    return (
        <div className={'bg-dark text-light'} style={{minHeight: '100vh', padding: '20px'}}>
            <Button variant="primary" href="/all" style={{margin: '10px'}}>Polls</Button>
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
                                Create Pool
                            </h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Question</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Question"
                                        name="question"
                                        value={question}
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
                                <span style={{float: 'right'}}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        style={{backgroundColor: 'goldenrod', border: 'none'}}
                                        onClick={() => {
                                            window.location = '/pools';
                                        }}
                                    >
                                        Back to Pool
                                    </Button>
                                </span>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatingPool;