import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Card, ListGroup } from 'react-bootstrap';
import MyChart from './MyChart';
import Logout from './Logout';

const MyPolls = () => {
    const [polls, setPolls] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [questionInfo, setQuestionInfo] = useState([]);
    const [options, setOptions] = useState([]);
    const [votes, setVotes] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    const fetchPolls = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/all/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
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
        setSelectedQuestion(e.target.value);
    };

    useEffect(() => {
        if (selectedQuestion) {
            const filteredQuestionInfo = polls.filter(
                (poll) => poll.question === selectedQuestion
            );
            setQuestionInfo(filteredQuestionInfo);
            const options = filteredQuestionInfo.map((poll) => poll.option);
            const votes = filteredQuestionInfo.map((poll) => poll.response_id);
            setOptions(options);
            setVotes(votes);
        }
    }, [selectedQuestion]);

    const totalVotes = votes.reduce((total, vote) => total + vote, 0);
    const percentages = votes.map(
        (vote) => ((vote / totalVotes) * 100).toFixed(2)
    );

    return (
        <div>
            <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
                <option>Select a question</option>
                {allTitles.map((title, index) => (
                    <option key={index} value={title}>
                        {title}
                    </option>
                ))}
            </Form.Select>

            <div className="container d-flex justify-content-center">
                <div className="container d-flex justify-content-center">
                    <Card className={'bg-dark text-light'} style={{ width: '50rem', height: '20rem', margin: '10px' }}>
                        <Card.Body>
                            <Card.Title>
                                <h1 className="text-center" style={{ color: 'goldenrod' }}>
                                    {selectedQuestion}
                                </h1>
                            </Card.Title>
                            <MyChart
                                votes={votes}
                                options={options}
                                percentages={percentages}
                            />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MyPolls;
