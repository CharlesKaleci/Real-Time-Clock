import React from 'react';
import './styles/WallClock.css';

class WallClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        currentTime: new Date(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.updateClock(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateClock() {
        this.setState({ currentTime: new Date() });
    }

    calculateHourAngle = (hours, minutes) => {
        return (hours % 12) * 30 + minutes * 0.5;
    };

    calculateMinuteAngle = (minutes) => {
        return minutes * 6;
    };

    calculateSecondAngle = (seconds) => {
        return seconds * 6;
    };

    render() {
        const { currentTime, dayMode } = this.state;
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const minuteAngle = this.calculateMinuteAngle(minutes);
        const hourAngle = this.calculateHourAngle(hours, minutes);
        const secondAngle = this.calculateSecondAngle(seconds);

        return (
        <div className={`wall-clock-container ${dayMode ? 'day-mode' : ''}`}>
            <div className={`clock-face ${dayMode ? '' : 'day-mode'}`}>
                <div className="hour-hand" style={{ transform: `rotate(${hourAngle}deg)` }}></div>
                <div className="minute-hand" style={{ transform: `rotate(${minuteAngle}deg)` }}></div>
                <div className="second-hand" style={{ transform: `rotate(${secondAngle}deg)` }}></div>
            </div>
        </div>
        );
    }
}

export default WallClock;
