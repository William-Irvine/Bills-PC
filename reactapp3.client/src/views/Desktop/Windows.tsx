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

const componentList: any = {
    welcome: Welcome,
    about: About,
    weather: Weather,
    credits: Credits,
    run: Run,
    documents: Documents,
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
        //if (Comp === undefined) return <Repo name={name} />;

        return <Comp />;
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