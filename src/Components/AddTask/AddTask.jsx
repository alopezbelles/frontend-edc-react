import React, { useState } from "react";
import axios from "axios";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

// STYLES AND ASSETS
import "./AddTask.css";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleAddTaskClick = () => {
    axios
      .post(
        "https://backend-edc-sequelize-production.up.railway.app/tasks/addtask",
        {
          title: title,
          description: description,
        }
      )
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
    <Container id ="addTask" className="addTaskContainerDesign">
      <h2>Add a new Task:</h2>
      <Form.Control
        type="text"
        placeholder="Add a task name..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="imputAddTaskDesign"
      />
      <h3>Description:</h3>
      <Form.Control
        type="text"
        placeholder="Add a name description..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="imputAddTaskDesign"
      />
      <Button onClick={handleAddTaskClick} className="buttonDesignAddTask">
        Add Task
      </Button>

      {/* Mostrar el mensaje de éxito si showSuccessAlert es verdadero */}
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Su tarea ha sido añadida con éxito
        </Alert>
      )}
    </Container>
  );
}

export default AddTask;
