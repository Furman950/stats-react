import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Button, Col, Jumbotron } from 'react-bootstrap';

export class Leaderboard extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h4 className="text-center">Leaderboard</h4>
                <h2 className="text-center top-medium-buffer">Top 10</h2>

                <Jumbotron>
                    <h3>Comming soon...</h3>
                </Jumbotron>
            </div>
        );
    }
}