import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

// STYLES AND ASSETS
import "./TaskList.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      // Realizar la solicitud HTTP al endpoint para obtener los datos
      axios.get('http://backend-edc-sequelize-production.up.railway.app/tasks/getall')
        .then(response => {
          // Actualizar el estado con los datos obtenidos
          setTasks(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
      <div className="containerTaskList">
        <h2>TASKS LIST:</h2>
        <ul style={{ listStyleType: "none" }}>
          {tasks.map(task => (
            <li key={task.id_task}>
                
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default TaskList;
