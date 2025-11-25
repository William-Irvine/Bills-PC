import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AppBar, Toolbar, Tooltip } from "react95";

import StartMenu from "../StartMenu";
import TaskbarButton from "./TaskbarButton";
import TaskbarClock from "./TaskbarClock";

import { menubarButtons, windowObj } from "../../store/atoms";
import useLocalStorage from "../../hooks/useLocalStorage";

import "./styles.scss";


export default function Taskbar() {
    const [soundStorage, setStorage] = useLocalStorage("billsPC_noSound", "On");
    const [currentButtons, setButtons]: any = useRecoilState(menubarButtons);
    const currentWindows: any = useRecoilValue(windowObj);
    // eslint-disable-next-line no-unused-vars
    const [welcomeStorage, _] = useLocalStorage("bills_welcome", true);
    const refWindowMap = React.useRef(new Map());

    React.useEffect(() => {
        Object.keys(currentWindows).forEach((window) => {
            if (currentWindows[window].visibility[0])
                refWindowMap.current.set(window, currentWindows[window]);
            else refWindowMap.current.delete(window);
        });
        setButtons([...refWindowMap.current]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWindows]);
    // 'setButtons' - not needed

    const handleSoundToggle = () => {
        const storageValue: any = {
            Off: "On",
            On: "Off",
        };
        setStorage(storageValue[soundStorage]);
    };

    return (
        <AppBar className="taskbar">
            <Toolbar className="justify-between relative taskbar__toolbar">
                <div className="flex taskbar__buttonWrapper">
                    <StartMenu />
                    <div className="relative taskbar__applications">
                        <div className="flex taskbar__applicationsButtons">
                            {[...currentButtons].map((name) => {
                                if (name[0] === "welcome" && welcomeStorage === false) { 
                                    return null;
                                }
                                return (
                                    <TaskbarButton
                                        name={name[0]}
                                        label={name[1].label}
                                        key={name[0]}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <TaskbarClock />
                <Tooltip text={soundStorage == "On" ? 'Mute' : "Unmute"} enterDelay={100} leaveDelay={100}>
                    <div className="taskbarSound">
                            <img
                                onClick={handleSoundToggle}
                                src={soundStorage == "On" ? "src/assets/images/speaker.png" : "src/assets/images/speaker_muted.png"}
                                alt=""
                                className="pixelated"
                            />
                    </div>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}