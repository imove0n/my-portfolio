import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LoadingPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [compileStatus, setCompileStatus] = useState('> Initializing system...');
    const [showComplete, setShowComplete] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [displayedName, setDisplayedName] = useState('');
    const [displayedTitle, setDisplayedTitle] = useState('');
    const canvasRef = useRef(null);

    const messages = [
        { id: 'msg1', text: '> Establishing secure connection...', threshold: 10, icon: '[●]' },
        { id: 'msg2', text: '> Loading security protocols...', threshold: 25, icon: '[▲]' },
        { id: 'msg3', text: '> Decrypting database credentials...', threshold: 45, icon: '[◆]' },
        { id: 'msg4', text: '> Compiling ERP modules...', threshold: 65, icon: '[■]' },
        { id: 'msg5', text: '> Running security audit...', threshold: 85, icon: '[◉]' },
        { id: 'msg6', text: '> ACCESS GRANTED', threshold: 95, icon: '[✓]' }
    ];

    const compileTexts = [
        '> Initializing system...',
        '> Loading security protocols...',
        '> Establishing encrypted tunnel...',
        '> Authenticating credentials...',
        '> Finalizing handshake...',
        '> SYSTEM READY'
    ];

    // Typing effect for name and title
    useEffect(() => {
        const name = 'LAURENCE DE GUZMAN';
        const title = '[ CYBERSECURITY & ERP SPECIALIST ]';
        let nameIndex = 0;
        let titleIndex = 0;

        const nameTimer = setInterval(() => {
            if (nameIndex < name.length) {
                setDisplayedName(name.substring(0, nameIndex + 1));
                nameIndex++;
            } else {
                clearInterval(nameTimer);
            }
        }, 80);

        const titleTimer = setTimeout(() => {
            const titleInterval = setInterval(() => {
                if (titleIndex < title.length) {
                    setDisplayedTitle(title.substring(0, titleIndex + 1));
                    titleIndex++;
                } else {
                    clearInterval(titleInterval);
                }
            }, 50);
        }, name.length * 80);

        return () => {
            clearInterval(nameTimer);
            clearTimeout(titleTimer);
        };
    }, []);

    // Matrix rain effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテト';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                const increment = Math.random() > 0.7 ? 2 : 1;
                const newProgress = Math.min(prev + increment, 100);

                messages.forEach((msg, index) => {
                    if (newProgress >= msg.threshold && messageIndex === index) {
                        setMessageIndex(index + 1);
                        if (index < compileTexts.length) {
                            setCompileStatus(compileTexts[index]);
                        }
                    }
                });

                if (newProgress >= 100) {
                    clearInterval(progressTimer);
                    setTimeout(() => {
                        setShowComplete(true);
                    }, 500);
                }

                return newProgress;
            });
        }, 50);

        setTimeout(() => {
            startAutoPlay();
        }, 1000);

        return () => clearInterval(progressTimer);
    }, [messageIndex]);

    const startAutoPlay = () => {
        if (!hasPlayed) {
            const audio = document.getElementById('backgroundMusic');
            if (audio) {
                audio.volume = 0.4;
                audio.play().then(() => {
                    setHasPlayed(true);
                    console.log('Background music started');
                }).catch(e => {
                    console.log('Autoplay prevented, trying on user interaction');
                });
            }
        }
    };

    const toggleMute = () => {
        const audio = document.getElementById('backgroundMusic');
        if (audio) {
            if (isMuted) {
                audio.muted = false;
                setIsMuted(false);
            } else {
                audio.muted = true;
                setIsMuted(true);
            }
        }
    };

    const enterPortfolio = () => {
        const audio = document.getElementById('backgroundMusic');
        if (audio && !audio.muted) {
            let currentVolume = audio.volume;
            const fadeOut = setInterval(() => {
                if (currentVolume > 0.1) {
                    currentVolume -= 0.1;
                    audio.volume = currentVolume;
                } else {
                    audio.pause();
                    clearInterval(fadeOut);
                }
            }, 100);
        }

        const container = document.querySelector('.intro-container');
        if (container) {
            container.style.transition = 'all 0.5s ease-out';
            container.style.transform = 'scale(0.9)';
            container.style.opacity = '0';
        }

        setTimeout(() => {
            router.push('/portfolio');
        }, 500);
    };

    return (
        <>
            <Head>
                <title>Laurence De Guzman - Loading...</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>{`
                    body {
                        cursor: url('/doto.cur'), auto;
                        font-family: 'Courier New', 'JetBrains Mono', monospace;
                        background: #000000;
                        color: #00ff00;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                        position: relative;
                        padding: clamp(1rem, 3vw, 2rem);
                        box-sizing: border-box;
                        margin: 0;
                    }

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body::before {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background:
                            repeating-linear-gradient(
                                0deg,
                                rgba(0, 255, 0, 0.03) 0px,
                                transparent 1px,
                                transparent 2px,
                                rgba(0, 255, 0, 0.03) 3px
                            );
                        pointer-events: none;
                        z-index: 1;
                        animation: scanline 8s linear infinite;
                    }

                    @keyframes scanline {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(100%); }
                    }

                    body::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 255, 0, 0.02);
                        pointer-events: none;
                        z-index: 1;
                        animation: flicker 0.15s infinite;
                    }

                    @keyframes flicker {
                        0% { opacity: 0.97; }
                        50% { opacity: 1; }
                        100% { opacity: 0.95; }
                    }

                    #matrixCanvas {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.15;
                        z-index: 0;
                    }

                    .intro-container {
                        text-align: left;
                        max-width: min(90vw, 700px);
                        width: 100%;
                        padding: clamp(2rem, 4vw, 3rem);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        box-sizing: border-box;
                        background: rgba(0, 20, 0, 0.8);
                        border: 2px solid #00ff00;
                        box-shadow: 0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 20px rgba(0, 255, 0, 0.1);
                        position: relative;
                        z-index: 2;
                    }

                    .name {
                        font-size: clamp(1.5rem, 5vw, 2.5rem);
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        color: #00ff00;
                        font-family: 'Courier New', monospace;
                        letter-spacing: 2px;
                        text-shadow: 0 0 10px #00ff00;
                        line-height: 1.2;
                        min-height: 3rem;
                    }

                    .name::after {
                        content: '▌';
                        animation: blink 1s infinite;
                    }

                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }

                    .title {
                        font-size: clamp(0.9rem, 3vw, 1.2rem);
                        color: #00cc00;
                        margin-bottom: 2rem;
                        font-weight: 400;
                        letter-spacing: 1px;
                        line-height: 1.4;
                        min-height: 1.5rem;
                        text-shadow: 0 0 5px #00ff00;
                    }

                    .loading-section {
                        margin: 1rem 0;
                    }

                    .compile-text {
                        font-size: clamp(0.85rem, 2.5vw, 1rem);
                        color: #00ff00;
                        margin-bottom: 1.5rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-family: 'Courier New', monospace;
                        text-shadow: 0 0 5px #00ff00;
                    }

                    .spinner {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border: 2px solid #00ff00;
                        border-radius: 50%;
                        animation: pulse 1s ease-in-out infinite;
                    }

                    @keyframes pulse {
                        0%, 100% {
                            box-shadow: 0 0 5px #00ff00;
                            opacity: 1;
                        }
                        50% {
                            box-shadow: 0 0 15px #00ff00;
                            opacity: 0.5;
                        }
                    }

                    .progress-container {
                        width: 100%;
                        margin: 1rem 0;
                        background: rgba(0, 50, 0, 0.5);
                        border: 1px solid #00ff00;
                        overflow: hidden;
                        position: relative;
                        height: 30px;
                        box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.2);
                    }

                    .progress-bar {
                        height: 100%;
                        background: #00ff00;
                        transition: width 0.2s ease;
                        position: relative;
                        box-shadow: 0 0 10px #00ff00;
                    }

                    .progress-bar::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(0, 0, 0, 0.2) 10px,
                            rgba(0, 0, 0, 0.2) 20px
                        );
                        animation: moveStripes 1s linear infinite;
                    }

                    @keyframes moveStripes {
                        0% { background-position: 0 0; }
                        100% { background-position: 28px 0; }
                    }

                    .progress-text {
                        margin-top: 0.5rem;
                        font-size: clamp(0.85rem, 2.5vw, 1rem);
                        color: #00ff00;
                        font-family: 'Courier New', monospace;
                        text-shadow: 0 0 5px #00ff00;
                    }

                    .percentage {
                        color: #00ff00;
                        font-weight: 700;
                    }

                    .status-messages {
                        margin-top: 1.5rem;
                        margin-bottom: 1.5rem;
                        text-align: left;
                        background: rgba(0, 10, 0, 0.5);
                        border: 1px solid #00ff00;
                        border-left: 4px solid #00ff00;
                        padding: 1rem;
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        box-sizing: border-box;
                        min-height: 150px;
                        box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.1);
                    }

                    .fade-message {
                        animation: fadeInTerminal 0.3s ease-in;
                    }

                    @keyframes fadeInTerminal {
                        0% {
                            opacity: 0;
                            transform: translateX(-10px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }

                    .status-message {
                        font-size: clamp(0.75rem, 2vw, 0.85rem);
                        color: #00ff00;
                        margin-bottom: 0.2rem;
                        opacity: 0;
                        font-family: 'Courier New', monospace;
                        line-height: 1.5;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        text-shadow: 0 0 3px #00ff00;
                    }

                    .status-message.show {
                        opacity: 1;
                        transform: translateX(0);
                    }

                    .status-message .success { color: #00ff00; display: inline; }
                    .status-message .primary { color: #00ff00; display: inline; }
                    .status-message .accent { color: #00cc00; display: inline; }

                    .status-icon {
                        font-size: 0.9rem;
                        color: #00ff00;
                        flex-shrink: 0;
                        display: inline-block;
                        font-family: 'Courier New', monospace;
                        font-weight: bold;
                    }

                    .complete-section {
                        margin-top: 2rem;
                        opacity: 0;
                        transform: translateY(20px);
                        transition: all 0.5s ease;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: center;
                    }

                    .complete-section.show {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .success-message {
                        font-size: clamp(0.95rem, 2.5vw, 1.1rem);
                        color: #00ff00;
                        margin-bottom: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-family: 'Courier New', monospace;
                        text-shadow: 0 0 10px #00ff00;
                        animation: glowPulse 2s ease-in-out infinite;
                    }

                    @keyframes glowPulse {
                        0%, 100% { text-shadow: 0 0 10px #00ff00; }
                        50% { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
                    }

                    .enter-button {
                        background: transparent;
                        color: #00ff00;
                        border: 2px solid #00ff00;
                        padding: clamp(12px, 3vw, 15px) clamp(30px, 6vw, 40px);
                        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: 'Courier New', monospace;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        min-height: 44px;
                        touch-action: manipulation;
                        letter-spacing: 2px;
                        text-shadow: 0 0 5px #00ff00;
                        box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.1);
                        position: relative;
                        overflow: hidden;
                    }

                    .enter-button::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 255, 0, 0.2);
                        transition: left 0.5s ease;
                    }

                    .enter-button:hover::before {
                        left: 100%;
                    }

                    .enter-button:hover {
                        background: rgba(0, 255, 0, 0.1);
                        box-shadow: 0 0 20px rgba(0, 255, 0, 0.8), inset 0 0 20px rgba(0, 255, 0, 0.2);
                        transform: translateX(5px);
                    }

                    .enter-button:active {
                        transform: translateX(2px);
                    }

                    .audio-controls {
                        position: fixed;
                        bottom: clamp(15px, 4vw, 20px);
                        right: clamp(15px, 4vw, 20px);
                        display: flex;
                        gap: 10px;
                        z-index: 1000;
                    }

                    .audio-btn {
                        background: rgba(0, 20, 0, 0.8);
                        border: 2px solid #00ff00;
                        color: #00ff00;
                        width: clamp(40px, 10vw, 50px);
                        height: clamp(40px, 10vw, 50px);
                        border-radius: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: clamp(14px, 3.5vw, 16px);
                        min-height: 44px;
                        min-width: 44px;
                        touch-action: manipulation;
                        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
                    }

                    .audio-btn:hover {
                        background: rgba(0, 255, 0, 0.1);
                        border-color: #00ff00;
                        transform: scale(1.1);
                        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
                    }

                    .audio-btn:active {
                        transform: scale(0.95);
                    }

                    .audio-btn.active {
                        background: rgba(0, 255, 0, 0.2);
                        border-color: #00ff00;
                        box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
                    }

                    @media (max-width: 768px) {
                        body {
                            padding: 1rem;
                            overflow-x: hidden;
                        }

                        .intro-container {
                            padding: 1.5rem;
                            max-width: 95vw;
                        }

                        .status-messages {
                            padding: 0.75rem;
                            min-height: 120px;
                        }

                        .status-message {
                            font-size: 0.75rem;
                        }
                    }

                    @media (max-width: 480px) {
                        body { padding: 0.5rem; }
                        .intro-container { padding: 1rem; max-width: 100%; }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        *, *::before, *::after {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                        #matrixCanvas { display: none; }
                    }
                `}</style>
            </Head>

            <audio id="backgroundMusic" preload="auto">
                <source src="/electronic-game2-332868.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <canvas ref={canvasRef} id="matrixCanvas"></canvas>

            <div className="audio-controls">
                <button 
                    className={`audio-btn ${!isMuted ? 'active' : ''}`} 
                    onClick={toggleMute}
                    title="Mute/Unmute Music"
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>

            <div className="intro-container">
                <h1 className="name">{displayedName}</h1>
                <p className="title">{displayedTitle}</p>
                
                <div className="loading-section">
                    <div className="compile-text">
                        <div className="spinner" style={{ display: showComplete ? 'none' : 'block' }}></div>
                        <span>{compileStatus}</span>
                    </div>
                    
                    <div className="progress-container">
                        <div 
                            className="progress-bar" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    
                    <div className="progress-text">
                        <span className="percentage">{Math.floor(progress)}%</span> complete
                    </div>
                    
                    <div className="status-messages">
                        {messages.map((msg, index) => {
                            return messageIndex === index + 1 && (
                                <div
                                    key={msg.id}
                                    className="status-message show fade-message"
                                >
                                    <span className="status-icon">{msg.icon}</span>
                                    <span>{msg.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                <div className={`complete-section ${showComplete ? 'show' : ''}`}>
                    <div className="success-message">
                        <span>[✓]</span>
                        <span>SYSTEM READY - ACCESS GRANTED</span>
                    </div>
                    <button className="enter-button" onClick={enterPortfolio}>
                        <span>{'>'}</span>
                        <span>ENTER PORTFOLIO</span>
                    </button>
                </div>
            </div>
        </>
    );
}