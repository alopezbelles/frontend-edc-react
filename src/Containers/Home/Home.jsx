import React from "react";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

// STYLES AND ASSETS
import "./Home.css";
import TaskList from "../../Components/TaskList/TaskList";


function Home() {
    return(
        <Container fluid className="homeDesign">
            <Row className="row1Design">
                <Col className="col1Design"></Col>
            </Row>
            <Row>
                <TaskList></TaskList>

            </Row>
        </Container>
    )
}

export default Home;