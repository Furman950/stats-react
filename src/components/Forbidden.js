import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Button } from 'react-bootstrap';

export class Forbidden extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">You are not allowed to see this resource</h1>
                <Row className="justify-content-center">
                    <LinkContainer to='/'>
                        <Button variant="outline-primary">Go Home</Button>
                    </LinkContainer>
                </Row>
            </div>
        );
    }
}