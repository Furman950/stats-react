import React, { Component } from 'react';
import { Container, Jumbotron, Row, Form, FormControl, Button, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { signUp } from '../services/RestService';

export class SignUp extends Component {
    static displayName = SignUp.name;

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            passwordHash: "",
            signedUp: false
        }
    }

    submit = (e) => {
        e.preventDefault();
        let data = this.state;
        console.log(data);

        signUp(data)
            .then(response => {
                console.log('Signed up!');
                console.log(response.data);
                sessionStorage.setItem('userId', response.data)
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', this.state.email);
                sessionStorage.setItem('passwordToken', this.state.passwordHash);
                this.setState({
                    signedUp: true
                });
            })
            .catch(error => {
                alert(error.response);
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

    handlePasswordChange = (e) => {
        console.log("SignUp::handlePassowrdChange()");
        console.log(e.target.value);
        this.setState({
            passwordHash: e.target.value
        })
    }

    render() {
        let signedUp = this.state.signedUp;

        if (signedUp) {
            return <Redirect to='/dashboard'/>
        }

        return (
            <Container>
                {signedUp ? <Redirect to='/dashboard' /> : null}
                <h3 className="text-center">Sign up</h3>
                <Row className="justify-content-center">
                    <Jumbotron className="col-md-6">
                        <Form method="Post" onSubmit={this.submit}>
                            <Form.Row>
                                <Form.Group className="col-md-12">
                                    <label>Email*</label>
                                    <FormControl
                                        required
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        onChange={this.handleEmailChange}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="mb-3">
                                <Col>
                                    <label>First Name*</label>
                                    <FormControl
                                        required
                                        name="firstName"
                                        placeholder="Enter First Name"
                                        onChange={this.handleFirstNameChange}
                                    />
                                </Col>
                                <Col>
                                    <label>Last Name*</label>
                                    <FormControl
                                        required
                                        name="lastName"
                                        placeholder="Enter Last Name"
                                        onChange={this.handleLastNameChange}
                                    />
                                </Col>
                            </Form.Row>

                            <Form.Row className="mb-3">
                                <Col>
                                    <label>Password*</label>
                                    <FormControl
                                        required
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={this.handlePasswordChange}
                                    />
                                </Col>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Button variant="primary" type="submit">
                                    Sign Up
                            </Button>
                            </Form.Row>

                        </Form>
                    </Jumbotron>

                </Row>
            </Container>
        );
    }
}