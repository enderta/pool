import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';

const MyPolls = () => {

    const [polls, setPolls] = useState([]);

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const fetchPolls=async ()=>{
        const res = await fetch(`http://localhost:5000/api/all/${user_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
        });
        const data = await res.json();
        console.log(data);
        setPolls(data);

    }
    useEffect(() => {
        fetchPolls().then(r => console.log(r));
    }, []);
   const allTitles = [...new Set(polls.map(poll => poll.question))]
    console.log(allTitles)
    console.log(polls.filter(poll => poll.question === allTitles[0]))
    return (
        <div>

            <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                {allTitles.map(title => <option value={title}>{title}</option>)}
            </Form.Select>

        </div>
    );
};

export default MyPolls;