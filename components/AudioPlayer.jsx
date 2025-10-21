import React, { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ theme }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(50);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [audioError, setAudioError] = useState(false);

    // Playlist state
    const [playlist] = useState([
        { id: 1, src: '/1.mp3', title: 'Track 1' },
        { id: 2, src: '/2.mp3', title: 'Track 2' },
        { id: 3, src: '/3-01. Hateno Village.mp3', title: 'Track 3' },
        { id: 4, src: '/4.mp3', title: 'Track 4' },
        { id: 5, src: '/5.mp3', title: 'Track 5' },
        { id: 6, src: '/6.mp3', title: 'Track 6' },
        { id: 7, src: '/Track 7.mp3', title: 'Track 7' },
        { id: 8, src: '/Track 8.mp3', title: 'Track 8' }
    ]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(2); // Start with Hateno Village (index 2)

    // Format time helper
    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Audio event listeners
    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;

            const handleTimeUpdate = () => {
                setCurrentTime(audio.currentTime);
            };

            const handleDurationChange = () => {
                setDuration(audio.duration);
            };

            const handleError = () => {
                setAudioError(true);
            };

            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('durationchange', handleDurationChange);
            audio.addEventListener('error', handleError);

            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('durationchange', handleDurationChange);
                audio.removeEventListener('error', handleError);
            };
        }
    }, [currentTrackIndex]);

    // Handle track end
    const playNext = () => {
        if (isLooping) {
            // Loop current track
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(err => console.error('Error looping track:', err));
            }
        } else {
            // Play next track automatically
            handleNext();
        }
    };

    // Volume control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Play/Pause toggle
    const togglePlayPause = async () => {
        if (audioRef.current && !audioError) {
            try {
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                } else {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (error) {
                console.error('Audio play failed:', error);
            }
        }
    };

    // Seek in track
    const handleProgressClick = (e) => {
        if (audioRef.current && duration) {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audioRef.current.currentTime = percent * duration;
        }
    };

    // Drag progress bar
    const handleProgressDrag = (e) => {
        const progressBar = e.currentTarget;
        const handleMove = (moveEvent) => {
            if (audioRef.current && duration) {
                const rect = progressBar.getBoundingClientRect();
                const percent = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                audioRef.current.currentTime = percent * duration;
            }
        };

        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    };

    // Volume control
    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    // Mute toggle
    const toggleMute = () => {
        if (!isMuted) {
            setPreviousVolume(volume);
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        } else {
            setVolume(previousVolume);
            if (audioRef.current) {
                audioRef.current.volume = previousVolume / 100;
            }
        }
        setIsMuted(!isMuted);
    };

    // Next track
    const handleNext = () => {
        let nextIndex;
        if (isShuffle) {
            do {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } while (nextIndex === currentTrackIndex && playlist.length > 1);
        } else {
            nextIndex = (currentTrackIndex + 1) % playlist.length;
        }

        setCurrentTrackIndex(nextIndex);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.src = playlist[nextIndex].src;
            if (isPlaying) {
                audioRef.current.play().catch(err => console.error('Error playing next track:', err));
            }
        }
    };

    // Previous track
    const handlePrevious = () => {
        const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        setCurrentTrackIndex(prevIndex);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.src = playlist[prevIndex].src;
            if (isPlaying) {
                audioRef.current.play().catch(err => console.error('Error playing previous track:', err));
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} onEnded={playNext}>
                <source src={playlist[currentTrackIndex].src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className={`audio-player ${isMinimized ? 'minimized' : ''}`}>
                {!isMinimized && (
                    <div className="player-header">
                        <span className="player-title">Music Player</span>
                        <button
                            className="minimize-btn"
                            onClick={() => setIsMinimized(true)}
                            title="Minimize player"
                        >
                            <i className="fas fa-compress"></i>
                        </button>
                    </div>
                )}

                <button
                    className="play-pause-btn"
                    onClick={isMinimized ? () => setIsMinimized(false) : togglePlayPause}
                    disabled={audioError}
                    title={isMinimized ? 'Expand player' : (isPlaying ? 'Pause' : 'Play')}
                >
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>

                {!isMinimized && (
                    <>
                        <div className="audio-info">
                            <div className="audio-title">
                                {audioError ? 'Audio Unavailable' : playlist[currentTrackIndex].title}
                            </div>
                            <div className="audio-progress">
                                <span>{formatTime(currentTime)}</span>
                                <div
                                    className="progress-bar"
                                    onClick={handleProgressClick}
                                    onMouseDown={handleProgressDrag}
                                >
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    >
                                        <div className="progress-thumb"></div>
                                    </div>
                                </div>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className="audio-controls">
                            <button
                                className="control-btn"
                                onClick={handlePrevious}
                                title="Previous track"
                            >
                                <i className="fas fa-step-backward"></i>
                            </button>
                            <button
                                className={`control-btn ${isShuffle ? 'active' : ''}`}
                                onClick={() => setIsShuffle(!isShuffle)}
                                title="Shuffle"
                            >
                                <i className="fas fa-random"></i>
                            </button>
                            <button
                                className={`control-btn ${isLooping ? 'active' : ''}`}
                                onClick={() => setIsLooping(!isLooping)}
                                title="Loop current track"
                            >
                                <i className="fas fa-redo"></i>
                            </button>
                            <button
                                className="control-btn"
                                onClick={handleNext}
                                title="Next track"
                            >
                                <i className="fas fa-step-forward"></i>
                            </button>
                        </div>

                        <div className="volume-control">
                            <button
                                className="control-btn"
                                onClick={toggleMute}
                                title={isMuted ? 'Unmute' : 'Mute'}
                            >
                                <i className={`fas fa-volume-${isMuted || volume === 0 ? 'mute' : volume < 50 ? 'down' : 'up'}`}></i>
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
