import React, { Component } from 'react';
import { Container, Jumbotron, Row, Form, FormControl, Col } from 'react-bootstrap';
import { getUserInfoById } from '../services/RestService';

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
        }
    }

    componentDidMount() {
        let userId = sessionStorage.getItem("userId");
        console.log(`The userId: ${userId}`);
        getUserInfoById(userId)
            .then(res => {
                console.log(res.data);
                this.setState({
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleEmailChange = (e) => {
        console.log("SignUp::handleEmailChange()");
        console.log(e.target.value);
        this.setState({
            email: e.target.value
        })
    }

    handleFirstNameChange = (e) => {
        console.log("SignUp::handleFirstNameChange()");
        console.log(e.target.value);
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange = (e) => {
        console.log("SignUp::handleLastNameChange()");
        console.log(e.target.value);
        this.setState({
            lastName: e.target.value
        })
    }

    render() {
        return (
            <Container>
                <h2 className="text-center">User Dashboard</h2>
                <Row className="justify-content-center">
                    <Jumbotron className="col-md-6">
                        <Form.Row>
                            <Form.Group className="col-md-12">
                                <label>Email</label>
                                <FormControl
                                    required
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="mb-3">
                            <Col>
                                <label>First Name</label>
                                <FormControl
                                    required
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleFirstNameChange}
                                />
                            </Col>
                            <Col>
                                <label>Last Name</label>
                                <FormControl
                                    required
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleLastNameChange}
                                />
                            </Col>
                        </Form.Row>
                    </Jumbotron>

                </Row>
            </Container>
        );
    }
}