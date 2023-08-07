import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";

// STYLES AND ASSETS
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState(""); // Agregar el estado newCategory
  const [newStatus, setNewStatus] = useState(""); //
  useEffect(() => {
    axios
      .get(
        "http://backend-edc-sequelize-production.up.railway.app/tasks/getall"
      )
      .then((response) => {
        setTasks(response.data);
        setSelectedStatuses(response.data.map((task) => task.category));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCategoryChange = (event, index) => {
    const newSelectedCategories = [...selectedStatuses];
    newSelectedCategories[index] = event.target.value;
    setSelectedStatuses(newSelectedCategories);
  };

  const handleUpdateTaskClick = (task) => {
    setSelectedTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewCategory(task.category); // Establecer la categoría actual
    setNewStatus(task.status); // Establecer el estado actual
    setShowModal(true);
  };

  const handleUpdateNowClick = () => {
    const newCategoryValue = newCategory;
    const newStatusValue = newStatus;

    axios
      .put(
        "https://backend-edc-sequelize-production.up.railway.app/tasks/edittask",
        {
          id: selectedTask.id_task,
          title: newTitle,
          description: newDescription,
          status: newStatusValue,
          category: newCategoryValue
        }
      )
      .then((response) => {
        console.log(response.data);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTaskClick = (taskId) => {
    axios
      .delete(
        "https://backend-edc-sequelize-production.up.railway.app/tasks/deletetask",
        {
          data: {
            id: taskId,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const updatedTasks = tasks.filter((t) => t.id_task !== taskId);
        setTasks(updatedTasks);
        setSelectedStatuses(updatedTasks.map((t) => t.category));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="containerTaskList" id="bookingList">
      <h2>TASKS LIST:</h2>
      <Row className="row1TaskList">
        <ul className="task-list" style={{ listStyleType: "none" }}>
          {tasks.map((task, index) => (
            <li key={task.id_task}>
              <Col className="col1Tasks">Title: {task.title}</Col>
              <Col className="col2Tasks">Description: {task.description}</Col>
              <Col className="col2Tasks">Status: {task.status}</Col>
              <Col className="col2Tasks">Category: {task.category}</Col>

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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="modalTitleDesign">Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalDesign">
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={newCategory} // Usar newCategory en lugar de selectedStatuses
                onChange={(e) => setNewCategory(e.target.value)}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="studies">Studies</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newStatus} // Usar newStatus en lugar de selectedStatuses
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateNowClick}>
            Update Task
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TaskList;
