import React, { Component } from 'react';
import { Button, Row, Form, InputGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { getQuestions, saveQuiz } from '../services/RestService';
import logo from '../assets/images/logo.svg';
import { Timer } from './Timer';

export class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: props.location.state.userInfo.firstName,
            lastName: props.location.state.userInfo.lastName,
            categoryTypeId: props.location.state.userInfo.categoryTypeId,

            quizQuestions: [],
            showInstructions: true,
            goToResults: false,
            quizId: -1,
            submitting: false
        }
    }

    componentDidMount() {
        getQuestions().then(res => {
            this.setState({
                quizQuestions: res.data
            });
        })
    }

    instructions = () => {
        return (
            <div>
                <h3 className="text-center">You will have 2 minutes to complete this quiz</h3>
                <h3 className="text-center">Their will be a word in spanish and all you have to do is type it in english</h3>
                <h3 className="text-center">Ready?</h3>
                <Row className="justify-content-center">
                    <Button onClick={this.startQuiz}>Start Quiz</Button>
                </Row>

            </div>
        );
    }

    startQuiz = () => this.setState({ showInstructions: false })

    handleQuestionChange = (e) => {
        let id = e.target.id;
        let correctAnswer = this.state.quizQuestions[id - 1].correctAnswer;
        let userInput = e.target.value.toLowerCase();

        if (correctAnswer === userInput) {
            let textBox = document.getElementById(id);
            textBox.disabled = true;
            textBox.className = textBox.className + " correct";
        }
    }

    endQuiz = () => {
        this.setState({
            submitting: true
        })
        let responses = {};

        this.state.quizQuestions.map(quizQuestion => {
            let id = quizQuestion.questionId;
            responses[id] = document.getElementById(id).value;
        });


        let quiz = {
            categoryTypeId: this.state.categoryTypeId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            questionResponses: responses
        }

        saveQuiz(quiz).then(res => {
            this.setState({
                goToResults: true,
                quizId: res.data
            })
        })
            .catch(err => {
                alert("an error happend trying to save your results :(");
            })
    }

    render() {

        if (this.state.goToResults) {
            return <Redirect to={{
                pathname: `/results/${this.state.quizId}`,
                state: {
                    takeQuiz: this.state
                }
            }} />
        }

        const quizQuestions = this.state.quizQuestions.map(question => {
            return (
                <Form.Group className="col-md-5">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>{question.spanishWord}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            id={question.questionId}
                            onChange={this.handleQuestionChange}
                        />
                    </InputGroup>
                </Form.Group>
            );
        });

        return (
            <div>
                {this.state.showInstructions ? this.instructions() :
                    <div>
                        <Row className="justify-content-center">
                            <Timer className="col" endCallback={this.endQuiz} />
                        </Row>

                        <Row className="justify-content-center">
                            <> {quizQuestions} </>
                        </Row>

                        <Row className="justify-content-center">
                {this.state.submitting ? <p>Saving... <img src={logo} width='50' height='50' className="App-logo" /></p> :
                                <Button onClick={this.endQuiz} isDisabled={this.state.submitting}>Submit Quiz</Button>
                            }
                        </Row>
                    </div>
                }
            </div>

        );
    }
}