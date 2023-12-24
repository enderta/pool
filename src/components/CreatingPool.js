import React, {useState} from 'react';

const CreatingPool = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');

    const handleChanges = (e) => {
        if (e.target.name === 'question') {
            setQuestion(e.target.value);
        } else if (e.target.name === 'answer') {
            setAnswer(e.target.value);
        } else if (e.target.name === 'option1') {
            setOption1(e.target.value);
        } else if (e.target.name === 'option2') {
            setOption2(e.target.value);
        } else if (e.target.name === 'option3') {
            setOption3(e.target.value);
        }
    }

    /*
    * const createQuestion = async (req, res) => {
    const {user_id} = req.params;
    const {question} = req.body;
    if(user_id && question) {
        const data = await qservice.createQuestion(user_id, question);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error creating question"});
    }
}
    *
    * */

    /*
    * const createRes = async (req, res) => {

    const {user_id} = req.params;
    const {option} = req.body;
    if(user_id && option) {
        const data = await resService.createResponse(user_id, option);
        res.json(data);
    }
    else {
        res.status(500).json({error: "Error creating response"});
    }
}
    * */

    const handleSubmit = async (e) => {
        e.preventDefault();


        let user_id = localStorage.getItem('user_id');

        try {
            // Call createQuestion API
            const questionResponse = await fetch('/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    question: question,
                }),
            });

            if (!questionResponse.ok) {
                throw new Error('Error creating question');
            }

            const questionData = await questionResponse.json();
            console.log(questionData);
        } catch (error) {
            console.error("Error creating question: ", error);
        }

        try {
            // Call createRes API
            const responseResponse = await fetch('/api/response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    option: [option1, option2, option3]
                }),
            });

            if (!responseResponse.ok) {
                throw new Error('Error creating response');
            }

            const responseData = await responseResponse.json();
            console.log(responseData);
        } catch (error) {
            console.error("Error creating response: ", error);
        }
    };

    return (
        <div>
        questions
        </div>
    );
};

export default CreatingPool;