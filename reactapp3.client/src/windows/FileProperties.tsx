// src/windows/FileProperties.tsx
import React from "react";
import { Window, WindowHeader, WindowContent, Button, Tabs, Tab, TabBody } from "react95";

interface FilePropertiesProps {
    file: any;
    onClose: () => void;
}

export default function FileProperties({ file, onClose }: FilePropertiesProps) {
    const [activeTab, setActiveTab] = React.useState(0);

    const getFileSize = () => {
        if (!file.content) return "0 KB";
        const bytes = file.content.length;
        if (bytes < 1024) return `${bytes} bytes`;
        return `${(bytes / 1024).toFixed(2)} KB`;
    };

    const getFileType = () => {
        if (file.name.includes('.txt')) return 'Text Document';
        if (file.name.includes('.mp3')) return 'MP3 Audio File';
        if (file.name.includes('.avi')) return 'Video File';
        if (file.name.includes('.jpg') || file.name.includes('.jpeg')) return 'JPEG Image';
        if (file.name.includes('.zip')) return 'Compressed Folder';
        if (file.name.includes('.doc')) return 'Microsoft Word Document';
        return 'File';
    };

    const getFileIcon = () => {
        if (file.name.includes('.txt')) return '📄';
        if (file.name.includes('.mp3')) return '🎵';
        if (file.name.includes('.avi')) return '🎬';
        if (file.name.includes('.jpg') || file.name.includes('.jpeg')) return '🖼️';
        if (file.name.includes('.zip')) return '📦';
        if (file.name.includes('.doc')) return '📝';
        return '📄';
    };

    return (
        <Window
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                zIndex: 1000
            }}
        >
            <WindowHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{file.name} Properties</span>
                <Button size="sm" square onClick={onClose}>
                    <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>×</span>
                </Button>
            </WindowHeader>
            <WindowContent>
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tab value={0}>General</Tab>
                    {file.metadata && <Tab value={1}>Metadata</Tab>}
                </Tabs>
                <TabBody style={{ height: '280px', overflow: 'auto' }}>
                    {activeTab === 0 && (
                        <div style={{ padding: '16px' }}>
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '16px',
                                paddingBottom: '16px',
                                borderBottom: '1px solid #ccc'
                            }}>
                                <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                                    {getFileIcon()}
                                </div>
                                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                                    {file.name}
                                </div>
                            </div>

                            <table style={{
                                width: '100%',
                                fontSize: '11px',
                                fontFamily: 'Arial'
                            }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Type:</td>
                                        <td style={{ padding: '4px 8px' }}>{getFileType()}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Location:</td>
                                        <td style={{ padding: '4px 8px' }}>Recycle Bin</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Size:</td>
                                        <td style={{ padding: '4px 8px' }}>{getFileSize()}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Created:</td>
                                        <td style={{ padding: '4px 8px' }}>Unknown</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>Modified:</td>
                                        <td style={{ padding: '4px 8px' }}>Unknown</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 1 && file.metadata && (
                        <div style={{ padding: '16px' }}>
                            <h4 style={{
                                marginBottom: '12px',
                                paddingBottom: '8px',
                                borderBottom: '2px solid #000080',
                                color: '#000080'
                            }}>
                                📋 File Metadata
                            </h4>
                            <div style={{
                                background: '#fffacd',
                                border: '2px solid #ffd700',
                                padding: '12px',
                                marginBottom: '12px',
                                fontSize: '11px'
                            }}>
                                <strong>🔍 Clue Hunter Alert!</strong>
                                <br />
                                This file contains hidden metadata that might be useful...
                            </div>
                            <table style={{
                                width: '100%',
                                fontSize: '11px',
                                fontFamily: 'Courier New',
                                background: '#f0f0f0',
                                border: '1px solid #ccc'
                            }}>
                                <tbody>
                                    {Object.entries(file.metadata).map(([key, value]: [string, any]) => (
                                        <tr key={key}>
                                            <td style={{
                                                padding: '8px',
                                                fontWeight: 'bold',
                                                borderBottom: '1px solid #ddd',
                                                verticalAlign: 'top',
                                                width: '120px'
                                            }}>
                                                {key}:
                                            </td>
                                            <td style={{
                                                padding: '8px',
                                                borderBottom: '1px solid #ddd',
                                                color: '#c00',
                                                fontWeight: 'bold'
                                            }}>
                                                {String(value)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </TabBody>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '8px',
                    borderTop: '1px solid #ccc'
                }}>
                    <Button onClick={onClose}>OK</Button>
                </div>
            </WindowContent>
        </Window>
    );
}