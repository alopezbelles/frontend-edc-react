import React from "react";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";

// STYLES AND ASSETS
import "./Home.css";


function Home() {
    return(
        <Container>
            <Row>
                <Col>HOLA, SOY HOME</Col>
            </Row>
        </Container>
    )
}

export default Home;