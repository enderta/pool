import React, { useEffect, useState } from 'react';
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

  const fetchOptions = async (id) => {
    const response = await fetch(`http://localhost:5000/api/res/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    });
    const data = await response.json();

    const options = data.data.option;
    let opt2 = options.substring(1, options.length - 1);
    let opt3 = opt2.split(",");
    setOpt1(opt3.map((option) => option.trim().substring(1, option.length - 1))[0]);
    setOpt2(opt3.map((option) => option.trim().substring(1, option.length - 1))[1]);
    setOpt3(opt3.map((option) => option.trim().substring(1, option.length - 1))[2]);
  };

  useEffect(() => {
    const poolId = localStorage.getItem('pool_id');
    if(poolId) {
      fetchQuestion(poolId).then(r => console.log(r));
    } else {
      console.log('Pool ID is not available');
    }
  }, []);

  useEffect(() => {
    const responseId = localStorage.getItem('response_id');
    if(responseId) {
      fetchOptions(responseId).then(r => console.log(r));
    } else {
      console.log('Response ID is not available');
    }
  }, []);

  const handleVote = async (e) => {
    if (e.target.name === 'opt1') {
      setVoteopt1(voteopt1 + 1);
    } else if (e.target.name === 'opt2') {
      setVoteopt2(voteopt2 + 1);
    } else if (e.target.name === 'opt3') {
      setVoteopt3(voteopt3 + 1);
    }
  }

  const totalVotes = voteopt1 + voteopt2 + voteopt3;

  const percent1 = totalVotes === 0 ? 0: ((voteopt1 / totalVotes) * 100).toFixed(2);
  const percent2 = totalVotes === 0 ? 0 : ((voteopt2 / totalVotes) * 100).toFixed(2);
  const percent3 = totalVotes === 0 ? 0 : ((voteopt3 / totalVotes) * 100).toFixed(2);

  return (
      <div className={'bg-dark text-light'} style={{minHeight: '100vh', padding: '20px'}}>
        <Button variant="primary" href="/create" style={{margin: '10px'}}>New Poll</Button>
        <div className="container d-flex justify-content-center">
          <Card className={'bg-dark text-light'} style={{width: '100rem',height:"30rem",margin:"10px"}}>
            <Card.Body >
              <Card.Title> <h1 className="text-center" style={{color: 'goldenrod'}}>{question}</h1></Card.Title>
              < ListGroup variant="flush">
              <ListGroup.Item>
                  {opt1} - {percent1}%
                  <Button variant="primary" onClick={handleVote} name="opt1" style={{float: 'right'}}>Vote</Button>
                  <Card.Text>{voteopt1} votes</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  {opt2} - {percent2}%
                  <Button variant="primary" onClick={handleVote} name="opt2" style={{float: 'right'}}>Vote</Button>
                  <Card.Text>{voteopt2} votes</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item>
                  {opt3} - {percent3}%
                  <Button variant="primary" onClick={handleVote} name="opt3" style={{float: 'right'}}>Vote</Button>
                  <Card.Text>{voteopt3} votes</Card.Text>
                </ListGroup.Item>
              </ListGroup>

              <Button variant="danger" onClick={reset} style={{marginTop: '10px'}}>Reset</Button>
              <span style={{float: 'right',marginTop: '10px'}}><Logout/></span>
            </Card.Body>
          </Card>
          <div className="container d-flex justify-content-center">
            <Card className={'bg-dark text-light'} style={{width: '50rem',height:"20rem",margin:"10px"}}>
              <Card.Body >
                <Card.Title> <h1 className="text-center" style={{color: 'goldenrod'}}>Chart</h1></Card.Title>
                <MyChart voteopt1={voteopt1} voteopt2={voteopt2} voteopt3={voteopt3}
                opt1={opt1} opt2={opt2} opt3={opt3}/>
                </Card.Body>
            </Card>
          </div>
        </div>
      </div>
  );
}

export default PollPage;