// src/windows/RecycleBin.tsx
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUser, windowObj } from "../store/atoms";
import { Table, TableBody, TableHead, TableRow, TableHeadCell, TableDataCell } from "react95";
import FileProperties from "./FileProperties";

export default function RecycleBin() {
    const user = useRecoilValue(currentUser);
    const [currentWindows, setWindows] = useRecoilState(windowObj);
    const [selectedFile, setSelectedFile] = React.useState<any>(null);
    const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number; file: any } | null>(null);
    const [showProperties, setShowProperties] = React.useState<any>(null);

    if (!user || !user.desktop.recycleBin) {
        return (
            <div style={{ padding: '16px', fontFamily: 'Arial' }}>
                <p>Recycle Bin is empty.</p>
            </div>
        );
    }

    const files = user.desktop.recycleBin;

    const handleFileDoubleClick = (file: any) => {
        // Open the file in a new window
        const windowName = `recyclebin_${file.id}`;
        const windowConfig = {
            label: file.name,
            header: `${file.name} - Notepad`,
            desktopIcon: "",
            visibility: [true, true],
            content: file.content,
            type: file.type,
            metadata: file.metadata
        };

        setWindows({
            ...currentWindows,
            [windowName]: windowConfig
        });
    };

    const handleFileClick = (file: any) => {
        setSelectedFile(file);
    };

    const handleRightClick = (e: React.MouseEvent, file: any) => {
        e.preventDefault();
        e.stopPropagation();

        // Workaround for WindowFrame transform creating a new positioning context
        // Empirically determined offsets for Firefox + WindowFrame transform
        const x = (e.clientX / 2) - 150;
        const y = (e.clientY / 2);

        console.log('Click at:', e.clientX, e.clientY, '-> Menu at:', x, y);

        setContextMenu({ x, y, file });
    };

    const handleViewProperties = () => {
        console.log('View properties clicked', contextMenu);
        if (contextMenu) {
            console.log('Setting showProperties to:', contextMenu.file);
            setShowProperties(contextMenu.file);
        }
        setContextMenu(null);
    };

    // Close context menu when clicking outside
    React.useEffect(() => {
        if (contextMenu) {
            const handleClick = () => setContextMenu(null);
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    if (files.length === 0) {
        return (
            <div style={{
                padding: '32px',
                textAlign: 'center',
                fontFamily: 'Arial',
                color: '#666'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗑️</div>
                <p>Recycle Bin is empty.</p>
            </div>
        );
    }

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'white'
        }}>
            <div style={{
                padding: '8px',
                background: '#c0c0c0',
                borderBottom: '2px solid #808080',
                fontFamily: 'Arial',
                fontSize: '11px'
            }}>
                <strong>{files.length}</strong> item{files.length !== 1 ? 's' : ''} in Recycle Bin
            </div>

            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '8px'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell style={{ width: '40px' }}>Icon</TableHeadCell>
                            <TableHeadCell>Name</TableHeadCell>
                            <TableHeadCell>Type</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file: any) => (
                            <TableRow
                                key={file.id}
                                onClick={() => handleFileClick(file)}
                                onDoubleClick={() => handleFileDoubleClick(file)}
                                onContextMenu={(e) => handleRightClick(e, file)}
                                style={{
                                    cursor: 'pointer',
                                    background: selectedFile?.id === file.id ? '#000080' : 'transparent',
                                    color: selectedFile?.id === file.id ? 'white' : 'black'
                                }}
                            >
                                <TableDataCell style={{ textAlign: 'center', fontSize: '20px' }}>
                                    {file.type === 'file' && file.name.includes('.mp3') && '🎵'}
                                    {file.type === 'file' && file.name.includes('.avi') && '🎬'}
                                    {file.type === 'file' && file.name.includes('.jpg') && '🖼️'}
                                    {file.type === 'file' && file.name.includes('.zip') && '📦'}
                                    {file.type === 'file' && file.name.includes('.txt') && '📄'}
                                    {!file.name.match(/\.(mp3|avi|jpg|zip|txt)/) && '📄'}
                                </TableDataCell>
                                <TableDataCell>{file.name}</TableDataCell>
                                <TableDataCell>
                                    {file.name.includes('.mp3') && 'Audio File'}
                                    {file.name.includes('.avi') && 'Video File'}
                                    {file.name.includes('.jpg') && 'Image'}
                                    {file.name.includes('.zip') && 'Compressed'}
                                    {file.name.includes('.txt') && 'Text Document'}
                                    {!file.name.match(/\.(mp3|avi|jpg|zip|txt)/) && 'File'}
                                </TableDataCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div style={{
                padding: '8px',
                background: '#c0c0c0',
                borderTop: '2px solid #808080',
                fontFamily: 'Arial',
                fontSize: '11px',
                color: '#666'
            }}>
                💡 Tip: Double-click to open files | Right-click for properties
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <div
                    style={{
                        position: 'fixed',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        background: '#c0c0c0',
                        border: '2px outset #fff',
                        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        zIndex: 10000,
                        minWidth: '150px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        style={{
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontFamily: 'Arial'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#000080'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        onClick={() => handleFileDoubleClick(contextMenu.file)}
                    >
                        Open
                    </div>
                    <div style={{ borderTop: '1px solid #808080', margin: '2px 0' }} />
                    <div
                        style={{
                            padding: '4px 8px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontFamily: 'Arial'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#000080';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'black';
                        }}
                        onClick={handleViewProperties}
                    >
                        Properties
                    </div>
                </div>
            )}

            {/* Properties Window - render outside the container */}
            {showProperties && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10001 }}>
                    <FileProperties
                        file={showProperties}
                        onClose={() => setShowProperties(null)}
                    />
                </div>
            )}
        </div>
    );
}