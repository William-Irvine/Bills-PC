// src/windows/Run/index.tsx
import React from "react";
import { Button, TextInput } from "react95";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { windowObj, currentUser, unlockedAccounts as unlockedAccountsAtom, focusedElement } from "../../store/atoms";
import { accounts, unlockAccount } from "../../data/accountsData";
import { WINDOW_OBJ } from "../../constants";
import "./styles.scss";

export default function Run({ onClose }: any) {
    const [command, setCommand] = React.useState("");
    const [currentWindows, setWindows] = useRecoilState(windowObj);
    const user = useRecoilValue(currentUser);
    const [unlockedAccounts, setUnlockedAccounts] = useRecoilState(unlockedAccountsAtom);
    const setFocused = useSetRecoilState(focusedElement);

    const executeCommand = () => {
        const cmd = command.toLowerCase().trim();

        console.log('Executing command:', cmd);

        if (!cmd) {
            console.log('Empty command');
            return;
        }

        // Check if it's an account username
        const accountKey = Object.keys(accounts).find(
            key => accounts[key].username.toLowerCase() === cmd
        );

        console.log('Account key found:', accountKey);

        if (accountKey) {
            const account = accounts[accountKey];
            console.log('Unlocking account:', account.displayName);
            if (!unlockedAccounts.includes(accountKey)) {
                setUnlockedAccounts(current => unlockAccount(accountKey, current));
            }
            handleCancel();
            return;
        }

        // Try to open an application by name
        const appCommands: { [key: string]: string } = {
            "weather": "weather",
            "weather forecast": "weather",
            "weather.exe": "weather",
            "about": "about",
            "about.txt": "about",
            "credits": "credits",
            "credits.txt": "credits",
            "recycle bin": "recycle_bin",
            "recyclebin": "recycle_bin",
            "recycle": "recycle_bin",
            "internet explorer": "browser",
            "ie": "browser",
            "browser": "browser",
            "iexplore.exe": "browser",
            "media player": "media_player",
            "wmp": "media_player",
            "windows media player": "media_player",
            "documents": "documents",
        };

        const appToOpen = appCommands[cmd];
        console.log('App to open:', appToOpen);

        if (appToOpen) {
            let windowConfig: any;

            const userIcon = user?.desktop.icons.find(icon => icon.id === appToOpen);
            console.log('User icon found:', userIcon);

            if (userIcon) {
                windowConfig = {
                    label: userIcon.name,
                    header: userIcon.type === 'file' ? `${userIcon.name} - Notepad` : userIcon.name,
                    desktopIcon: userIcon.icon,
                    visibility: [true, true],
                    content: userIcon.content,
                    type: userIcon.type,
                    component: userIcon.component,
                    metadata: userIcon.metadata,
                    browserHistory: userIcon.browserHistory,
                    bookmarks: userIcon.bookmarks,
                    playlists: userIcon.playlists
                };
            } else {
                const defaultApps: any = {
                    weather: { label: "Weather Forecast.exe", component: "Weather" },
                    about: { label: "About.txt", type: "file", content: "About Bills-PC..." },
                    credits: { label: "credits.txt", type: "file", content: "Credits..." },
                    documents: { label: "Documents", component: "Documents" },
                    recycle_bin: { label: "Recycle Bin", component: "RecycleBin" },
                };

                const app = defaultApps[appToOpen];
                console.log('Default app:', app);
                if (app) {
                    windowConfig = {
                        label: app.label,
                        header: app.type === 'file' ? `${app.label} - Notepad` : app.label,
                        desktopIcon: "",
                        visibility: [true, true],
                        type: app.type || 'application',
                        component: app.component,
                        content: app.content
                    };
                }
            }

            console.log('Window config:', windowConfig);

            if (windowConfig) {
                console.log('Opening window...');

                // Merge with existing WINDOW_OBJ if it exists
                const baseWindow = WINDOW_OBJ[appToOpen] || {};
                console.log('Base window from WINDOW_OBJ:', baseWindow);
                const finalConfig = {
                    ...baseWindow,
                    ...windowConfig,
                    visibility: [true, true]
                };
                console.log('Final config to set:', finalConfig);

                setWindows({
                    ...currentWindows,
                    [appToOpen]: finalConfig
                });

                console.log('Windows after set:', { ...currentWindows, [appToOpen]: finalConfig });

                // Set the newly opened window as focused
                setFocused(appToOpen);

                // Close Run window after opening the app
                setTimeout(() => {
                    setWindows((prev: any) => ({
                        ...prev,
                        run: {
                            ...prev.run,
                            visibility: [false, false]
                        }
                    }));
                    setCommand("");
                }, 100);
                return;
            }
        }

        // If command not recognized, don't close window
        console.log('Command not recognized:', cmd);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            executeCommand();
        }
    };

    const handleCancel = () => {
        setCommand("");
        if (onClose) {
            onClose();
        } else {
            const updated = {
                run: {
                    ...currentWindows.run,
                    visibility: [false, false]
                }
            };
            setWindows({ ...currentWindows, ...updated });
        }
    };

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
                    <p>Type the name of a program, folder, or document, and Bills-PC will open it for you.</p>
                </div>
            </div>
            <div>
                <div className="openLabel">
                    <span>Open:</span>
                </div>
                <div className="selectDropdown">
                    <TextInput
                        className="selection"
                        value={command}
                        onChange={(e: any) => setCommand(e.target.value)}
                        onKeyDown={handleKeyPress}
                        style={{ width: '360px' }}
                    />
                </div>
            </div>
            <div className="runWindowButton">
                <Button className="okButton" onClick={executeCommand}>OK</Button>
            </div>
            <div className="runWindowButton">
                <Button className="cancelButton" onClick={handleCancel}>Cancel</Button>
            </div>
            <div className="runWindowButton">
                <Button className="browseButton" disabled>Browse...</Button>
            </div>
        </section>
    );
}