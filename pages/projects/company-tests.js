import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CompanyTests() {
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
                        background: linear-gradient(135deg, #f59e0b, #ef4444);
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
                        background: rgba(245, 158, 11, 0.1);
                        border: 1px solid rgba(245, 158, 11, 0.3);
                        color: #fbbf24;
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        font-size: 0.85rem;
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
                `}</style>
            </Head>

            <button className="back-btn" onClick={goBack}>
                ← Back
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
                                <div className="card-icon">
                                    <i className="fas fa-code-branch"></i>
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
        </>
    );
}
