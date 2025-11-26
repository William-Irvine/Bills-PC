import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, MenuList, MenuListItem, Separator } from "react95";

import { windowObj, currentUser } from "../../store/atoms";

import "./styles.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import reducer, {
    SET_LOADING,
    RESET_TASKBAR,
    RESET_ICONS,
    RESET_WINDOWS,
 //   RESET_ALL,
} from "../Desktop/reducer";
//import Desktop from "../Desktop";
//import Login from "../Login";

export default function StartMenu() {
    const [currentWindows, setWindows]: any = useRecoilState(windowObj);
    const [isOpen, setOpen] = React.useState(false);
    const refMenu = React.useRef<HTMLDivElement>(null);
    const [_, setLoggedInStorage] = useLocalStorage("logged_in", true);
    const setCurrentUser = useSetRecoilState(currentUser);

    const [
        //      { showLoader, showTaskbar, showIcons, showWindows },
        { showLoader },
        dispatch,
    ] = reducer();
    

    const toggleMenu = (toggle: any) => {
        setOpen(toggle);
        if (toggle) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };

    const handleButtonClick = () => {
        toggleMenu(!isOpen);
    };

    const handleListClick = (name:any) => () => {
        const updated = {
            [name]: {
                ...currentWindows[name],
                visibility: [true, true],
            },
        };
        window.setTimeout(() => {
            setWindows({ ...currentWindows, ...updated });
        }, 300);
        toggleMenu(false);
    };

    const handleClickOutside = ({ target }: any) => {
        if (refMenu.current && refMenu.current.contains(target)) return;
        toggleMenu(false);
    };

    const handleLogoutClick = () => {
        // @ts-ignore
        dispatch({ type: SET_LOADING });
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({ type: RESET_TASKBAR });
        }, 500);
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({ type: RESET_ICONS });
        }, 1250);
        window.setTimeout(() => {
            // @ts-ignore
            dispatch({ type: RESET_WINDOWS });
        }, 2500);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setCurrentUser(null);
        setLoggedInStorage(false);
        window.location.reload();
    }

    React.useEffect(() => {
        const toggle = showLoader ? "add" : "remove";
        document.body.classList[toggle]("isLoading");
    }, [showLoader]);

    return (
        <div className="startMenu" ref={refMenu}>
            <div className={`startMenu__slide${isOpen ? " -isOpen" : ""}`}>
                <MenuList
                    horizontalAlign="left"
                    verticalAlign="top"
                    className="startMenu__menu"
                >
                    <MenuListItem onClick={handleListClick("documents")} data-name="documents">
                        <p className="startMenu__menuItem">
                            <img
                                src="src\assets\images\mydocs.png"
                                alt=""
                                className="pixelated"
                            />
                            Documents
                        </p>
                    </MenuListItem>
                    <MenuListItem onClick={handleListClick("weather")} data-name="weather">
                        <p className="startMenu__menuItem">
                            <img
                                src="src\assets\images\program.png"
                                alt=""
                                className="pixelated"
                            />
                            Weather Forecast
                        </p>
                    </MenuListItem>
                    <MenuListItem onClick={handleListClick("about")} data-name="about">
                        <p className="startMenu__menuItem">
                            <img
                                src="src\assets\images\notepad.png"
                                alt=""
                                className="pixelated"
                            />
                            About
                        </p>
                    </MenuListItem>
                    <MenuListItem onClick={handleListClick("run")} data-name="run">
                        <p className="startMenu__menuItem">
                            <img
                                src="src\assets\images\run_2.png"
                                alt=""
                                className="pixelated"
                            />
                            Run
                        </p>
                    </MenuListItem>
                    <Separator />
                   <MenuListItem onClick={handleLogoutClick} >
                    {/*<MenuListItem disabled >*/}
                        <p className="startMenu__menuItem">
                            <img
                                src="src\assets\images\shut-down.png"
                                alt=""
                                className="pixelated"
                            />
                           Log off
                        </p>
                    </MenuListItem>
                </MenuList>
            </div>
            <Button
                data-name="start-menu"
                onClick={handleButtonClick}
                active={isOpen}
                className="mr1 startMenu__triggerButton"
            >
                <img
                    src="src\assets\images\logo_2.png"
                    alt=""
                    className="pixelated startMenu__logo"
                />
                <div style={{ fontSize: 12 }}>Start</div>
            </Button>
        </div>
    );
}