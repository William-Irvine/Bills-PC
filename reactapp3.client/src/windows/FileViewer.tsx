// src/windows/FileViewer.tsx
//import React from "react";

export default function FileViewer({ window }: any) {
    return (
        <div style={{
            fontFamily: 'Consolas, monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            padding: '8px',
            background: 'white',
            height: '100%',
            overflow: 'auto'
        }}>
            {window.content || "Empty file"}
        </div>
    );
}