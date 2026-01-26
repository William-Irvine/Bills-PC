import React from "react";
import { Anchor, Button } from "react95";
import { useRecoilState, useSetRecoilState } from "recoil"; 
import { windowObj, focusedElement } from "../../store/atoms";
import "./styles.scss";

export default function About() {
    const [currentWindows, setWindows] = useRecoilState(windowObj);
    const setFocused = useSetRecoilState(focusedElement);
    const [resumeVisited, setResumeVisited] = React.useState(false);

    const handleResumeClick = () => {
        setResumeVisited(true);

        // Find the resume window
        const resumeWindowKey = Object.keys(currentWindows).find(key =>
            currentWindows[key].label?.toLowerCase().includes("resume")
        );

        if (resumeWindowKey) {
            // If window exists, open it if closed and focus it
            const resumeWindow = currentWindows[resumeWindowKey];

            setWindows({
                ...currentWindows,
                [resumeWindowKey]: {
                    ...resumeWindow,
                    visibility: [true, true],
                }
            });

            // Focus the window
            setTimeout(() => {
                setFocused(resumeWindowKey);
            }, 50);
        }
    };

    return (
        <>
            <style>{`
                .aboutContent__link, 
                .aboutContent__link:hover { 
                    cursor: url("/public/assets/cursor-pointer.ico"), pointer !important;
                }
            `}</style>
            <section className="wordpadWindow">
                <div className="flex justify-between wordpadWindow__header">
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
                        <Button variant="menu" size="sm">
                            Insert
                        </Button>
                        <Button variant="menu" size="sm">
                            Format
                        </Button>
                    </div>
                </div>
                <div className="wordpadWindow__toolbar">
                    <div style={{ 
                        padding: '4px 8px', 
                        fontSize: '11px',
                        borderBottom: '1px solid #808080',
                        background: '#c0c0c0'
                    }}>
                        {/* Toolbar placeholder - keeps WordPad authentic look */}
                    </div>
                </div>
                <div className="scrollable -yOnly wordpadWindow__body">
                    <div className="wordpadWindow__content">
                        <AboutContent
                            onResumeClick={handleResumeClick}
                            resumeVisited={resumeVisited}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

function AboutContent({ onResumeClick, resumeVisited }: { onResumeClick: () => void; resumeVisited: boolean }) {
    return (
        <div className="aboutContent">
            {/* Header with profile picture */}
            <div className="aboutContent__header">
                <div className="aboutContent__headerText">
                    <h1 style={{ 
                        fontSize: '24pt', 
                        marginBottom: '8px',
                        fontWeight: 'bold'
                    }}>
                        About Bill
                    </h1>
                    <p style={{ fontSize: '10pt', color: '#666', marginBottom: '10px' }}>
                        Software Developer | Problem Solver | Lifelong Learner
                    </p>

                    {/* Status Badges - Side by Side */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '8px',
                        paddingBottom: '12px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            background: '#f5f5f5',
                            border: '1px solid #999',
                            fontSize: '9pt'
                        }}>
                            📍 Carver, Massachusetts
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            background: '#e8f5e9',
                            border: '1px solid #4caf50',
                            fontSize: '9pt',
                            fontWeight: 'bold',
                            color: '#2e7d32'
                        }}>
                            ✅ Open to Work
                        </div>
                    </div>
                    <div style={{
                        padding: '5px',
                        background: '#f0f0f0',
                        border: '2px solid #808080'
                    }}>
                        <div>💻 <strong style={{ fontWeight: 'bold' }}>Current Focus:</strong> AI Integration, .NET Solutions, Web Development</div>
                        <div>🎯 <strong style={{ fontWeight: 'bold' }}>Favorite Techs:</strong> C#, React, ASP.NET Core, Python</div>
                    </div>
                </div>
                <div className="aboutContent__profilePic">
                    <img
                        src="src/assets/images/bill.png"
                        alt="Bill Irvine"
                        className="pixelated"
                        style={{
                            width: '160px',
                            height: '160px',
                            border: '2px solid #000',
                            background: '#fff'
                        }}
                    />
                </div>
            </div>

            {/* Main content */}
            <div style={{ marginTop: '0', marginBottom: '16px' }}>
                <h2 style={{ 
                    fontSize: '14pt', 
                    fontWeight: 'bold', 
                    marginBottom: '12px',
                    borderBottom: '2px solid #000',
                    paddingBottom: '4px'
                }}>
                    Welcome to Bills-PC
                </h2>
                <p style={{ marginBottom: '12px' }}>
                    Hey, I'm Bill. I'm a software developer who enjoys solving problems across the stack, from embedded systems to web applications.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    I've worked in healthcare software, enterprise tools, and IoT development. Along the way I've debugged proprietary languages, built Visual Basic widgets and Java reports, and learned C the hard way. Each role taught me something different about how software actually works, and I'm always looking for the next challenge.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    Bills-PC is my personal project playground. The Windows 95 aesthetic felt right for the domain, and it's a reminder that coding and design should be enjoyable.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    Under the hood: React and ASP.NET Core on modern cloud infrastructure.
                </p>
            </div>

            {/* Links & Contact */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ 
                    fontSize: '14pt', 
                    fontWeight: 'bold', 
                    marginBottom: '12px',
                    borderBottom: '2px solid #000',
                    paddingBottom: '4px'
                }}>
                    Connect & Learn More
                </h2>
                <p style={{ marginBottom: '12px' }}>
                    Check out my{' '}
                    <Anchor
                        href="#"
                        onClick={(e) => {
                            e.preventDefault(); //prevent navigation
                            onResumeClick();
                        }}
                        style={{
                            color: resumeVisited ? '#4F1288' : '#0000FF',
                        }}
                    >
                        resume
                    </Anchor>
                    {' '}on the desktop for the full work history, or just poke around and see what I've been building.
                </p>
                <p>
                    Always happy to connect if you want to talk tech. Find me on{' '}
                    <Anchor
                        href="https://github.com/William-Irvine"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Anchor>
                    {' '}and{' '}
                    <Anchor
                        href="https://linkedin.com/in/william-irvine-aa117776"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </Anchor>
                    .
                </p>
            </div>

            {/* Footer */}
            <div style={{ 
                marginTop: '40px',
                paddingTop: '16px',
                borderTop: '1px solid #ccc',
                fontSize: '9pt',
                color: '#666',
                textAlign: 'center'
            }}>
                <p>Bills-PC.com • Created with React & ASP.NET Core • © 2025</p>
            </div>
        </div>
    );
}