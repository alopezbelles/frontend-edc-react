import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

// STYLES AND ASSETS
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    // Realizar la solicitud HTTP al endpoint para obtener los datos
    axios
      .get(
        "http://backend-edc-sequelize-production.up.railway.app/tasks/getall"
      )
      .then((response) => {
        // Actualizar el estado con los datos obtenidos
        setTasks(response.data);
        // Inicializar el estado de las selecciones de status con el status de cada tarea
        setSelectedStatuses(response.data.map((task) => task.status));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleStatusChange = (event, index) => {
    const newSelectedStatuses = [...selectedStatuses];
    newSelectedStatuses[index] = event.target.value;
    setSelectedStatuses(newSelectedStatuses);
  };

  const handleUpdateTaskClick = (task) => {
    setSelectedTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setShowModal(true);
  };

  const handleUpdateNowClick = () => {
    // Obtener el nuevo status directamente de selectedStatuses usando el índice de la tarea seleccionada
    const newStatus =
      selectedStatuses[
        tasks.findIndex((task) => task.id_task === selectedTask?.id_task)
      ];

    // Realizar la llamada a la API para actualizar la tarea
    axios
      .post(
        "https://backend-edc-sequelize-production.up.railway.app/tasks/edittask",
        {
          id: selectedTask.id_task,
          title: newTitle,
          description: newDescription,
          status: newStatus, // Usar el nuevo status obtenido anteriormente
        }
      )
      .then((response) => {
        console.log(response.data); // Mensaje de éxito
        // Cerrar la ventana emergente después de la actualización
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTaskClick = (taskId) => {
    // Realizar la llamada a la API para eliminar la tarea
    axios
      .delete(`https://backend-edc-sequelize-production.up.railway.app/tasks/deletetask/${taskId}`)
      .then((response) => {
        console.log(response.data); // Mensaje de éxito
  
        // Actualizar el estado local para reflejar la tarea eliminada
        const updatedTasks = tasks.filter((t) => t.id_task !== taskId);
        setTasks(updatedTasks);
        setSelectedStatuses(updatedTasks.map((t) => t.status));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="containerTaskList">
      <h2>TASKS LIST:</h2>
      <Row className="row1TaskList">
        <ul style={{ listStyleType: "none" }}>
          {tasks.map((task, index) => (
            <li key={task.id_task}>
              <Col className="col1Tasks">{task.title}</Col>
              <Col className="col2Tasks">{task.description}</Col>
              <Col className="col3Tasks">
                <Form.Select
                  className="formSelectDesign"
                  value={selectedStatuses[index]}
                  onChange={(event) => handleStatusChange(event, index)}
                  data-id={task.id_task}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="not completed">Not Completed</option>
                </Form.Select>
              </Col>
              <div className="buttonsDiv">
                <Button
                  className="buttonDesign"
                  data-id={task.id_task}
                  onClick={() => handleUpdateTaskClick(task)}
                >
                  Update Task
                </Button>
                <Button
                  className="buttonDesign"
                  variant="danger"
                  onClick={() => handleDeleteTaskClick(task.id_task)}
                >
                  Delete Task
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Row>

      {/* Ventana emergente para actualizar la tarea */}
      <Modal show={showModal} onHide={handleCloseModal}>
        {/* Resto del código del modal */}
      </Modal>
    </Container>
  );
}

export default TaskList;
