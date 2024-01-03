import React, {useEffect, useState} from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import Logout from "./Logout";
import MyChart from "./MyChart";


function PollPage(props) {
    const [question, setQuestion] = useState('');
    const [opt1, setOpt1] = useState('');
    const [opt2, setOpt2] = useState('');
    const [opt3, setOpt3] = useState('');
    const [voteopt1, setVoteopt1] = useState(0);
    const [voteopt2, setVoteopt2] = useState(0);
    const [voteopt3, setVoteopt3] = useState(0);
    const reset = () => {
        setVoteopt1(0);
        setVoteopt2(0);
        setVoteopt3(0);
    }
    const fetchVote1 = async (response_id1) => {
        const response = await fetch(`http://localhost:5000/api/votes/count/${response_id1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        setVoteopt1(data);
    };
    const fetchVote2 = async (response_id2) => {
        const response = await fetch(`http://localhost:5000/api/votes/count/${response_id2}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        setVoteopt2(data);
    };
    const fetchVote3 = async (response_id3) => {
        const response = await fetch(`http://localhost:5000/api/votes/count/${response_id3}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        setVoteopt3(data);
    };
    const fetchQuestion = async (id) => {
        const response = await fetch(`http://localhost:5000/api/q/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        setQuestion(data.data.question);
    };

    const fetchOption1 = async (id) => {
        const response = await fetch(`http://localhost:5000/api/res/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        const option = data.data.option;
        setOpt1(option);
    };

    const fetchOption2 = async (id) => {
        const response = await fetch(`http://localhost:5000/api/res/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        const option = data.data.option;
        setOpt2(option);
    };

    const fetchOption3 = async (id) => {
        const response = await fetch(`http://localhost:5000/api/res/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            },
        });
        const data = await response.json();

        const option = data.data.option;
        setOpt3(option);
    };

    useEffect(() => {
        let poolId = localStorage.getItem('pool_id')===null ? 3 : localStorage.getItem('pool_id');
        if (poolId) {
            fetchQuestion(poolId).then(r => console.log(r));
        } else {
            console.log('Pool ID is not available');
        }
    }, []);

    useEffect(() => {
        let response_id1 = localStorage.getItem('response_id1')===null ? 7 : localStorage.getItem('response_id1');
        if (response_id1) {
            fetchOption1(response_id1).then(r => console.log(r));
        } else {
            console.log('Response ID is not available');
        }
    }, []);

    useEffect(() => {
        let response_id2 = localStorage.getItem('response_id2')===null ? 8 : localStorage.getItem('response_id2');
        if (response_id2) {
            fetchOption2(response_id2).then(r => console.log(r));
        } else {
            console.log('Response ID is not available');
        }
    }, []);

    useEffect(() => {
        let response_id3 = localStorage.getItem('response_id3')===null ? 9 : localStorage.getItem('response_id3');
        if (response_id3) {
            fetchOption3(response_id3).then(r => console.log(r));
        } else {
            console.log('Response ID is not available');
        }
    }, []);

    useEffect(() => {
        let response_id1 = localStorage.getItem('response_id1')===null ? 7 : localStorage.getItem('response_id1');
        if (response_id1) {
            fetchVote1(response_id1).then(r => console.log(r));
        } else {
            console.log('Response ID is not available');
        }
    }, []);

    useEffect(() => {
        let response_id2 = localStorage.getItem('response_id2')===null ? 8 : localStorage.getItem('response_id2');
        if (response_id2) {
            fetchVote2(response_id2).then(r => console.log(r));
        } else {
            console.log('Response ID is not available');
        }
    }, []);

    useEffect(() => {
        let response_id3 = localStorage.getItem('response_id3')===null ? 9 : localStorage.getItem('response_id3');
        if (response_id3) {
            fetchVote3(response_id3).then(r => console.log(r));
        } else {
            console.log('Response ID is not available');
        }
    }, []);


    const sendVote1 = async (response_id1) => {
        const storedResponseId = localStorage.getItem('response_id1')===null ? 7 : localStorage.getItem('response_id1');
        if (storedResponseId) {
            const response = await fetch(`http://localhost:5000/api/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    response_id: storedResponseId,
                }),
            });
            const data = await response.json();
            console.log(data);
        } else {
            console.log(`Response ID ${response_id1} not found in local storage.`);
        }
    };

    const sendVote2 = async () => {
        const storedResponseId = localStorage.getItem('response_id2')===null ? 8 : localStorage.getItem('response_id2');
        if (storedResponseId) {
            const response = await fetch(`http://localhost:5000/api/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    response_id: storedResponseId,
                }),
            });
            const data = await response.json();
            console.log(data);
        } else {
            console.log(`Response ID 2 not found in local storage.`);
        }
    };

    const sendVote3 = async (response_id3) => {
        const storedResponseId = localStorage.getItem('response_id3')===null ? 9 : localStorage.getItem('response_id3');
        if (storedResponseId) {
            const response = await fetch(`http://localhost:5000/api/votes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    response_id: storedResponseId,
                }),
            });
            const data = await response.json();
            console.log(data);
        } else {
            console.log(`Response ID ${response_id3} not found in local storage.`);
        }
    };

    const handleVote = (e) => {
        e.preventDefault();
        const name = e.target.name;
        if (name === 'opt1') {
            let response_id1 = localStorage.getItem('response_id1')===null ? 7 : localStorage.getItem('response_id1');
            if (response_id1) {
                sendVote1(response_id1).then(r => console.log(r));
            } else {
                console.log('Response ID is not available');
            }
        } else if (name === 'opt2') {
            let response_id2 = localStorage.getItem('response_id2')===null ? 8 : localStorage.getItem('response_id2');
            if (response_id2) {
                sendVote2(response_id2).then(r => console.log(r));
            } else {
                console.log('Response ID is not available');
            }
        } else if (name === 'opt3') {
            let response_id3 = localStorage.getItem('response_id3')===null ? 9 : localStorage.getItem('response_id3');
            if (response_id3) {
                sendVote3(response_id3).then(r => console.log(r));
            } else {
                console.log('Response ID is not available');
            }

        }
        window.location.reload();
    }


    const totalVotes = voteopt1 + voteopt2 + voteopt3;

    const percent1 = totalVotes === 0 ? 0 : ((voteopt1 / totalVotes) * 100).toFixed(2);
    const percent2 = totalVotes === 0 ? 0 : ((voteopt2 / totalVotes) * 100).toFixed(2);
    const percent3 = totalVotes === 0 ? 0 : ((voteopt3 / totalVotes) * 100).toFixed(2);

    return (
        <div className={'bg-dark text-light'} style={{minHeight: '100vh', padding: '20px'}}>
            <Button variant="primary" href="/login" style={{margin: '10px'}}>New Poll</Button>
            <span style={{float: 'right', marginTop: '10px'}}>
                <Button variant="success" href="/all" >Back to Polls</Button>
            </span>
            <div className="container d-flex justify-content-center">
                <Card className={'bg-dark text-light'} style={{width: '100rem', height: "30rem", margin: "10px"}}>
                    <Card.Body>
                        <Card.Title><h1 className="text-center" style={{color: 'goldenrod'}}>{question}</h1>
                        </Card.Title>
                        < ListGroup variant="flush">
                            <ListGroup.Item>
                                {opt1}
                                <Button variant="primary" onClick={handleVote} name="opt1"
                                        style={{float: 'right'}}>Vote</Button>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                {opt2}
                                <Button variant="primary" onClick={handleVote} name="opt2"
                                        style={{float: 'right'}}>Vote</Button>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                {opt3}
                                <Button variant="primary" onClick={handleVote} name="opt3"
                                        style={{float: 'right'}}>Vote</Button>

                            </ListGroup.Item>
                        </ListGroup>

                        <Button variant="danger" onClick={reset} style={{marginTop: '10px'}}>Reset</Button>
                        <span style={{float: 'right', marginTop: '10px'}}><Logout/></span>
                    </Card.Body>
                </Card>
                <div className="container d-flex justify-content-center">
                    <Card className={'bg-dark'} >
                        <Card.Body>
                            <Card.Title><h1 className="text-center" style={{color: 'goldenrod'}}>Result</h1></Card.Title>
                            <MyChart voteopt1={voteopt1} voteopt2={voteopt2} voteopt3={voteopt3}
                                     opt1={opt1} opt2={opt2} opt3={opt3}
                                     pert1={percent1} pert2={percent2} pert3={percent3}/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PollPage;