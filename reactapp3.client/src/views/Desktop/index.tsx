// src/views/Desktop/index.tsx
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import StartupSound from "../../components/StartupSound";
import Taskbar from "../Taskbar";
import Windows from "./Windows";
import DesktopButton from "./DesktopButton";

import useLocalStorage from "../../hooks/useLocalStorage";
import { windowObj, currentUser } from "../../store/atoms";
import reducer, {
    SET_LOADING,
    SET_TASKBAR,
    SET_ICONS,
    SET_WINDOWS,
} from "./reducer";

import "./styles.scss";

export default function Desktop() {
    const [currentWindows, setWindows]: any = useRecoilState(windowObj);
    const user = useRecoilValue(currentUser);
    const [active, setActive] = React.useState("");
    const [soundStorage, _] = useLocalStorage("billsPC_noSound", "On");
    const [desktopIcons, setDesktopIcons] = React.useState<any[]>([]);

    const [
        { showLoader, showTaskbar, showIcons, showWindows },
        dispatch,
    ] = reducer();

    // Load desktop icons based on current user
    React.useEffect(() => {
        if (user && user.desktop) {
            // Convert account icons to desktop format
            const icons = user.desktop.icons.map(icon => ({
                name: icon.id,
                label: icon.name,
                desktopIcon: icon.icon,
                content: icon.content,
                type: icon.type,
                component: icon.component,
                metadata: icon.metadata,
                browserHistory: icon.browserHistory,
                bookmarks: icon.bookmarks,
                playlists: icon.playlists
            }));
            setDesktopIcons(icons);
        }
    }, [user]);

    const handleDesktopClick = ({ target }: any) => {
        const { name } = target.dataset;
        setActive(name || "");
    };

    const handleButtonDblClick = (iconData: any) => (e: any) => {
        e.stopPropagation();

        // Create a window for this icon
        const windowName = iconData.name;
        const windowConfig = {
            label: iconData.label,
            header: `${iconData.label}${iconData.type === 'file' ? ' - Notepad' : ''}`,
            desktopIcon: iconData.desktopIcon,
            visibility: [true, true],
            content: iconData.content,
            type: iconData.type,
            component: iconData.component,
            metadata: iconData.metadata,
            browserHistory: iconData.browserHistory,
            bookmarks: iconData.bookmarks,
            playlists: iconData.playlists
        };

        window.setTimeout(() => {
            setWindows({
                ...currentWindows,
                [windowName]: windowConfig
            });
        }, 300);
    };

    React.useEffect(() => {
        dispatch({ type: SET_LOADING });
        window.setTimeout(() => {
            dispatch({ type: SET_TASKBAR });
        }, 500);
        window.setTimeout(() => {
            dispatch({ type: SET_ICONS });
        }, 1250);
        window.setTimeout(() => {
            dispatch({ type: SET_WINDOWS });
        }, 2500);
    }, []);

    React.useEffect(() => {
        const toggle = showLoader ? "add" : "remove";
        document.body.classList[toggle]("isLoading");
    }, [showLoader]);

    // Set wallpaper based on user
    React.useEffect(() => {
        if (user && user.wallpaper) {
            document.body.style.backgroundColor = user.wallpaper === 'teal' ? '#008080' : '#008080';
            // You can add more wallpaper styles here
        }
    }, [user]);

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
                        {showIcons && user && desktopIcons.map((icon, _index) => {
                            return (
                                <React.Fragment key={icon.name}>
                                    {icon.desktopIcon && (
                                        <DesktopButton
                                            name={icon.name}
                                            label={icon.label}
                                            icon={icon.desktopIcon}
                                            active={active}
                                            onDoubleClick={handleButtonDblClick(icon)}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}

                        {/* Show user display name in corner */}
                        {user && (
                            <div style={{
                                position: 'fixed',
                                bottom: '40px',
                                right: '10px',
                                background: 'rgba(0,0,0,0.7)',
                                color: 'white',
                                padding: '4px 8px',
                                fontSize: '11px',
                                borderRadius: '2px',
                                fontFamily: 'monospace'
                            }}>
                                👤 {user.displayName}
                            </div>
                        )}
                    </section>

                    {showWindows && <Windows />}
                </section>
            </main>
        </>
    );
}