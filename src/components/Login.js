import React, { Component } from 'react';
import { Jumbotron, Form, Row, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { login } from '../services/RestService';

export class Login extends Component {
    static displayName = Login.name;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwordHash: ''
        };
    }

    submit = (e) => {
        e.preventDefault();

        login(this.state.username, this.state.passwordHash)
            .then(response => {
                sessionStorage.setItem('userId', response.data)
                console.log("setting state");
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', this.state.username);
                sessionStorage.setItem('passwordHash', this.state.passwordHash);
                this.setState({
                    isLoggedIn: true
                });

            })
            .catch(error => {
                console.log("An error happened")
                console.log(error)
                alert("Invalid login");
            });
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlepasswordHashChange = (e) => {
        this.setState({
            passwordHash: e.target.value
        });
    }

    render() {
        return (
            <Container>
                {this.state.isLoggedIn ? <Redirect to='/dashboard' /> : null}
                <h1 className="text-center">Login</h1>
                <Row className='justify-content-center'>
                    {this.state.isLoggedIn ? <Redirect to='/dashboard' /> : null}
                    <Jumbotron className='col-md-8 mt-3'>
                        <Form method='Post' onSubmit={this.submit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="passwordHash" value={this.state.passwordHash} onChange={this.handlepasswordHashChange} />
                            </Form.Group>
                            <Form.Row className="justify-content-center">
                                <input type="button" value="Login" className="btn btn-primary" onClick={this.submit} />
                            </Form.Row>

                        </Form>
                    </Jumbotron>
                </Row>
            </Container>
        );
    }
}