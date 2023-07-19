import React from 'react';
import WallClock from './wallClock';
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentTime: new Date().toLocaleTimeString(), 
            is24HourFormat: true,
            settingsOpen: false,
            buttonsVisible: true,
            dayMode: false,
            displayWallClock: false
        };
    }
    
    componentDidMount() {
        this.timerID = setInterval(() => this.updateClock(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    updateClock() {
        this.setState({ currentTime: new Date().toLocaleTimeString() });
    }
    
    toggleClockFormat = () => {
        this.setState(prevState => ({
            is24HourFormat: !prevState.is24HourFormat
        }));
    }
    
    toggleSettings = () => {
        this.setState(prevState => ({
            settingsOpen: !prevState.settingsOpen,
            buttonsVisible: !prevState.settingsOpen
        }));
    }
    toggleDayMode = () => {
        this.setState(prevState => ({
            dayMode: !prevState.dayMode,
        }),
        () =>{
            const {dayMode} = this.state;
            if(dayMode){
                document.body.classList.add('day-mode');
            }
            else {
                document.body.classList.remove('day-mode');
            }
            const wallClock = document.querySelector('.wall-clock-container');
            const clockContainer = document.querySelector('.clock-container');
            if (wallClock) {
                wallClock.classList.toggle('day-mode', dayMode);
                if (dayMode) {
                    clockContainer.classList.add('wallclock-container');
                }
                else{
                    clockContainer.classList.add('wallclock-container')
                }
            }
        }) 
    }
    toggleWallClock = () =>{
        const { displayWallClock } = this.state;
        const newDisplayWallClock = !displayWallClock;

        const clockContainer = document.querySelector('.clock-container');
        if (newDisplayWallClock) {
            clockContainer.classList.add('wallclock-container')
        }
        else{
            clockContainer.classList.remove('wallclock-container')
        }
        this.setState({
            displayWallClock: newDisplayWallClock,
        });
    }
    
    render() {
        const { is24HourFormat, settingsOpen, buttonsVisible, dayMode, displayWallClock} = this.state;
        
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minute = currentTime.getMinutes().toString().padStart(2, '0');
        const second = currentTime.getSeconds().toString().padStart(2, '0');
        
        let displayedHours = hours;
        const period = is24HourFormat ? '' : (hours >= 12 ? 'pm' : 'am');
        
        if (!is24HourFormat) {
            displayedHours = (parseInt(hours) % 12).toString().padStart(2, '0');
        }
        
        return(
            <div className={`clock-container ${dayMode ? 'day-mode' : '' }`}>
                <div className={`clock-settings ${settingsOpen ? 'open' : ''} ${dayMode ? 'day-mode' : '' }`}>
                    <button className={`settings ${dayMode ? 'day-mode' : '' }`} onClick={this.toggleSettings}><i className="fa-solid fa-bars"></i></button>
                    <div className={`clock-controls ${settingsOpen ? 'open' : ''}`}>
                    {buttonsVisible && (
                        <>
                            <button className={`wall-clock ${dayMode ? 'day-mode' : '' }`} onClick={this.toggleWallClock}><i className="fa-regular fa-clock"></i></button>
                            {displayWallClock ? 
                            ('') : 
                            (
                            <button className={`period ${dayMode ? 'day-mode' : '' }`} onClick={this.toggleClockFormat}>
                                {is24HourFormat ? '24' : '12'}
                            </button>
                            )
                            }
                            <button className={`day-night-mode ${dayMode ? 'day-mode' : '' }`} onClick={this.toggleDayMode}> {dayMode ? (<i class="fa-solid fa-moon"></i>) : (<i class="fa-solid fa-sun"></i>) }</button>
                        </>
                        )}
                    </div>
                </div>
                {displayWallClock ? (
                    <WallClock />
                ) : (
                    <>
                        <div className={`hour ${dayMode ? 'day-mode' : ''}`}>{displayedHours} <span>{period}</span></div>
                        <h2>:</h2>
                        <div className={`minute ${dayMode ? 'day-mode' : ''}`}>{minute}</div>
                        <h2>:</h2>
                        <div className={`second ${dayMode ? 'day-mode' : ''}`}>{second}</div>
                    </>
                )}
            </div>
        );
    }
}

export default Clock;
