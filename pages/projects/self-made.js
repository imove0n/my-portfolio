import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SelfMadeProjects() {
    const router = useRouter();

    const goBack = () => {
        router.push('/portfolio#projects');
    };

    // Projects data - Replace URLs with your actual Vercel deployments
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
            image: '/project2-preview.png',
            icon: 'fas fa-shopping-cart',
            tags: ['React', 'Node.js', 'MongoDB'],
            url: 'https://your-project-1.vercel.app'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative task tracker with real-time updates, kanban boards, and team analytics.',
            image: '/project4-preview.png',
            icon: 'fas fa-tasks',
            tags: ['React', 'Firebase', 'Tailwind'],
            url: 'https://your-project-2.vercel.app'
        },
        {
            id: 3,
            title: 'AI Chat Assistant',
            description: 'Intelligent chatbot powered by AI with natural language processing and context awareness.',
            image: '/project5-preview.png',
            icon: 'fas fa-robot',
            tags: ['Python', 'AI/ML', 'Flask'],
            url: 'https://your-project-3.vercel.app'
        }
    ];

    return (
        <>
            <Head>
                <title>Self-Made Projects - Laurence De Guzman</title>
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
                        background: linear-gradient(135deg, #0ea5e9, #06b6d4);
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
                        box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4);
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
                        background: linear-gradient(135deg, #06b6d4, #0ea5e9);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .back-btn:hover::before {
                        opacity: 1;
                    }

                    .back-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(14, 165, 233, 0.6);
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

                    .project-card {
                        position: relative;
                        background: #1a2332;
                        border: 2px solid #2d3748;
                        border-radius: 16px;
                        overflow: hidden;
                        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        display: flex;
                        flex-direction: column;
                        cursor: pointer;
                    }

                    .project-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.15), transparent);
                        transition: left 0.5s ease;
                    }

                    .project-card:hover::before {
                        left: 100%;
                    }

                    .project-card:hover {
                        transform: translateY(-10px) scale(1.02);
                        border-color: #0ea5e9;
                        box-shadow: 0 25px 50px rgba(14, 165, 233, 0.25), 0 0 0 1px rgba(14, 165, 233, 0.3);
                    }

                    .card-image {
                        position: relative;
                        width: 100%;
                        height: 240px;
                        overflow: hidden;
                        background: #0f1419;
                        border-bottom: 3px solid #0ea5e9;
                    }

                    .card-image::after {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(180deg, transparent 60%, #1a2332 100%);
                        pointer-events: none;
                    }

                    .card-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: all 0.4s ease;
                        filter: brightness(0.85) saturate(1.1);
                    }

                    .project-card:hover .card-image img {
                        transform: scale(1.15);
                        filter: brightness(1) saturate(1.2);
                    }

                    .card-overlay {
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        display: flex;
                        gap: 0.5rem;
                        opacity: 0;
                        transform: translateY(-10px);
                        transition: all 0.3s ease;
                        z-index: 2;
                    }

                    .project-card:hover .card-overlay {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    .card-body {
                        padding: 2rem 1.75rem;
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                        background: linear-gradient(to bottom, #1a2332, #141c28);
                    }

                    .card-icon {
                        position: absolute;
                        top: 200px;
                        left: 1.75rem;
                        width: 65px;
                        height: 65px;
                        background: linear-gradient(145deg, #0ea5e9, #06b6d4);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4), 0 0 0 4px #1a2332;
                        z-index: 1;
                        transition: all 0.3s ease;
                    }

                    .project-card:hover .card-icon {
                        transform: rotate(360deg) scale(1.1);
                        box-shadow: 0 12px 30px rgba(14, 165, 233, 0.6), 0 0 0 4px #1a2332;
                    }

                    .card-icon i {
                        font-size: 1.75rem;
                        color: white;
                    }

                    .card-body h3 {
                        font-size: 1.4rem;
                        color: #f1f5f9;
                        margin: 2.5rem 0 0.875rem;
                        font-weight: 700;
                        letter-spacing: -0.02em;
                    }

                    .card-body p {
                        color: #94a3b8;
                        line-height: 1.7;
                        margin-bottom: 1.75rem;
                        flex: 1;
                        font-size: 0.975rem;
                    }

                    .view-btn {
                        background: #0ea5e9;
                        color: white;
                        border: none;
                        padding: 0.875rem 1.75rem;
                        border-radius: 10px;
                        font-size: 0.975rem;
                        font-weight: 700;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.625rem;
                        justify-content: center;
                        margin-top: auto;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        position: relative;
                        overflow: hidden;
                    }

                    .view-btn::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                        transition: left 0.5s ease;
                    }

                    .view-btn:hover::before {
                        left: 100%;
                    }

                    .view-btn:hover {
                        background: #06b6d4;
                        transform: translateY(-3px);
                        box-shadow: 0 12px 24px rgba(14, 165, 233, 0.5);
                    }

                    .view-btn i {
                        font-size: 0.875rem;
                        transition: transform 0.3s ease;
                    }

                    .view-btn:hover i {
                        transform: translateX(3px);
                    }

                    .card-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.625rem;
                    }

                    .tag {
                        background: linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(6, 182, 212, 0.15));
                        border: none;
                        color: #22d3ee;
                        padding: 0.5rem 1rem;
                        border-radius: 8px;
                        font-size: 0.8rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        backdrop-filter: blur(10px);
                    }

                    .cards-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 2rem;
                        margin-bottom: 2rem;
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

                    @media (max-width: 1024px) {
                        .cards-grid {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 1.5rem;
                        }
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
                            gap: 1.5rem;
                        }

                        .page-title {
                            font-size: 2rem;
                        }

                        .card-image {
                            height: 200px;
                        }
                    }
                `}</style>
            </Head>

            <button className="back-btn" onClick={goBack}>
                <span> Back</span>
            </button>

            <div className="container">
                <div className="header">
                    <h1 className="page-title">
                        <i className="fas fa-code"></i> Self-Made Projects
                    </h1>
                    <p className="page-subtitle">
                        Personal projects built from passion, curiosity, and the drive to learn
                    </p>
                </div>

                <div className="cards-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="card-image">
                                <img src={project.image} alt={project.title} />
                                <div className="card-overlay">
                                    <div className="card-tags">
                                        {project.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-icon">
                                    <i className={project.icon}></i>
                                </div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-btn"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    View Project <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state if no projects yet
                <div className="empty-state">
                    <i className="fas fa-hammer"></i>
                    <h3>More Projects Coming Soon</h3>
                    <p>I'm constantly working on new projects. Check back later!</p>
                </div>
                */}
            </div>
        </>
    );
}
