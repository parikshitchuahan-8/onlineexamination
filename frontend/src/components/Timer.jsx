import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, onTimeUp }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        if (seconds <= 0) {
            onTimeUp();
            return;
        }
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [seconds, onTimeUp]);

    const formatTime = () => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const timeColorClass = seconds <= 60 ? 'text-red-500' : 'text-gray-700';

    return <div className={`text-2xl font-bold ${timeColorClass}`}>{formatTime()}</div>;
};
export default Timer;