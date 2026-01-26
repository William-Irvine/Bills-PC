//import React from "react";
import { Button } from "react95";
import "./styles.scss";

export default function WordPad({ window }: any) {
    return (
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
                    {window?.content || <DefaultAboutContent />}
                </div>
            </div>
        </section>
    );
}

function DefaultAboutContent() {
    return (
        <div style={{ padding: '20px 40px', fontFamily: 'Arial', lineHeight: '1.6' }}>
            <p>No content available.</p>
        </div>
    );
}