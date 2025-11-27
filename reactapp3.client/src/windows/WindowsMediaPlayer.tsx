// src/windows/WindowsMediaPlayer.tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { currentUser } from "../store/atoms";
import { Button, Toolbar, Separator } from "react95";

export default function WindowsMediaPlayer({ window }: any) {
    const user = useRecoilValue(currentUser);
    const [selectedPlaylist, setSelectedPlaylist] = React.useState<number>(0);
    const [selectedTrack, setSelectedTrack] = React.useState<number>(-1);
    const [isPlaying, setIsPlaying] = React.useState(false);

    // Get playlist data from the window config
    const playlists = window?.playlists || [];

    const currentPlaylist = playlists[selectedPlaylist];
    const currentTrack = currentPlaylist?.tracks?.[selectedTrack];

    const handleTrackClick = (index: number) => {
        setSelectedTrack(index);
        setIsPlaying(false);
    };

    const handlePlay = () => {
        if (selectedTrack === -1 && currentPlaylist?.tracks?.length > 0) {
            setSelectedTrack(0);
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleStop = () => {
        setIsPlaying(false);
        setSelectedTrack(-1);
    };

    const handleNext = () => {
        if (currentPlaylist?.tracks && selectedTrack < currentPlaylist.tracks.length - 1) {
            setSelectedTrack(selectedTrack + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedTrack > 0) {
            setSelectedTrack(selectedTrack - 1);
        }
    };

    if (!playlists || playlists.length === 0) {
        return (
            <div style={{
                padding: '32px',
                textAlign: 'center',
                fontFamily: 'Arial',
                background: 'white',
                height: '100%'
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎵</div>
                <h3>No playlists found</h3>
                <p style={{ color: '#666', marginTop: '8px' }}>This user hasn't created any playlists yet.</p>
            </div>
        );
    }

    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#000',
            color: '#0f0'
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(to bottom, #000080, #1084d0)',
                color: 'white',
                padding: '8px 16px',
                fontFamily: 'Arial',
                fontSize: '14px',
                fontWeight: 'bold'
            }}>
                🎵 Windows Media Player
            </div>

            {/* Toolbar */}
            <Toolbar style={{ background: '#c0c0c0', marginBottom: 0 }}>
                <Button
                    variant="menu"
                    size="sm"
                    onClick={handlePlay}
                    disabled={!currentPlaylist?.tracks?.length}
                >
                    ▶️ Play
                </Button>
                <Button
                    variant="menu"
                    size="sm"
                    onClick={handlePause}
                    disabled={!isPlaying}
                >
                    ⏸️ Pause
                </Button>
                <Button
                    variant="menu"
                    size="sm"
                    onClick={handleStop}
                    disabled={selectedTrack === -1}
                >
                    ⏹️ Stop
                </Button>
                <Separator orientation="vertical" />
                <Button
                    variant="menu"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={selectedTrack <= 0}
                >
                    ⏮️ Previous
                </Button>
                <Button
                    variant="menu"
                    size="sm"
                    onClick={handleNext}
                    disabled={!currentPlaylist?.tracks || selectedTrack >= currentPlaylist.tracks.length - 1}
                >
                    ⏭️ Next
                </Button>
            </Toolbar>

            <Separator />

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                background: '#000'
            }}>
                {/* Playlist Sidebar */}
                <div style={{
                    width: '200px',
                    background: '#1a1a1a',
                    borderRight: '1px solid #333',
                    padding: '8px',
                    overflow: 'auto'
                }}>
                    <h4 style={{
                        color: '#0f0',
                        marginBottom: '8px',
                        fontSize: '12px',
                        fontFamily: 'Arial'
                    }}>
                        PLAYLISTS
                    </h4>
                    {playlists.map((playlist: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectedPlaylist(index);
                                setSelectedTrack(-1);
                                setIsPlaying(false);
                            }}
                            style={{
                                padding: '8px',
                                marginBottom: '4px',
                                background: selectedPlaylist === index ? '#0f0' : '#2a2a2a',
                                color: selectedPlaylist === index ? '#000' : '#0f0',
                                cursor: 'pointer',
                                fontSize: '11px',
                                fontFamily: 'Arial',
                                borderRadius: '2px'
                            }}
                        >
                            📁 {playlist.name}
                        </div>
                    ))}
                </div>

                {/* Track List */}
                <div style={{
                    flex: 1,
                    padding: '16px',
                    overflow: 'auto'
                }}>
                    {currentPlaylist && (
                        <>
                            <h3 style={{
                                color: '#0f0',
                                marginBottom: '16px',
                                fontFamily: 'Arial',
                                fontSize: '16px'
                            }}>
                                {currentPlaylist.name}
                            </h3>
                            <div style={{
                                border: '1px solid #333',
                                background: '#0a0a0a'
                            }}>
                                {currentPlaylist.tracks.map((track: string, index: number) => (
                                    <div
                                        key={index}
                                        onClick={() => handleTrackClick(index)}
                                        style={{
                                            padding: '8px 12px',
                                            borderBottom: index < currentPlaylist.tracks.length - 1 ? '1px solid #222' : 'none',
                                            background: selectedTrack === index ? '#0f0' : 'transparent',
                                            color: selectedTrack === index ? '#000' : '#0f0',
                                            cursor: 'pointer',
                                            fontFamily: 'Courier New',
                                            fontSize: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <span style={{ minWidth: '20px' }}>
                                            {selectedTrack === index && isPlaying ? '▶️' : `${index + 1}.`}
                                        </span>
                                        <span>{track}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Now Playing Bar */}
            <div style={{
                background: '#1a1a1a',
                borderTop: '1px solid #333',
                padding: '12px 16px',
                fontFamily: 'Arial',
                fontSize: '11px'
            }}>
                <div style={{ marginBottom: '4px', color: '#666' }}>
                    NOW PLAYING:
                </div>
                <div style={{ color: '#0f0', fontWeight: 'bold' }}>
                    {currentTrack ? currentTrack : 'Nothing playing'}
                </div>
                {isPlaying && currentTrack && (
                    <div style={{
                        marginTop: '8px',
                        color: '#0f0',
                        fontSize: '10px'
                    }}>
                        ▶️ Playing... (this is just for show, no actual audio!)
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div style={{
                background: '#c0c0c0',
                borderTop: '2px solid #808080',
                padding: '4px 8px',
                fontSize: '11px',
                fontFamily: 'Arial',
                color: '#000',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <span>
                    {currentPlaylist?.tracks?.length || 0} track(s) in playlist
                </span>
                <span>Windows Media Player 7.0</span>
            </div>
        </div>
    );
}