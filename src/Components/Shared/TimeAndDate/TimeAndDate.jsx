import React, { useEffect, useState } from 'react'

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
            <div className="time-and-date ms-3 d-flex align-items-center">
                <h5 className="me-2 mb-0"style={{color:"#4B4F56"}}>{formattedDate}</h5>
                <h5 className="mb-0"style={{color:"#4B4F56"}}>{dateTime.toLocaleTimeString()} </h5>
            </div>
        </>
    )
}

export default TimeAndDate