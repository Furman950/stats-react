import React, { Component } from 'react';
import { Row, Jumbotron, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { CategoryTypeSelect } from './partials/CategoryTypeSelect';
// import { LinkContainer } from 'react-router-bootstrap';

export class UserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            categoryTypeId: -1,
            goToQuiz: false
        }
    }

    submit = (e) => {
        e.preventDefault();
        this.setState({ goToQuiz: true });
    }

    handleFirstNameChange = (e) => this.setState({ firstName: e.target.value });
    handleLastNameChange = (e) => this.setState({ lastName: e.target.value });
    handleCategoryTypeSelectChange = (e) => {
        var select = document.getElementById("categoryTypeSelect");
        var categoryId = select.options[select.selectedIndex].value;

        this.setState({
            categoryTypeId: categoryId
        })
    };

    render() {

        if (this.state.goToQuiz) {
            return <Redirect to={{
                pathname: '/takeQuiz',
                state: {
                    userInfo: this.state
                }
            }} />
        }
        return (
            <div>
                <h1 className="text-center">Enter your info</h1>
                <Row className="justify-content-center">
                    <Jumbotron className="col-md-8 mt-3">
                        <Form onSubmit={this.submit}>
                            <Form.Group>
                                <Form.Label>*First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleFirstNameChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>*Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleLastNameChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>*Select a category best fits you</Form.Label>
                                <CategoryTypeSelect nameId="categoryTypeSelect" handleChange={this.handleCategoryTypeSelectChange} />
                            </Form.Group>
                            <Row className="justify-content-center">
                                <Button variant="outline-primary" type="submit">Next</Button>
                            </Row>
                        </Form>
                    </Jumbotron>
                </Row>
            </div>
        );
    }
}