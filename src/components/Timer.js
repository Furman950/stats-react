import React, { Component } from 'react';

export class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minutes: 1,
            seconds: 59,
            interval: null
        }
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(this.countDown.bind(this), 1000)
        });
        
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    countDown = () => {
        let seconds = this.state.seconds - 1;
        let minutes = this.state.minutes

        if (minutes === 0 &&
            seconds === 0) {
            this.props.endCallback();
            clearInterval(this.state.interval);
            this.setState({         
                seconds: seconds
            });

            return;
        }

        if (seconds === 0) {
            seconds = 59;
            minutes--;
        }

        this.setState({
            minutes: minutes,
            seconds: seconds
        });
    }


    render() {
        let seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds;
        let minutes = this.state.minutes;
        return (
            <h3>{`${minutes}:${seconds}`}</h3>
        );
    }
}