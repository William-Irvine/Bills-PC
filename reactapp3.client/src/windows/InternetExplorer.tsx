// src/windows/InternetExplorer.tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms";
import { Button, Toolbar, TextInput, Separator } from "react95";

export default function InternetExplorer({ window }: any) {
    const user = useRecoilValue(currentUser);
    const [activeTab, setActiveTab] = React.useState<'home' | 'history' | 'bookmarks'>('home');

    // Get browser data from the window config (passed from accountsData)
    // Try both window.browserHistory and window.window.browserHistory
    const browserHistory = window?.browserHistory || window?.window?.browserHistory || [];
    const bookmarks = window?.bookmarks || window?.window?.bookmarks || [];

    // Debug: Log what we're receiving
    console.log('InternetExplorer window data:', window);

    const renderHome = () => (
        <div style={{
            padding: '32px',
            textAlign: 'center',
            fontFamily: 'Arial',
            background: 'white',
            height: '100%'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <img
                    src="src/assets/images/ie_logo.png"
                    alt="Internet Explorer"
                    style={{ width: '64px', height: '64px' }}
                    onError={(e: any) => {
                        e.target.style.display = 'none';
                    }}
                />
            </div>
            <h2 style={{ marginBottom: '16px', color: '#000080' }}>
                Internet Explorer
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
                Welcome to {user?.displayName}'s browser
            </p>
            <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                <Button onClick={() => setActiveTab('history')}>
                    📜 View History
                </Button>
                <Button onClick={() => setActiveTab('bookmarks')}>
                    ⭐ View Favorites
                </Button>
            </div>
        </div>
    );

    const renderHistory = () => (
        <div style={{
            padding: '16px',
            fontFamily: 'Arial',
            background: 'white',
            height: '100%'
        }}>
            <h3 style={{ marginBottom: '16px', borderBottom: '2px solid #000080', paddingBottom: '8px' }}>
                📜 Browser History
            </h3>
            {browserHistory.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No browsing history</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {browserHistory.map((item: any, index: number) => (
                        <div
                            key={index}
                            style={{
                                padding: '12px',
                                background: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '2px'
                            }}
                        >
                            <div style={{
                                fontWeight: 'bold',
                                marginBottom: '4px',
                                color: '#000080'
                            }}>
                                🔗 {item.title}
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: '#666',
                                fontFamily: 'Courier New'
                            }}>
                                {item.url}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ marginTop: '16px', padding: '12px', background: '#fffacd', border: '1px solid #ffd700' }}>
                <strong>💡 Clue Hunter Tip:</strong> Browser history often reveals secrets about what someone has been researching...
            </div>
        </div>
    );

    const renderBookmarks = () => (
        <div style={{
            padding: '16px',
            fontFamily: 'Arial',
            background: 'white',
            height: '100%'
        }}>
            <h3 style={{ marginBottom: '16px', borderBottom: '2px solid #000080', paddingBottom: '8px' }}>
                ⭐ Favorites (Bookmarks)
            </h3>
            {bookmarks.length === 0 ? (
                <p style={{ color: '#666', fontStyle: 'italic' }}>No bookmarks saved</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {bookmarks.map((bookmark: string, index: number) => (
                        <div
                            key={index}
                            style={{
                                padding: '12px',
                                background: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <span style={{ fontSize: '16px' }}>📑</span>
                            <span style={{ color: '#000' }}>{bookmark}</span>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ marginTop: '16px', padding: '12px', background: '#fffacd', border: '1px solid #ffd700' }}>
                <strong>💡 Clue Hunter Tip:</strong> People often bookmark important pages... pay close attention to what's saved here!
            </div>
        </div>
    );

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#c0c0c0'
        }}>
            {/* Toolbar */}
            <Toolbar style={{ marginBottom: 0 }}>
                <Button
                    variant="menu"
                    size="sm"
                    disabled={activeTab === 'home'}
                    onClick={() => setActiveTab('home')}
                >
                    🏠 Home
                </Button>
                <Button
                    variant="menu"
                    size="sm"
                    active={activeTab === 'history'}
                    onClick={() => setActiveTab('history')}
                >
                    📜 History
                </Button>
                <Button
                    variant="menu"
                    size="sm"
                    active={activeTab === 'bookmarks'}
                    onClick={() => setActiveTab('bookmarks')}
                >
                    ⭐ Favorites
                </Button>
            </Toolbar>

            <Separator />

            {/* Address Bar */}
            <div style={{
                padding: '4px 8px',
                background: '#c0c0c0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{ fontSize: '11px', fontFamily: 'Arial' }}>Address:</span>
                <TextInput
                    value="about:blank"
                    readOnly
                    style={{ flex: 1 }}
                />
                <Button size="sm" disabled>Go</Button>
            </div>

            <Separator />

            {/* Content Area */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 'home' && renderHome()}
                {activeTab === 'history' && renderHistory()}
                {activeTab === 'bookmarks' && renderBookmarks()}
            </div>

            {/* Status Bar */}
            <div style={{
                padding: '4px 8px',
                background: '#c0c0c0',
                borderTop: '2px solid #808080',
                fontSize: '11px',
                fontFamily: 'Arial',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>
                    {activeTab === 'history' && `${browserHistory.length} item(s) in history`}
                    {activeTab === 'bookmarks' && `${bookmarks.length} bookmark(s)`}
                    {activeTab === 'home' && 'Ready'}
                </span>
                <span>🌐 Internet Explorer 5.0</span>
            </div>
        </div>
    );
}