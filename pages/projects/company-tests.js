import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CompanyTests() {
    const router = useRouter();
    const [flippedCards, setFlippedCards] = useState({});
    const cursorRef = useRef(null);
    const [isClicking, setIsClicking] = useState(false);

    const toggleFlip = (cardId) => {
        setFlippedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

    const goBack = () => {
        router.push('/portfolio#projects');
    };

    // Custom cursor movement
    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + 'px';
                cursorRef.current.style.top = e.clientY + 'px';
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Program Tests for Companies - Laurence De Guzman</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
                <style>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                        color: #f8fafc;
                        min-height: 100vh;
                        overflow-x: hidden;
                        cursor: none;
                    }

                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 3rem 2rem;
                    }

                    .header {
                        text-align: center;
                        margin-bottom: 3rem;
                    }

                    .back-btn {
                        position: absolute;
                        left: 2rem;
                        top: 2rem;
                        background: linear-gradient(135deg, #f59e0b, #ef4444);
                        border: none;
                        color: white;
                        padding: 0.875rem 1.75rem;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 0.625rem;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
                        position: relative;
                        overflow: hidden;
                    }

                    .back-btn::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #ef4444, #f59e0b);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .back-btn:hover::before {
                        opacity: 1;
                    }

                    .back-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(245, 158, 11, 0.6);
                    }

                    .back-btn span {
                        position: relative;
                        z-index: 1;
                    }

                    .page-title {
                        font-size: 3rem;
                        font-weight: 700;
                        color: #0ea5e9;
                        margin-bottom: 1rem;
                    }

                    .page-subtitle {
                        font-size: 1.2rem;
                        color: #94a3b8;
                    }

                    .flip-card {
                        perspective: 2000px;
                        min-height: 480px;
                        background: transparent;
                        cursor: pointer;
                        position: relative;
                    }

                    .flip-card::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #f59e0b, #ef4444, #f59e0b);
                        background-size: 200% 100%;
                        animation: shimmer 3s linear infinite;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        border-radius: 0 0 16px 16px;
                    }

                    .flip-card:hover::after {
                        opacity: 1;
                    }

                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }

                    .flip-card-inner {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
                        transform-style: preserve-3d;
                    }

                    .flip-card.flipped .flip-card-inner {
                        transform: rotateY(180deg);
                    }

                    .flip-card-front, .flip-card-back {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        backface-visibility: hidden;
                        border-radius: 16px;
                        overflow: hidden;
                    }

                    .flip-card-front {
                        background: linear-gradient(145deg, #1e2936, #161d28);
                        border: 2px solid #2a3441;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        transition: all 0.3s ease;
                    }

                    .flip-card:hover .flip-card-front {
                        border-color: #f59e0b;
                        box-shadow: 0 20px 40px rgba(245, 158, 11, 0.2);
                    }

                    .flip-card-back {
                        background: #0f1419;
                        border: 2px solid #f59e0b;
                        transform: rotateY(180deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 1.5rem;
                        box-shadow: 0 25px 50px rgba(245, 158, 11, 0.3);
                    }

                    .flip-card-back img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        border-radius: 12px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    }

                    .card-header {
                        background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
                        padding: 1.5rem 2rem;
                        position: relative;
                        overflow: hidden;
                    }

                    .card-header::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        right: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .flip-card:hover .card-header::before {
                        opacity: 1;
                    }

                    .card-icon {
                        width: 75px;
                        height: 75px;
                        background: rgba(255, 255, 255, 0.25);
                        backdrop-filter: blur(10px);
                        border: 3px solid rgba(255, 255, 255, 0.4);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.4s ease;
                        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                    }

                    .flip-card:hover .card-icon {
                        transform: rotate(-15deg) scale(1.15);
                        background: rgba(255, 255, 255, 0.35);
                        border-color: rgba(255, 255, 255, 0.6);
                    }

                    .card-icon i {
                        font-size: 2.25rem;
                        color: white;
                        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
                    }

                    .card-content {
                        padding: 2rem;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }

                    .card-content h3 {
                        font-size: 1.5rem;
                        color: #f1f5f9;
                        margin-bottom: 1rem;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                        line-height: 1.3;
                    }

                    .card-content p {
                        color: #94a3b8;
                        line-height: 1.7;
                        margin-bottom: 1.75rem;
                        flex: 1;
                        font-size: 0.975rem;
                    }

                    .card-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.625rem;
                        margin-top: auto;
                    }

                    .tag {
                        background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2));
                        border: none;
                        color: #fbbf24;
                        padding: 0.5rem 1.125rem;
                        border-radius: 8px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        backdrop-filter: blur(10px);
                        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);
                    }

                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                        gap: 2rem;
                    }

                    .empty-state {
                        text-align: center;
                        padding: 4rem 2rem;
                        color: #64748b;
                    }

                    .empty-state i {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                        opacity: 0.5;
                    }

                    .empty-state h3 {
                        font-size: 1.5rem;
                        margin-bottom: 0.5rem;
                    }

                    @media (max-width: 768px) {
                        .container {
                            padding: 2rem 1rem;
                        }

                        .back-btn {
                            position: static;
                            margin-bottom: 2rem;
                            width: fit-content;
                        }

                        .cards-grid {
                            grid-template-columns: 1fr;
                        }

                        .page-title {
                            font-size: 2rem;
                        }
                    }

                    /* Custom space-themed cursor */
                    .custom-cursor {
                        position: fixed;
                        width: 20px;
                        height: 20px;
                        border: 2px solid #0ea5e9;
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        transition: transform 0.15s ease, opacity 0.15s ease;
                        box-shadow: 0 0 20px rgba(14, 165, 233, 0.6), inset 0 0 10px rgba(14, 165, 233, 0.3);
                        background: radial-gradient(circle, rgba(14, 165, 233, 0.2), transparent);
                    }

                    .custom-cursor::after {
                        content: '';
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: #0ea5e9;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        box-shadow: 0 0 10px #0ea5e9;
                    }

                    .custom-cursor.clicking {
                        transform: scale(0.8);
                        border-color: #ec4899;
                        box-shadow: 0 0 30px rgba(236, 72, 153, 0.8);
                    }
                `}</style>
            </Head>

            <button className="back-btn" onClick={goBack}>
                <span> Back</span>
            </button>

            <div className="container">
                <div className="header">
                    <h1 className="page-title">
                        <i className="fas fa-briefcase"></i> Program Tests for Companies
                    </h1>
                    <p className="page-subtitle">
                        Technical assessments and coding challenges completed for various companies
                    </p>
                </div>

                <div className="cards-grid">
                    {/* Example: Add your company test projects here */}
                    {/*
                    <div className={`flip-card ${flippedCards['test1'] ? 'flipped' : ''}`} onClick={() => toggleFlip('test1')}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="card-header">
                                    <div className="card-icon">
                                        <i className="fas fa-code-branch"></i>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h3>Company Name - Technical Assessment</h3>
                                    <p>Description of the test challenge and what you built</p>
                                    <div className="card-tags">
                                        <span className="tag">Technology 1</span>
                                        <span className="tag">Technology 2</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <img src="/test-screenshot.png" alt="Test Project" />
                            </div>
                        </div>
                    </div>
                    */}
                </div>

                {/* Empty state */}
                <div className="empty-state">
                    <i className="fas fa-clipboard-list"></i>
                    <h3>Projects Coming Soon</h3>
                    <p>Technical assessments and coding challenges will be showcased here as they are completed.</p>
                </div>
            </div>

            {/* Custom Cursor */}
            <div className={`custom-cursor ${isClicking ? 'clicking' : ''}`} ref={cursorRef}></div>
        </>
    );
}
