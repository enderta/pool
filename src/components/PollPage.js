import React, { useEffect, useState } from 'react';

function PollPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState(0);
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    setVotes(votes + 1);
    setVoted(true);
  };

  const handleReset = () => {
    setVotes(0);
    setVoted(false);
  };

  const getPercent = (option) => {
    if (votes === 0) {
      return 0;
    }

    return Math.round((option.votes / votes) * 100);
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
    setOptions(opt3.map((option) => option.trim().substring(1, option.length - 1)));
  };

  useEffect(() => {
    const poolId = localStorage.getItem('pool_id');
    fetchQuestion(poolId).then(r => console.log(r));
  }, []);

  useEffect(() => {
    const responseId = localStorage.getItem('response_id');
    fetchOptions(responseId).then(r => console.log(r));
  }, []);

  return (
      <div>
        <h1>{question}</h1>
        {options.map((option) => (
            <div key={option}>
              <h2>{option}</h2>
            </div>
        ))}
      </div>
  );
}

export default PollPage;