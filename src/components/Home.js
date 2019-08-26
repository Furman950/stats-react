import React, { Component } from 'react';
import { Container, Row, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
    static displayName = Home.name;


    render() {
        return (
            <Container>
                <h1 className="text-center">Thank you for helping me with my final project for stats!</h1>
                <Row className="justify-content-center mt-4">
                    <Link to='/userInfo' className="text-decoration-none">
                        <Button variant="primary">Start Here</Button>
                    </Link>
                </Row>
            </Container>
        );
    }
}