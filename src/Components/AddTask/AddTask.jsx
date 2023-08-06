import React, { useState } from "react";
import axios from "axios";


// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// STYLES AND ASSETS
import "./AddTask.css";


function AddTask() {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTaskClick = () => {
    // Realizar la llamada a la API para agregar la nueva tarea
    axios
      .post("https://backend-edc-sequelize-production.up.railway.app/tasks/addtask", {
        title: title,
        description: description,
      })
      .then((response) => {
        console.log(response.data); // Datos de la nueva tarea creada
        // Limpiar los inputs después de agregar la tarea
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <Container className="addTaskContainerDesign">
      <h2>Task Name:</h2>
      <Form.Control
        type="text"
        placeholder="Add a task name..."

        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="imputAddTaskDesign"
      />
      <h2>Description:</h2>
      <Form.Control
        type="text"
        placeholder="Add a name description..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="imputAddTaskDesign"
      />
      <Button onClick={handleAddTaskClick} className="buttonDesignAddTask">Add Task</Button>
    </Container>
  );
}


export default AddTask;