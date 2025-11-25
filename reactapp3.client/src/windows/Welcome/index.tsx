//import React from "react";
import { useRecoilState } from "recoil";
//import { Anchor, Button, Separator } from "react95";
import { Button, Separator } from "react95";

import { windowObj } from "../../store/atoms";
import useLocalStorage from "../../hooks/useLocalStorage";
//import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function Welcome() {
    const [currentWindows, setWindows] = useRecoilState(windowObj);
    // eslint-disable-next-line no-unused-vars
    const [_, setStorage] = useLocalStorage("bills_welcome", true);
    //const open = useNewWindow();

    const handleMoreClick = () => {
        const updated = {
            about: {
                ...currentWindows.about,
                visibility: [true, true],
            },
        };

        window.setTimeout(() => {
            setWindows({ ...currentWindows, ...updated });
        }, 300);
    };

    const handleCodeClick = () => {
        //open("github95", "edwardpayton");
    };

    const handleCloseClick = () => {
        const updated = {
            welcome: {
                ...currentWindows.welcome,
                visibility: [false, false],
            },
        };

        setWindows({ ...currentWindows, ...updated });

        setStorage(false);
    };

    return (
        <div className="p2 flex flex-column welcome">
            <h1 className="mb2 welcome__title">
                Welcome to <span className="welcome__ghText">Bills-PC</span>
                <span className="welcome__95Text">.com</span>
            </h1>
            <p>Personal website of William Irvine.</p>
            <p className="mb2">
                This project will be added to by Bill periodically as he builds it, and learns new concepts.
            </p>
            <div className="flex flex-auto">
                <div className="p2 bevelBorder welcome__body">
                    <div className="mb2 flex flex-auto">
                        <div>
                            <img
                                src="src\assets\images\lightbulb-exclamation.png"
                                alt=""
                                className="pixelated"
                            />
                        </div>
                        <div className="pl2">
                            <p className="mb2 welcome__dykText">Did you know...</p>
                            <p>
                                Bill was born in 1990 in the city of Boston, Ma on <br /> February 
                                
                                18th, but who really even cares about that.
                            </p>
                        </div>
                    </div>
                    <div className="center">
                        <img
                            src="src\assets\images\welcome-computer.png"
                            alt=""
                            className="pixelated"
                        />
                    </div>
                </div>
                <div className="pl2 flex flex-column justify-between welcome__buttons">
                    <div className="flex flex-column">
                        <Button onClick={handleMoreClick} data-name="about">
                            Find out more
                        </Button>
                        <Button
                            onClick={handleCodeClick}
                            className="mt1"
                        >
                            Next Fact
                        </Button>
                        <Separator className="welcome__hr" />
                        <Button onClick={handleCloseClick}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}