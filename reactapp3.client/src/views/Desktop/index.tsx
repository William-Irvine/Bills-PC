//import React, { useState } from "react";
import React from "react";
import { useRecoilState } from "recoil";

//import StartupSound, { playStartupSound } from "../../components/StartupSound";
import StartupSound from "../../components/StartupSound";
import Taskbar from "../Taskbar";
import Windows from "./Windows";
import DesktopButton from "./DesktopButton";

import useLocalStorage from "../../hooks/useLocalStorage";
import { WINDOW_OBJ } from "../../constants";
import { windowObj } from "../../store/atoms";
import reducer, {
    SET_LOADING,
    SET_TASKBAR,
    SET_ICONS,
    SET_WINDOWS,
} from "./reducer";

import "./styles.scss";

const desktopIcons = (() => {
    const icons = Object.keys(WINDOW_OBJ)
        .filter((name) => (WINDOW_OBJ[name].desktopIcon ? name : null))
        .sort(
            (a, b) => WINDOW_OBJ[a].desktopPosition - WINDOW_OBJ[b].desktopPosition
        );
    return icons;
})();

export default function Desktop() {
    const [currentWindows, setWindows]: any = useRecoilState(windowObj);
    // const limit = useRecoilValue(apiLimit);
    const [active, setActive] = React.useState("");
    // eslint-disable-next-line no-unused-vars
    const [soundStorage, _] = useLocalStorage("billsPC_noSound", "On");
    //const [soundStorage, _] = useLocalStorage("billsPC_noSound", true);

    //const is_logged_in = localStorage.getItem("logged_in");

    const [
        { showLoader, showTaskbar, showIcons, showWindows },
        dispatch,
    ] = reducer();

    const handleDesktopClick = ({ target }: any) => {
        const { name } = target.dataset;
        setActive(name || "");
    };

    const handleButtonDblClick = (name: any) => (e: any) => {
        e.stopPropagation();
        const updated = {
            [name]: {
                ...currentWindows[name],
                visibility: [true, true],
            },
        };

        window.setTimeout(() => {
            setWindows({ ...currentWindows, ...updated });
        }, 300);
    };

    React.useEffect(() => {
        // @ts-ignore
        dispatch({ type: SET_LOADING });
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({ type: SET_TASKBAR });
        }, 500);
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({ type: SET_ICONS });
        }, 1250);
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({ type: SET_WINDOWS });
        }, 2500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        const toggle = showLoader ? "add" : "remove";
        document.body.classList[toggle]("isLoading");
    }, [showLoader]);
    return (
        <>
             {showTaskbar && ( 
                <>
                    <Taskbar />
                    {(soundStorage !== "Off") && <StartupSound />}                    
                </>
             )} 
            <main>
                <section className="desktop">
                    <section
                        className="flex flex-column desktop__background"
                        onClick={handleDesktopClick}
                    >
                        {showIcons && 
                        desktopIcons.map((name) => {
                                const { label, desktopIcon } = WINDOW_OBJ[name];
                                return (
                                    <React.Fragment key={name}>
                                        {desktopIcon.length && (
                                            <DesktopButton
                                                name={name}
                                                label={label}
                                                icon={desktopIcon}
                                                active={active}
                                                onDoubleClick={handleButtonDblClick(name)}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })
                        }
                    </section>

                    {showWindows && <Windows />}
                </section>
            </main>
        </>
    );
}