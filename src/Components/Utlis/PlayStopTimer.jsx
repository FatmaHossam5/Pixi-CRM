import React, { useState, useEffect } from 'react';

const PlayStopTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Start or stop the interval when isPlaying changes
  useEffect(() => {
    let timerId;

    if (isPlaying) {
      // Increment every second
      timerId = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }

    // Cleanup when component unmounts or isPlaying changes
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isPlaying]);

  // Toggle play/stop
  const handleToggle = () => {
    if (isPlaying) {
      // If currently playing, stop and reset to 0
      setIsPlaying(false);
      setElapsedSeconds(0);
    } else {
      // Start playing
      setIsPlaying(true);
    }
  };

  // Format elapsed time as HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');
  };

  return (
<div
  className="timer-btn"
  onClick={handleToggle}
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '0 12px', // adds 12px padding on left and right
  }}
>
  {isPlaying ? (
    <>
      <i
        className="fa-thin fa-stop"
        style={{ fontSize: '20px', marginRight: '8px', width: "50px" }}
      />
      <span>{formatTime(elapsedSeconds)}</span>
    </>
  ) : (
    <i className="fa-thin fa-play" style={{ fontSize: '20px' }} />
  )}
</div>

  );
};

export default PlayStopTimer;
