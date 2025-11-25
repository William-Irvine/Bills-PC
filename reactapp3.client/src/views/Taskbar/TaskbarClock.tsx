import React from "react";
//import { Tooltip } from "react95";

export default function TaskbarClock() {
    const refClock = React.useRef<HTMLParagraphElement>(null);
    //const refDate = React.useRef<HTMLParagraphElement>(null);
    const refTimer = React.useRef(0);
    //var full_date = '';

    const clock = () => {
        const today = new Date();
        const hour = today.getHours();
        var hour_converted = hour;
        const min = today.getMinutes();
        var meridiem = "PM";
        const interval = (60 - today.getSeconds()) * 1000 + 5;
        const addZero = (t: any) => {
            if (t < 10) return `0${t}`;
            return t;
        };
        refTimer.current = window.setTimeout(() => {
            clock();
        }, interval);

        //const date = today.getDate();
        //const month = today.getMonth() + 1;
        //const year = today.getFullYear();

        //full_date = `${month}/${date}/${year}`;

        //convert from military time
        if (hour < 12) {
            meridiem = "AM"
            if (hour == 0) {
                hour_converted = 12;
            }
        } else if (hour > 12) {
            hour_converted = hour - 12;
        }

        if (refClock.current) {
            refClock.current.innerHTML = `${hour_converted}:${addZero(min)} ${meridiem}`;
        }

        //if (refDate.current) {
        //    refDate.current.innerHTML = `${month}/${date}/${year}`;
        //}
    };

    React.useEffect(() => {
        refClock && refClock.current && clock();
        return () => {
            window.clearTimeout(refTimer.current);
            //refClock.current = null;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <p ref={refClock} className="taskbarClock"></p>
   //return (<Tooltip text={full_date} enterDelay={100} leaveDelay={100}>
    //    <p ref={refClock} className="taskbarClock"></p>
     //       </Tooltip>);
}