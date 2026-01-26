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
                // Clear the manual login flag after sound ends
                sessionStorage.removeItem('manualLogin');
            },
        });
        refSound.current.once("load", function () {
            refSound.current.play();
        });

        // Cleanup
        return () => {
            if (refSound.current) {
                refSound.current.unload();
            }
        };
    }, []);

    return null;
}