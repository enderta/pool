import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Card, Container, ListGroup} from 'react-bootstrap';
import MyChart from './MyChart';


const MyPolls = () => {
    const [polls, setPolls] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [questionInfo, setQuestionInfo] = useState([]);
    const [opt1, setOpt1] = useState('');
    const [opt2, setOpt2] = useState('');
    const [opt3, setOpt3] = useState('');
    const [resID1, setResID1] = useState(0)
    const [resID2, setResID2] = useState(0)
    const [resID3, setResID3] = useState(0)
    const [vote1, setVote1] = useState(0)
    const [vote2, setVote2] = useState(0)
    const [vote3, setVote3] = useState(0)
    const [selected, setSelected] = useState(false)
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const [poolId, setPoolId] = useState(0);

    const fetchPolls = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/all/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            console.log(data);
            setPolls(data);
        } catch (error) {
            console.error('Error fetching polls:', error.message);
        }
    };

    useEffect(() => {
        fetchPolls().then((r) => console.log(r));
    }, []);

    const allTitles = [...new Set(polls.map((poll) => poll.question))];

    const handleSelectChange = (e) => {
        e.preventDefault()
        setSelected(true)
        setSelectedQuestion(e.target.value);

    };

    useEffect(() => {
        if (selectedQuestion) {
            const filteredQuestionInfo = polls.filter(
                (poll) => poll.question === selectedQuestion
            );
            const resIDs = [...new Set(filteredQuestionInfo.map(x => x.response_id))]

            console.log(resIDs)
            setResID1(resIDs[0])
            setResID2(resIDs[1])
            setResID3(resIDs[2])
            setQuestionInfo(filteredQuestionInfo);
            const options = [...new Set(filteredQuestionInfo.map((poll) => poll.option))];
            setOpt1(options[0])
            setOpt2(options[1])
            setOpt3(options[2])
            const pollIDs = [...new Set(filteredQuestionInfo.map((poll) => poll.poll_id))];
            setPoolId(pollIDs[0])


            console.log(options)
        }
    }, [selectedQuestion]);

    const fetchVote1 = async () => {
        const response = await fetch(`http://localhost:5000/api/votes/count/${resID1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setVote1(data);
    };

    const fetchVote2 = async () => {
        const response = await fetch(`http://localhost:5000/api/votes/count/${resID2}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setVote2(data);
    };

    const fetchVote3 = async () => {
        const response = await fetch(`http://localhost:5000/api/votes/count/${resID3}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setVote3(data);
    };

    useEffect(() => {
        if (resID1) {
            fetchVote1();
        }
    }, [resID1]);

    useEffect(() => {
        if (resID2) {
            fetchVote2();
        }
    }, [resID2]);

    useEffect(() => {
        if (resID3) {
            fetchVote3();
        }
    }, [resID3]);

    const totalVotes = vote1 + vote2 + vote3;

    const percent1 = totalVotes === 0 ? 0 : ((vote1 / totalVotes) * 100).toFixed(2);
    const percent2 = totalVotes === 0 ? 0 : ((vote2 / totalVotes) * 100).toFixed(2);
    const percent3 = totalVotes === 0 ? 0 : ((vote3 / totalVotes) * 100).toFixed(2);


    const handlePollBtn = (e) => {
        e.preventDefault()
        localStorage.setItem("user_id", user_id)
        localStorage.setItem("response_id1", resID1);
        localStorage.setItem("response_id2", resID2);
        localStorage.setItem("response_id3", resID3);
        localStorage.setItem("pool_id", poolId);
        window.location = '/pools'
    }



        return (
            <div className="bg-dark text-light" style={{minHeight: '100vh', padding: '10px'}}>
                <div className="d-flex justify-content-between">

                    <Form.Select size="sm" style={{height:'40px',width:"200px"}} aria-label="Default select example" onChange={handleSelectChange}>
                        <option>Open this select menu</option>
                        {allTitles.map((title, index) => (
                            <option key={index} value={title}>
                                {title}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                {
                    selected ? (
                        <div className="bg-dark text-light" style={{minHeight: '100vh', padding: '10px'}}>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{backgroundColor: 'goldenrod', border: 'none'}}
                                onClick={handlePollBtn}
                            >
                                Give your vote
                            </Button>


                        <div className="container d-flex justify-content-center">

                            <Card className={'bg-dark'} >
                                <Card.Body>
                                    <Card.Title><h1 className="text-center" style={{color: 'goldenrod'}}>Question: {selectedQuestion}</h1></Card.Title>
                                        <MyChart voteopt1={vote1} voteopt2={vote2} voteopt3={vote3}
                                                 opt1={opt1} opt2={opt2} opt3={opt3}
                                                 pert1={percent1} pert2={percent2} pert3={percent3}/>
                                </Card.Body>
                            </Card>
                        </div>
                        </div>
                    ) : (
                    <div className="d-flex justify-content-center">
                    <h1 className="text-center" style={{color: 'goldenrod',margin:"20px"}}>Please select a poll</h1>
</div>
                    )
                }
            </div>
        );
    };

    export default MyPolls;

