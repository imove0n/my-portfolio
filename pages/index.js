import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function LoadingPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [compileStatus, setCompileStatus] = useState('Compiling JavaScript...');
    const [showComplete, setShowComplete] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    const messages = [
        { id: 'msg1', text: 'Initializing development environment...', threshold: 10 },
        { id: 'msg2', text: 'Loading React components...', threshold: 25 },
        { id: 'msg3', text: 'Connecting to databases...', threshold: 45 },
        { id: 'msg4', text: 'Building full-stack solutions...', threshold: 65 },
        { id: 'msg5', text: 'Optimizing performance...', threshold: 85 },
        { id: 'msg6', text: 'Portfolio ready!', threshold: 95 }
    ];

    const compileTexts = [
        'Compiling JavaScript...',
        'Building React components...',
        'Connecting databases...',
        'Optimizing full-stack solutions...',
        'Finalizing portfolio...',
        'Ready to deploy!'
    ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
        setProgress(prev => {
            const increment = 1;
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
                setShowComplete(true);
                // Smooth fade out before redirect
                setTimeout(() => {
                    const container = document.querySelector('.intro-container');
                    if (container) {
                        container.style.transition = 'all 1.2s ease-out';
                        container.style.transform = 'scale(0.95)';
                        container.style.opacity = '0';
                    }
                    setTimeout(() => {
                        router.push('/portfolio');
                    }, 1200);
                }, 500);
            }

            return newProgress;
        });
    }, 47);

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
                        font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                        color: #f8fafc;
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
                        position: absolute;
                        width: 200%;
                        height: 200%;
                        background:
                            radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.08) 0%, transparent 50%);
                        animation: backgroundMove 20s ease-in-out infinite;
                        z-index: -1;
                    }

                    .floating-symbols {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: -1;
                        overflow: hidden;
                    }

                    .symbol {
                        position: absolute;
                        color: rgba(14, 165, 233, 0.6);
                        font-family: 'JetBrains Mono', monospace;
                        font-weight: bold;
                        animation: riseUp 15s infinite ease-out;
                        z-index: 1;
                        text-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
                        filter: drop-shadow(0 0 8px rgba(14, 165, 233, 0.4));
                    }

                    .symbol:nth-child(1) {
                        bottom: -10%; left: 10%; font-size: clamp(16px, 4vw, 24px);
                        animation-delay: 0s; animation-duration: 12s;
                    }
                    .symbol:nth-child(2) {
                        bottom: -10%; right: 15%; font-size: clamp(20px, 5vw, 32px);
                        animation-delay: -2s; animation-duration: 15s;
                    }
                    .symbol:nth-child(3) {
                        bottom: -10%; left: 5%; font-size: clamp(18px, 4.5vw, 28px);
                        animation-delay: -4s; animation-duration: 13s;
                    }
                    .symbol:nth-child(4) {
                        bottom: -10%; right: 10%; font-size: clamp(17px, 4.2vw, 26px);
                        animation-delay: -6s; animation-duration: 14s;
                    }
                    .symbol:nth-child(5) {
                        bottom: -10%; left: 80%; font-size: clamp(19px, 4.8vw, 30px);
                        animation-delay: -8s; animation-duration: 16s;
                    }
                    .symbol:nth-child(6) {
                        bottom: -10%; left: 20%; font-size: clamp(15px, 3.8vw, 22px);
                        animation-delay: -1s; animation-duration: 11s;
                    }
                    .symbol:nth-child(7) {
                        bottom: -10%; right: 40%; font-size: clamp(21px, 5.2vw, 34px);
                        animation-delay: -5s; animation-duration: 17s;
                    }
                    .symbol:nth-child(8) {
                        bottom: -10%; left: 50%; font-size: clamp(16px, 4.1vw, 25px);
                        animation-delay: -3s; animation-duration: 12s;
                    }
                    .symbol:nth-child(9) {
                        bottom: -10%; left: 35%; font-size: clamp(19px, 4.5vw, 28px);
                        animation-delay: -7s; animation-duration: 14s;
                    }
                    .symbol:nth-child(10) {
                        bottom: -10%; right: 25%; font-size: clamp(17px, 4vw, 26px);
                        animation-delay: -9s; animation-duration: 13s;
                    }
                    .symbol:nth-child(11) {
                        bottom: -10%; left: 65%; font-size: clamp(20px, 4.8vw, 30px);
                        animation-delay: -10s; animation-duration: 15s;
                    }
                    .symbol:nth-child(12) {
                        bottom: -10%; right: 55%; font-size: clamp(18px, 4.3vw, 27px);
                        animation-delay: -11s; animation-duration: 16s;
                    }

                    @keyframes riseUp {
                        0% {
                            transform: translateY(0vh) translateX(0px) rotate(0deg) scale(0.8);
                            opacity: 0;
                        }
                        10% {
                            opacity: 0.7;
                        }
                        50% {
                            transform: translateY(-50vh) translateX(20px) rotate(180deg) scale(1);
                            opacity: 0.6;
                        }
                        80% {
                            opacity: 0.4;
                        }
                        100% {
                            transform: translateY(-110vh) translateX(-15px) rotate(360deg) scale(0.6);
                            opacity: 0;
                        }
                    }

                    @keyframes backgroundMove {
                        0%, 100% { transform: translateX(-50px) translateY(-50px) rotate(0deg); }
                        33% { transform: translateX(50px) translateY(-100px) rotate(120deg); }
                        66% { transform: translateX(-100px) translateY(50px) rotate(240deg); }
                    }

                    .intro-container {
                        text-align: center;
                        max-width: min(90vw, 600px);
                        width: 100%;
                        padding: clamp(1rem, 3vw, 2rem);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        box-sizing: border-box;
                        animation: containerFloat 6s ease-in-out infinite;
                    }

                    @keyframes containerFloat {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }

                    .name {
                        font-size: clamp(1.75rem, 7vw, 3rem);
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        background: linear-gradient(135deg, #f8fafc, #0ea5e9, #3b82f6, #0ea5e9);
                        background-size: 300% 100%;
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        animation: spiralEntrance 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                                   gradientShift 5s ease infinite 1.5s,
                                   wiggle 2s ease-in-out infinite 1.5s;
                        line-height: 1.1;
                        transform-origin: center;
                    }

                    @keyframes spiralEntrance {
                        0% {
                            opacity: 0;
                            transform: scale(0) rotate(0deg);
                            filter: blur(10px);
                        }
                        50% {
                            opacity: 0.5;
                            transform: scale(0.5) rotate(180deg);
                            filter: blur(5px);
                        }
                        80% {
                            transform: scale(1.1) rotate(350deg);
                            filter: blur(0px);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1) rotate(360deg);
                            filter: blur(0px);
                        }
                    }

                    @keyframes gradientShift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }

                    @keyframes wiggle {
                        0%, 100% {
                            transform: rotate(0deg) scale(1);
                        }
                        25% {
                            transform: rotate(2deg) scale(1.02);
                        }
                        50% {
                            transform: rotate(0deg) scale(1);
                        }
                        75% {
                            transform: rotate(-2deg) scale(1.02);
                        }
                    }

                    .title {
                        font-size: clamp(1rem, 3.5vw, 1.4rem);
                        color: #94a3b8;
                        margin-bottom: 1rem;
                        font-weight: 400;
                        opacity: 0;
                        animation: fadeInUp 1s ease 0.4s forwards;
                        line-height: 1.3;
                    }

                    .loading-section {
                        margin: 0.8rem 0;
                        opacity: 0;
                        animation: fadeInUp 1s ease 0.6s forwards;
                    }

                    .compile-text {
                        font-size: clamp(0.9rem, 2.8vw, 1.1rem);
                        color: #0ea5e9;
                        margin-bottom: 1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        flex-wrap: wrap;
                        animation: textPulse 3s ease-in-out infinite;
                    }

                    @keyframes textPulse {
                        0%, 100% {
                            opacity: 0.9;
                            filter: brightness(1);
                        }
                        50% {
                            opacity: 1;
                            filter: brightness(1.2);
                        }
                    }


                    .progress-container {
                        width: 100%;
                        max-width: min(90vw, 400px);
                        margin: 1rem auto;
                        background: rgba(30, 41, 59, 0.5);
                        border-radius: 10px;
                        overflow: hidden;
                        border: 1px solid rgba(14, 165, 233, 0.2);
                        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
                    }

                    .progress-bar {
                        height: clamp(6px, 2vw, 8px);
                        background: linear-gradient(90deg, #0ea5e9, #3b82f6);
                        border-radius: 10px;
                        transition: width 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }

                    .progress-bar::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
                        animation: shimmer 1.5s infinite;
                    }

                    .progress-bar::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
                        animation: pulse-glow 2s ease-in-out infinite;
                    }

                    @keyframes shimmer {
                        0% { left: -100%; }
                        100% { left: 100%; }
                    }

                    @keyframes pulse-glow {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 1; }
                    }

                 .progress-text {
                        margin-top: 1rem;
                        font-size: clamp(0.85rem, 2.5vw, 1rem);
                        color: #94a3b8;
                        font-family: 'JetBrains Mono', monospace;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0.5rem;
                    }

                    .percentage {
                        color: #10b981;
                        font-weight: 600;
                        animation: countPulse 0.5s ease-in-out;
                    }

                    @keyframes countPulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.15); color: #0ea5e9; }
                        100% { transform: scale(1); }
                    }

                    .loading-dots {
                        display: flex;
                        gap: 0.2rem;
                        align-items: center;
                        justify-content: center;
                        margin-top: 0.3rem;
                    }

                    .dot {
                        width: 10px;
                        height: 10px;
                        background: #0ea5e9;
                        border-radius: 50%;
                        animation: dotBounce 1.4s ease-in-out infinite;
                        box-shadow: 0 0 8px rgba(14, 165, 233, 0.4);
                    }

                    .dot:nth-child(1) {
                        animation-delay: 0s;
                    }

                    .dot:nth-child(2) {
                        animation-delay: 0.2s;
                    }

                    .dot:nth-child(3) {
                        animation-delay: 0.4s;
                    }

                    @keyframes dotBounce {
                        0%, 80%, 100% {
                            transform: scale(0.9) translateY(0);
                            opacity: 0.6;
                        }
                        40% {
                            transform: scale(1.1) translateY(-5px);
                            opacity: 1;
                            box-shadow: 0 0 12px rgba(14, 165, 233, 0.6);
                        }
                    }

                    .status-messages {
                        margin-top: 1rem;
                        margin-bottom: 2rem;
                        text-align: center;
                        background: transparent;
                        border-radius: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;
                        min-height: 180px;
                    }

                        .fade-message {
                        animation: fadeInOut 2.5s ease-in-out forwards;
                    }

                    @keyframes fadeInOut {
                        0% {
                            opacity: 0;
                            transform: translateX(20px);
                        }
                        15% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        70% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        100% {
                            opacity: 0;
                            transform: translateX(-20px);
                            display: none;
                        }
                    }

                    /* Scrollbar styles removed - no longer needed */

                    .status-message {
                        font-size: clamp(0.75rem, 2.2vw, 0.9rem);
                        color: #94a3b8;
                        margin-bottom: 0.3rem;
                        opacity: 0;
                        transform: translateY(10px);
                        font-family: 'JetBrains Mono', monospace;
                        line-height: 1.4;
                        word-break: break-word;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    }

                    .status-message.show {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .status-message .success { color: #10b981; display: inline; }
                    .status-message .primary { color: #0ea5e9; display: inline; }
                    .status-message .accent { color: #3b82f6; display: inline; }

                    .status-icon {
                        font-size: 1.2rem;
                        color: #0ea5e9;
                        animation: spinBounce 2s ease-in-out infinite;
                        flex-shrink: 0;
                        display: inline-block;
                        font-family: 'JetBrains Mono', monospace;
                        font-weight: bold;
                    }

                    @keyframes spinBounce {
                        0%, 100% {
                            transform: rotate(0deg) scale(1);
                            filter: brightness(1);
                        }
                        25% {
                            transform: rotate(90deg) scale(1.2);
                            filter: brightness(1.5);
                        }
                        50% {
                            transform: rotate(180deg) scale(1);
                            filter: brightness(1);
                        }
                        75% {
                            transform: rotate(270deg) scale(1.2);
                            filter: brightness(1.5);
                        }
                    }

                 .complete-section {
                    margin-top: 2.5rem;
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                    .complete-section.show {
                        opacity: 1;
                        transform: scale(1);
                    }

                    .success-message {
                        font-size: clamp(0.95rem, 2.8vw, 1.1rem);
                        color: #10b981;
                        margin-bottom: 0.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        flex-wrap: wrap;
                        animation: successGlow 2s ease-in-out infinite;
                    }

                    @keyframes successGlow {
                        0%, 100% {
                            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
                            filter: brightness(1);
                        }
                        50% {
                            text-shadow: 0 0 20px rgba(16, 185, 129, 1), 0 0 30px rgba(16, 185, 129, 0.5);
                            filter: brightness(1.3);
                        }
                    }

                    .enter-button {
                        background: linear-gradient(135deg, #0ea5e9, #3b82f6, #0ea5e9);
                        background-size: 200% 100%;
                        color: white;
                        border: none;
                        padding: clamp(10px, 3vw, 12px) clamp(20px, 5vw, 24px);
                        border-radius: 8px;
                        font-size: clamp(0.9rem, 2.5vw, 1rem);
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        font-family: inherit;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        min-height: 44px;
                        touch-action: manipulation;
                        position: relative;
                        overflow: hidden;
                        animation: buttonGradient 3s ease infinite;
                        box-shadow: 0 5px 15px rgba(14, 165, 233, 0.3);
                    }

                    @keyframes buttonGradient {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }

                    .enter-button::before {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: translate(-50%, -50%);
                        transition: width 0.6s, height 0.6s;
                    }

                    .enter-button:hover::before {
                        width: 300px;
                        height: 300px;
                    }

                    .enter-button:hover {
                        transform: translateY(-5px) scale(1.08);
                        box-shadow: 0 20px 40px rgba(14, 165, 233, 0.5);
                        animation: buttonGradient 1s ease infinite, buttonFloat 3s ease-in-out infinite;
                    }

                    @keyframes buttonFloat {
                        0%, 100% { transform: translateY(-5px) scale(1.08); }
                        50% { transform: translateY(-8px) scale(1.08); }
                    }

                    .enter-button:active {
                        transform: translateY(-2px) scale(1.03);
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
                        background: rgba(30, 41, 59, 0.8);
                        border: 1px solid rgba(14, 165, 233, 0.3);
                        color: #f8fafc;
                        width: clamp(40px, 10vw, 50px);
                        height: clamp(40px, 10vw, 50px);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: clamp(14px, 3.5vw, 16px);
                        min-height: 44px;
                        min-width: 44px;
                        touch-action: manipulation;
                        animation: audioPulse 3s ease-in-out infinite;
                    }

                    @keyframes audioPulse {
                        0%, 100% {
                            box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4);
                        }
                        50% {
                            box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
                        }
                    }

                    .audio-btn:hover {
                        background: rgba(14, 165, 233, 0.2);
                        border-color: #0ea5e9;
                        transform: scale(1.15) rotate(15deg);
                        animation: audioPulse 1s ease-in-out infinite;
                    }

                    .audio-btn:active {
                        transform: scale(0.95);
                    }

                    .audio-btn.active {
                        background: #0ea5e9;
                        border-color: #0ea5e9;
                        animation: audioPulse 2s ease-in-out infinite, audioRotate 10s linear infinite;
                    }

                    @keyframes audioRotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.7; }
                    }

                    .cursor { animation: pulse 1s infinite; }

                    @media (max-width: 768px) {
                        body {
                            padding: clamp(0.5rem, 2vw, 1rem);
                            overflow-x: hidden;
                        }

                        .intro-container {
                            padding: clamp(0.5rem, 2vw, 1rem);
                            max-width: 95vw;
                        }

                        .status-messages {
                            font-size: 0.75rem;
                            padding: 0.5rem 0.75rem;
                            max-height: 120px;
                            line-height: 1.3;
                        }

                        .status-message {
                            margin-bottom: 0.25rem;
                            font-size: 0.75rem;
                        }

                        .floating-symbols {
                            transform: scale(0.8);
                        }
                    }

                    @media (max-width: 480px) {
                        body { padding: 0.5rem; }
                        .intro-container { padding: 0.5rem; max-width: 100%; }
                        .floating-symbols { transform: scale(0.6); }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        *, *::before, *::after {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                        .floating-symbols { display: none; }
                    }
                `}</style>
            </Head>

            <audio id="backgroundMusic" preload="auto">
                <source src="/electronic-game2-332868.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className="floating-symbols">
                <div className="symbol">{'<>'}</div>
                <div className="symbol">{'{'}</div>
                <div className="symbol">{'}'}</div>
                <div className="symbol">{';'}</div>
                <div className="symbol">{'[]'}</div>
                <div className="symbol">{'()'}</div>
                <div className="symbol">{'\\'}</div>
                <div className="symbol">{'/'}</div>
                <div className="symbol">{'<'}</div>
                <div className="symbol">{'>'}</div>
                <div className="symbol">{'='}</div>
                <div className="symbol">{'+'}</div>
            </div>

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
                <h1 className="name">Laurence De Guzman</h1>
                <p className="title">Aspiring Cybersecurity & ERP Specialist</p>

                <div className="loading-section">
                    <div className="compile-text">
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

                    <div className="loading-dots" style={{ display: showComplete ? 'none' : 'flex' }}>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>

                    <div className="status-messages">
                        {messages.map((msg, index) => {
                            const symbols = ['<>', '{}', '[]', '()', ';', '//'];
                            const randomSymbol = symbols[index % symbols.length];

                            return messageIndex === index + 1 && (
                                <div
                                    key={msg.id}
                                    className="status-message show fade-message"
                                >
                                    <span className="status-icon">{randomSymbol}</span>
                                    {msg.id === 'msg2' && (
                                        <span>Loading <span className="primary">React components</span>...</span>
                                    )}
                                    {msg.id === 'msg3' && (
                                        <span>Connecting to <span className="accent">databases</span>...</span>
                                    )}
                                    {msg.id === 'msg4' && (
                                        <span>Building <span className="primary">full-stack solutions</span>...</span>
                                    )}
                                    {msg.id === 'msg5' && (
                                        <span>Optimizing <span className="accent">performance</span>...</span>
                                    )}
                                    {msg.id === 'msg6' && (
                                        <span><span className="success"></span> Portfolio ready!</span>
                                    )}
                                    {msg.id === 'msg1' && <span>{msg.text}</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`complete-section ${showComplete ? 'show' : ''}`}>
                    <div className="success-message">
                        <span></span>
                        <span>Compilation successful!</span>
                    </div>
                    <button className="enter-button" onClick={enterPortfolio}>
                        <span></span>
                        <span>Enter Portfolio</span>
                    </button>
                </div>
            </div>
        </>
    );
}