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
            title: '3D Interactive Portfolio',
            description: 'A modern portfolio featuring 3D animations, draggable geometries, theme switching, and music player.',
            image: '/portfolio-preview.png',
            icon: 'fas fa-laptop-code',
            tags: ['Next.js', 'Three.js', 'React'],
            url: 'https://your-project-1.vercel.app'
        },
        {
            id: 2,
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
            image: '/project2-preview.png',
            icon: 'fas fa-shopping-cart',
            tags: ['React', 'Node.js', 'MongoDB'],
            url: 'https://your-project-2.vercel.app'
        },
        {
            id: 3,
            title: 'Weather Dashboard',
            description: 'Real-time weather application with interactive maps, forecasts, and location-based alerts.',
            image: '/project3-preview.png',
            icon: 'fas fa-cloud-sun',
            tags: ['Vue.js', 'API', 'Charts'],
            url: 'https://your-project-3.vercel.app'
        },
        {
            id: 4,
            title: 'Task Management App',
            description: 'Collaborative task tracker with real-time updates, kanban boards, and team analytics.',
            image: '/project4-preview.png',
            icon: 'fas fa-tasks',
            tags: ['React', 'Firebase', 'Tailwind'],
            url: 'https://your-project-4.vercel.app'
        },
        {
            id: 5,
            title: 'AI Chat Assistant',
            description: 'Intelligent chatbot powered by AI with natural language processing and context awareness.',
            image: '/project5-preview.png',
            icon: 'fas fa-robot',
            tags: ['Python', 'AI/ML', 'Flask'],
            url: 'https://your-project-5.vercel.app'
        },
        {
            id: 6,
            title: 'Fitness Tracker',
            description: 'Track workouts, nutrition, and progress with detailed analytics and personalized recommendations.',
            image: '/project6-preview.png',
            icon: 'fas fa-dumbbell',
            tags: ['React Native', 'GraphQL', 'PostgreSQL'],
            url: 'https://your-project-6.vercel.app'
        },
        {
            id: 7,
            title: 'Social Media Dashboard',
            description: 'Unified dashboard to manage multiple social media accounts with analytics and scheduling.',
            image: '/project7-preview.png',
            icon: 'fas fa-chart-line',
            tags: ['Angular', 'TypeScript', 'D3.js'],
            url: 'https://your-project-7.vercel.app'
        },
        {
            id: 8,
            title: 'Recipe Finder',
            description: 'Discover and save recipes with smart search, meal planning, and grocery list generation.',
            image: '/project8-preview.png',
            icon: 'fas fa-utensils',
            tags: ['React', 'API', 'Redux'],
            url: 'https://your-project-8.vercel.app'
        },
        {
            id: 9,
            title: 'Portfolio Builder',
            description: 'Create stunning portfolios with drag-and-drop interface, templates, and instant deployment.',
            image: '/project9-preview.png',
            icon: 'fas fa-palette',
            tags: ['Next.js', 'Vercel', 'Drag & Drop'],
            url: 'https://your-project-9.vercel.app'
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

                    .project-card {
                        background: rgba(30, 41, 59, 0.6);
                        border: 1px solid rgba(148, 163, 184, 0.1);
                        border-radius: 12px;
                        overflow: hidden;
                        transition: all 0.3s ease;
                        display: flex;
                        flex-direction: column;
                        cursor: pointer;
                    }

                    .project-card:hover {
                        transform: translateY(-8px);
                        border-color: rgba(14, 165, 233, 0.4);
                        box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2);
                    }

                    .card-image {
                        position: relative;
                        width: 100%;
                        height: 220px;
                        overflow: hidden;
                        background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    }

                    .card-image img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.3s ease;
                    }

                    .project-card:hover .card-image img {
                        transform: scale(1.1);
                    }

                    .card-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.9) 100%);
                        display: flex;
                        align-items: flex-end;
                        padding: 1rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .project-card:hover .card-overlay {
                        opacity: 1;
                    }

                    .card-body {
                        padding: 1.5rem;
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    }

                    .card-icon {
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 1rem;
                    }

                    .card-icon i {
                        font-size: 1.5rem;
                        color: white;
                    }

                    .card-body h3 {
                        font-size: 1.3rem;
                        color: #f8fafc;
                        margin-bottom: 0.75rem;
                        font-weight: 600;
                    }

                    .card-body p {
                        color: #94a3b8;
                        line-height: 1.6;
                        margin-bottom: 1.5rem;
                        flex: 1;
                        font-size: 0.95rem;
                    }

                    .view-btn {
                        background: linear-gradient(135deg, #0ea5e9, #3b82f6);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        font-size: 0.95rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        justify-content: center;
                        margin-top: auto;
                    }

                    .view-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
                        background: linear-gradient(135deg, #3b82f6, #0ea5e9);
                    }

                    .view-btn i {
                        font-size: 0.85rem;
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
                        padding: 0.4rem 0.8rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: 500;
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
                ← Back
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
