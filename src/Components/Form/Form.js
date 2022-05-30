import { useState, useEffect } from 'react';

const Form = ({props,fetchData}) => {
    
    const [tasks, setTasks] = useState([props]);
    const [inputContentValue, setInputContentValue] = useState(['']);
    const [inputPriorityValue, setInputPriorityValue] = useState('');

    const handleChangeContentValue = (event) => {
        setInputContentValue(event.target.value);
    }
    const handleChangePriorityValue = (event) => {
        setInputPriorityValue(event.target.value);
    }

    const addTask = (contentValue, priorityValue) => {
        if(contentValue !== "" && priorityValue !== ""){
            const task = {
                content: contentValue,
                priority: parseInt(priorityValue)
            }
            setTasks((previousTasks) => [...previousTasks, task]);

            fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(task)
            }).then(() => {
                console.log("new task added");
            })  
            fetchData();
            setInputContentValue("");
            setInputPriorityValue("");
        }
    }

    return (
        <div> 
            <p>Content <input onChange={handleChangeContentValue} value={inputContentValue}/> </p>
            <p>Priority <input onChange={handleChangePriorityValue} value={inputPriorityValue}/> </p>
            <button onClick={ () => addTask(inputContentValue, inputPriorityValue)}> Create task </button>
        </div>
    );
}

export default Form
