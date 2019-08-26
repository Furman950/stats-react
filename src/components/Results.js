import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getQuizById } from '../services/RestService';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Form, InputGroup, Col } from 'react-bootstrap';

export class Results extends Component {
    constructor(props) {
        super(props);

        let s = this.props.location.state;
        let quizId = this.props.match.params.quizId;

        let goToResults = s ? s.takeQuiz
            ? s.takeQuiz.goToResults
                ? s.takeQuiz.goToResults : false
            : false
            : false;

        this.state = {
            takenQuiz: goToResults,
            quizId: quizId,

            quizResults: []
        }
    }

    componentDidMount() {
        if (this.state.takenQuiz === false)
            return;

        getQuizById(this.state.quizId)
            .then(res => {
                console.log(res.data);
                this.setState({
                    quizResults: res.data
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    render() {
        if (this.state.takenQuiz === false) {
            return (<Redirect to='/forbidden' />);
        }

        let numCorrect = 0;
        let total = this.state.quizResults.length;

        const quizResults = this.state.quizResults.map(question => {
            let correct = question.correctAnswer == question.userResponse;
            if (correct)
                numCorrect++;

            return (
                <Form.Group className="col-md-5">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>{question.spanishWord}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            className={correct ? "correct" : "incorrect"}
                            id={question.questionId}
                            disabled
                            value={question.userResponse}
                            onChange={this.handleQuestionChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>{question.correctAnswer}</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            );
        })

        return (
            <div>
                <h3 className="text-center mb-3">You got {numCorrect}/{total}! Which is about {((numCorrect / total) * 100).toFixed(2)}%</h3>

                <h5 className="text-center top-buffer">Key</h5>
                <Row className="justify-content-center">
                    <Form.Group className="col-md-5">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Spanish Word</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                disabled
                                value="Your Response"
                                onChange={this.handleQuestionChange}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>Correct Answer</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center">
                    <> {quizResults} </>
                </Row>

                <Row className="justify-content-around">
                    {/* <LinkContainer to='/leaderboard'>
                        <Button variant="outline-primary">Go to leaderboard</Button>
                    </LinkContainer> */}

                    <LinkContainer to='/'>
                        <Button variant="outline-primary">Go home</Button>
                    </LinkContainer>
                    
                    <LinkContainer to='/anovaResults'>
                        <Button variant="outline-primary">Anova Results</Button>
                    </LinkContainer>
                </Row>
            </div>
        );
    }
}