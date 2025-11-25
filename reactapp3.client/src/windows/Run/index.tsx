//import React from "react";
//import { Button, Select, TextInput } from "react95";
import { Button, Select } from "react95";


//import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

const options = [
    {
        value: 0,
        label: "cmd.exe"
    },
    {
        value: 1,
        label: "C:/Users/Documents/About Bills-PC.txt"
    },
    {
        value: 2,
        label: "C:/Programs/Weather Forcast.exe"
    }
];

export default function Run() {
 //   const open = useNewWindow();

 //   const handleClick = () => {
        //
 //   };
    
    return (
        <section className="runWindow">
            <div>
                <div className="imgSection">
                    <img
                        src="src\assets\images\run_4.png"
                        alt=""
                        className="pixelated"
                    />
                </div>
                <div className="messageSection">
                    <p>Type the name of a program, folder, or document, and Bills-PC might open it for you.</p>
                </div>                
            </div>
            <div>
                <div className="openLabel">
                    <span>Open:</span>
                </div>
                <div className="selectDropdown" >
                    <Select className="selection" defaultValue={4} width={360} options={options} />
                </div>
            </div>
            <div className="runWindowButton">
                <Button className="okButton">OK</Button>
            </div>
            <div className="runWindowButton">
                <Button className="cancelButton">Cancel</Button>
            </div>
            <div className="runWindowButton">
                <Button className="browseButton">Browse...</Button>
            </div>
        </section>
    );
}