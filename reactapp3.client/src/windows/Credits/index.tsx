//import React from "react";
import { Button, Anchor } from "react95";

//import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function Credits() {
    //const open = useNewWindow();

    return (
        <section className="creditsWindow">
            <div className="flex justify-between creditsWindow__header">
                <div className="flex flex-auto items-center">
                    <Button variant="menu" size="sm">
                        File
                    </Button>
                    <Button variant="menu" size="sm">
                        Edit
                    </Button>
                    <Button variant="menu" size="sm">
                        View
                    </Button>
                </div>
            </div>
            <div className="scrollable -yOnly creditsWindow__body">
                <div className="creditsWindow__bodyInner">
                    <h1 className="mb2">Credit where credit is due:</h1>

                    <p className="mb2">Bills-PC is built with these libraries and resources:</p>
                    <ul className="creditsWindow__list">
                        <li>
                            <Anchor href="https://reactjs.org" target="_blank">
                                React
                            </Anchor>
                        </li>
                        <li>
                            <Anchor href="https://recoiljs.org" target="_blank">
                                Recoil
                            </Anchor>
                        </li>
                        <li>
                            <Anchor
                                href="https://github.com/arturbien/React95"
                                target="_blank"
                            >
                                React95 Component Library
                            </Anchor>
                        </li>
                        <li>                            
                            <Anchor
                                href="https://artage.io/en/icon-packs/original-windows-95-icons"
                                target="_blank"
                            >
                                Windows 95 style icons
                            </Anchor>{" "}
                            from Artage.
                        </li>
                    </ul>

                    <p className="mb2">
                        I found a great website called{" "}

                        <Anchor
                            href="https://github.com/edwardpayton/github95"
                            target="_blank"
                        >
                            Github95
                        </Anchor>

                        {" "}which this site is heavily influenced from.{" "}
                        <br />
                        Shoutout to its creator who did the heavy lifting on the styling{" "}

                        <Anchor
                            href="https://github.com/edwardpayton"
                            target="_blank"
                        >
                            Edward Payton
                        </Anchor>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}