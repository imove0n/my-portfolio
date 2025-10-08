import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SchoolProjects() {
    const router = useRouter();
    const [flippedCards, setFlippedCards] = useState({});

    const toggleFlip = (cardId) => {
        setFlippedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

    const goBack = () => {
        router.push('/portfolio#projects');
    };

    return (
        <>
            <Head>
                <title>School Projects - Laurence De Guzman</title>
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
                        cursor: url('/doto.cur'), auto;
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
                        background: rgba(14, 165, 233, 0.1);
                        border: 1px solid rgba(14, 165, 233, 0.3);
                        color: #0ea5e9;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        transition: all 0.3s ease;
                    }

                    .back-btn:hover {
                        background: rgba(14, 165, 233, 0.2);
                        transform: translateX(-5px);
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
                        perspective: 1500px;
                        min-height: 450px;
                        background: transparent;
                        cursor: pointer;
                    }

                    .flip-card-inner {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        transition: transform 0.8s;
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
                        border-radius: 12px;
                        overflow: hidden;
                    }

                    .flip-card-front {
                        background: rgba(30, 41, 59, 0.6);
                        border: 1px solid rgba(148, 163, 184, 0.1);
                        padding: 2rem;
                        display: flex;
                        flex-direction: column;
                    }

                    .flip-card-back {
                        background: rgba(15, 23, 42, 0.95);
                        transform: rotateY(180deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 1rem;
                    }

                    .flip-card-back img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        border-radius: 8px;
                    }

                    .card-icon {
                        width: 70px;
                        height: 70px;
                        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 1.5rem;
                    }

                    .card-icon i {
                        font-size: 2rem;
                        color: white;
                    }

                    .card-content h3 {
                        font-size: 1.5rem;
                        color: #f8fafc;
                        margin-bottom: 1rem;
                    }

                    .card-content p {
                        color: #94a3b8;
                        line-height: 1.6;
                        margin-bottom: 1.5rem;
                    }

                    .card-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }

                    .tag {
                        background: rgba(14, 165, 233, 0.1);
                        border: 1px solid rgba(14, 165, 233, 0.3);
                        color: #0ea5e9;
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        font-size: 0.85rem;
                    }

                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                        gap: 2rem;
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
                `}</style>
            </Head>

            <button className="back-btn" onClick={goBack}>
                ← Back
            </button>

            <div className="container">
                <div className="header">
                    <h1 className="page-title">
                        <i className="fas fa-graduation-cap"></i> School Projects
                    </h1>
                    <p className="page-subtitle">
                        Academic projects from TUP Manila - BTVTED Major in Computer Programming
                    </p>
                </div>

                <div className="cards-grid">
                    {/* AI Chatbot */}
                    <div className={`flip-card ${flippedCards['chatbot'] ? 'flipped' : ''}`} onClick={() => toggleFlip('chatbot')}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="card-icon">
                                    <i className="fas fa-robot"></i>
                                </div>
                                <div className="card-content">
                                    <h3>AI Chatbot for BTVTED Students</h3>
                                    <p>AI-powered chatbot built with Next.js to support programming students with continuous learning, addressing gaps in traditional teaching methods.</p>
                                    <div className="card-tags">
                                        <span className="tag">Next.js</span>
                                        <span className="tag">AI/ML</span>
                                        <span className="tag">Educational Tech</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <img src="/chatbot.png" alt="AI Chatbot Project" />
                            </div>
                        </div>
                    </div>

                    {/* Flappy Bird */}
                    <div className={`flip-card ${flippedCards['flappy'] ? 'flipped' : ''}`} onClick={() => toggleFlip('flappy')}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="card-icon">
                                    <i className="fas fa-gamepad"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Enhanced Flappy Bird Mobile Game</h3>
                                    <p>Created a challenging Flappy Bird-inspired mobile game with moving tubes that collide with each other and enemy birds flying toward the player. Built with Python using Kivy framework and converted to APK using Buildozer for Android deployment.</p>
                                    <div className="card-tags">
                                        <span className="tag">Python</span>
                                        <span className="tag">Kivy</span>
                                        <span className="tag">Buildozer</span>
                                        <span className="tag">Game Development</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <img src="/flappy.jpg" alt="Flappy Bird Game Project" />
                            </div>
                        </div>
                    </div>

                    {/* Arduino Smart Car */}
                    <div className={`flip-card ${flippedCards['arduino'] ? 'flipped' : ''}`} onClick={() => toggleFlip('arduino')}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="card-icon">
                                    <i className="fas fa-car"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Arduino Smart Car</h3>
                                    <p>Built an Arduino-based car equipped with sensors and running lights. Combined programming with electronics, expanding skills into IoT and embedded systems.</p>
                                    <div className="card-tags">
                                        <span className="tag">Arduino</span>
                                        <span className="tag">C++</span>
                                        <span className="tag">IoT</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <img src="/arduino.png" alt="Arduino Smart Car Project" />
                            </div>
                        </div>
                    </div>

                    {/* Database System */}
                    <div className={`flip-card ${flippedCards['database'] ? 'flipped' : ''}`} onClick={() => toggleFlip('database')}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <div className="card-icon">
                                    <i className="fas fa-database"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Automated Department Database System</h3>
                                    <p>Built an automated online examination system with pre-loaded questions and answers. Features automatic pass/fail checking and real-time score recording, eliminating manual grading processes for the department.</p>
                                    <div className="card-tags">
                                        <span className="tag">MySQL</span>
                                        <span className="tag">Automation</span>
                                        <span className="tag">Online Testing</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flip-card-back">
                                <img src="/autodatabase.png" alt="Database System Project" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
