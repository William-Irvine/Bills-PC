//import React from "react";
import { Button, Anchor } from "react95";

//import useNewWindow from "../../hooks/useNewWindow";

import "./styles.scss";

export default function About() {
//    const open = useNewWindow();

 //   const handleClick = () => {
        //
  //  };

    return (
        <section className="aboutWindow">
            <div className="flex justify-between aboutWindow__header">
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
            <div className="scrollable -yOnly aboutWindow__body">
                <div className="aboutWindow__bodyInner">
                    <h1 className="mb2">About Bills-PC</h1>
                    <p className="mb2">
                        Welcome to Bills-PC - I'm Bill. This is a place where I can noodle with code, and learn new things in the process. 
                        I started my career analyzing code and diagnosing bugs for an electronic health record management system company where I learned a new proprietary
                        language that was cool, but not really practical anywhere else. I moved to a company doing the same thing for software used in IT enterprise
                        architecture planning. Only with this new gig I was able to create widgets in Visual Basic to extend functionality as needed, as well as generate
                        custom reports with Java for customers. Still though, most of the time was spent hunting down issues and fixing them. This was great, but I still
                        wasn't gaining the skills I was interested in. So I did what I was interested in. I picked up a new job where I was able to learn C for an embedded
                        IoT project which should be simple because I already know C# right? Hah. Anyway, I learned it and I am continuing
                        to learn. Not sure where this project will end up but it is something I've wanted to learn for a while. I wanted a windows 95 style site cause I
                        thought it would be perfect for bills-pc.com.
                        <br />
                        <br />
                        <div>&emsp;
                        <Anchor
                            href="https://github.com/William-Irvine"
                            target="_blank"
                        >
                            Bill Irvine
                            </Anchor>
                        </div>
                    </p>
                </div>
                <div className="profileImage">
                    <img
                        src="../../src/assets/images/bill.png"
                        alt="x"
                        className="pixelated"
                    /> 
                </div>
            </div>
        </section>
    );
}