import React from "react";

import { Howl } from "howler";

export default function StartupSound() {
    const refSound = React.useRef<any>(null);
    React.useEffect(() => {
        refSound.current = new Howl({
            // @ts-ignore
            src: ["src/assets/startup-sound.wav"],
            volume: 0.5,
            onend: () => {
                refSound.current = null;
            },
        });
        refSound.current.once("load", function () {
            refSound.current.play();
        });
    }, []);
    return null;
}