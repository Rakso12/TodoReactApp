import { useState, useEffect } from 'react';
import Form from '../Form/Form.js';
import Navbar from '../Navbar/Navbar.js';

import styles from './TaskList.module.css'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const [inputContentValue, setInputContentValue] = useState(['']);
    const [inputPriorityValue, setInputPriorityValue] = useState('');
    
    const handleChangeContentValue = (event) => {
        setInputContentValue(event.target.value);
    }
    
    const handleChangePriorityValue = (event) => {
        setInputPriorityValue(event.target.value);
    }

    const fetchData = () => {
        fetch('http://localhost:8000/tasks')
            .then(res => {
                if(res.ok !== true){
                   throw Error("Error with featching data from this source.");
                }
                return res.json();
            })
            .then(data => {
                setTasks(data);
            })
            .catch((err) => {
                //
            })
    }

    const deleteTask = (value) => {
        console.log(value.task.id);

        fetch('http://localhost:8000/tasks/'+value.task.id, {
            method: 'DELETE',
        }).then(() => {
            console.log("Task deleted successful");
            fetchData();
        })
        
        setTasks(tasks.filter(task => task !== value.task));
    }

    useEffect(() => fetchData(), []);

    return (
        <>
            <Form props={tasks} fetchData = {fetchData}></Form>  
            {
                tasks.sort( (a,b) => {return b.priority - a.priority}).map((task, index) => (
                    <div className={styles.task} key={index}>
                    <div className={styles.priority}>
                        {task.priority}
                    </div>
                    
                    <div className={styles.taskContent}> {task.content} </div>
                    
                    <button onClick={ () => deleteTask({task}) } className={styles.acceptButton}> Complete </button>
                    </div>
                ))
            }
        </>
    );
}

export default TaskList;