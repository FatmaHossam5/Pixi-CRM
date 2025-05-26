import React, { useEffect, useState } from 'react'
import styles from './TimeAndDate.module.css';

function TimeAndDate() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000); // Update every second

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const formattedDate = dateTime.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    return (
        <>
          <div className={styles.container}>
      <h5 className={styles.dateText}>{formattedDate}</h5>
      <h5 className={styles.timeText}>{dateTime.toLocaleTimeString()}</h5>
    </div>
        </>
    )
}

export default TimeAndDate