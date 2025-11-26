//import React from "react";
import { useRecoilState } from "recoil";

import WindowFrame, {
    Welcome,
    About,
    Weather,
    Credits,
    Run,
    Documents,
    //Programs,
} from "../../windows";

import { windowObj } from "../../store/atoms";
import useLocalStorage from "../../hooks/useLocalStorage";
import FileViewer from "../../windows/FileViewer";
import RecycleBin from "../../windows/RecycleBin";
import InternetExplorer from "../../windows/InternetExplorer";

const componentList: any = {
    welcome: Welcome,
    about: About,
    weather: Weather,
    credits: Credits,
    run: Run,
    documents: Documents,
    recycle_bin: RecycleBin,
    browser: InternetExplorer,
};

export default function Windows() {
    const [currentWindows, setWindows]: any = useRecoilState(windowObj);
    // eslint-disable-next-line no-unused-vars
    const [welcomeStorage, _] = useLocalStorage("bills_welcome", true);

    const handleCloseWindow = (name: any) => {
        const updated = {
            [name]: {
                ...currentWindows[name],
                visibility: [false, false],
            },
        };
        setWindows({
            ...currentWindows,
            ...updated,
        });
    };

    const getContent = (name: any) => {
        const Comp = componentList[name];

        // If it's a registered component, use it
        if (Comp) return <Comp window={currentWindows[name]} />;

        // Otherwise, check if the window has content (it's a file)
        if (currentWindows[name]?.content) {
            return <FileViewer window={currentWindows[name]} />;
        }

        // Default fallback
        return <div>Unknown window type</div>;
    };


    const getCssName = (name: any) => {
        if (name in componentList) return name;
        return "repositoryDetails";
    }

    return (
        <>
            {Object.keys(currentWindows).map((name) => {
                const content = getContent(name);
                const cssName = getCssName(name);
                if (name === "welcome" && welcomeStorage === false) return null;
                return (
                    <WindowFrame
                        key={name}
                        name={name}
                        cssName={cssName}
                        window={currentWindows[name]}
                        onClose={handleCloseWindow}
                    >
                        {content}
                    </WindowFrame>
                );
            })}
        </>
    );
}