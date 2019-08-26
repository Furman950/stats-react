import React, { Component } from 'react';
import { Jumbotron, Row, Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import { getAnovaResults } from '../services/RestService';

export class AnovaResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xBarGM: 0,
            bigN: 0,
            k: 0,
            betweenGroupVariance: 0,
            withInGroupsVariance: 0,
            fScore: 0,
            categoryStats: []
        }
    }

    componentDidMount() {
        getAnovaResults()
            .then(res => {
                this.setState({
                    xBarGM: res.data.xBarGM,
                    bigN: res.data.bigN,
                    k: res.data.k,
                    betweenGroupVariance: res.data.betweenGroupVariance,
                    withInGroupsVariance: res.data.withInGroupsVariance,
                    fScore: res.data.fScore,
                    categoryStats: res.data.categoryStats
                })
            })
    }

    render() {
        const categories = this.state.categoryStats.map(category => {
            return (
                <Card>
                    {/* <Card.Body> */}
                        <Card.Header as="h5">{category.category}</Card.Header>
                    {/* </Card.Body> */}
                    <ListGroup>
                        <ListGroupItem>&Sigma;x = {category.summation}</ListGroupItem>
                        <ListGroupItem>(&Sigma;x)<sup>2</sup> = {category.summationSquared}</ListGroupItem>
                        <ListGroupItem>&Sigma;x<sup>2</sup> = {category.eachXSquaredSummation}</ListGroupItem>
                        <ListGroupItem>x&#x0304; = {category.xBar}</ListGroupItem>
                        <ListGroupItem>n = {category.n}</ListGroupItem>
                    </ListGroup>

                </Card>
            );
        })
        return (
            <div>
                <h3 className="text-center top-buffer">ANOVA Results</h3>
                <Jumbotron>
                    <Row className="justify-content-around">

                        <Jumbotron className="col-md-5 bg-light">
                            <h4>x&#x0304;<sub>gm</sub> = {this.state.xBarGM}</h4>
                            <h4>N = {this.state.bigN}</h4>
                            <h4>k = {this.state.k}</h4>
                        </Jumbotron>
                        <Jumbotron className="col-md-5 bg-light">
                            <h4>S<sup>2</sup><sub>B</sub> = {this.state.betweenGroupVariance}</h4>
                            <h4>S<sup>2</sup><sub>W</sub> = {this.state.withInGroupsVariance}</h4>
                            <h4>F-Score = {this.state.fScore}</h4>
                        </Jumbotron>
                    </Row>
                </Jumbotron>

                <h2 className="text-center top-buffer">Categories</h2>
                <Jumbotron>
                    <Row className="justify-content-around">
                        <> {categories} </>
                    </Row>
                </Jumbotron>
            </div >
        );
    }
}