import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function ProjectsHub() {
    const router = useRouter();

    const projectCategories = [
        {
            id: 'web-dev',
            title: 'Web Development',
            icon: '🌐',
            description: 'Full-stack web applications and responsive websites',
            count: 5,
            color: '#0ea5e9',
            projects: ['Portfolio Website', 'E-commerce Platform', 'Task Manager', 'Blog System', 'Chat App']
        },
        {
            id: 'ai-automation',
            title: 'AI & Automation',
            icon: '🤖',
            description: 'Chatbots, N8N workflows, and automation systems',
            count: 3,
            color: '#8b5cf6',
            projects: ['Facebook AI Chatbot', 'N8N Workflows', 'Customer Service Bot']
        },
        {
            id: 'arduino',
            title: 'Arduino Projects',
            icon: '⚡',
            description: 'Hardware projects and embedded systems',
            count: 4,
            color: '#10b981',
            projects: ['Smart Home System', 'Weather Station', 'Robot Car', 'LED Matrix Display']
        },
        {
            id: 'python',
            title: 'Python Applications',
            icon: '🐍',
            description: 'Games, scripts, and desktop applications',
            count: 6,
            color: '#f59e0b',
            projects: ['Snake Game APK', 'Quiz App', 'File Organizer', 'Web Scraper', 'Calculator', 'Tic Tac Toe']
        },
        {
            id: 'odoo-erp',
            title: 'Odoo ERP',
            icon: '📊',
            description: 'ERP customizations and modules',
            count: 3,
            color: '#ec4899',
            projects: ['Custom Inventory Module', 'Sales Dashboard', 'Report Generator']
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity',
            icon: '🔒',
            description: 'Security tools, firewall configs, and pen-testing',
            count: 2,
            color: '#ef4444',
            projects: ['Network Scanner', 'Firewall Configuration']
        }
    ];

    const navigateToCategory = (categoryId) => {
        router.push(`/projects/${categoryId}`);
    };

    const goBack = () => {
        router.push('/portfolio');
    };

    return (
        <>
            <Head>
                <title>Projects - Laurence De Guzman</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

                    .projects-container {
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: 2rem;
                        min-height: 100vh;
                    }

                    .header {
                        text-align: center;
                        margin-bottom: 3rem;
                        position: relative;
                    }

                    .back-btn {
                        position: absolute;
                        left: 0;
                        top: 0;
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
                        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
                    }

                    .page-title {
                        font-size: clamp(2rem, 5vw, 3.5rem);
                        font-weight: 700;
                        background: linear-gradient(135deg, #f8fafc, #0ea5e9, #3b82f6);
                        background-size: 200% 100%;
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        animation: gradientShift 5s ease infinite;
                        margin-bottom: 1rem;
                    }

                    @keyframes gradientShift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }

                    .page-subtitle {
                        font-size: clamp(1rem, 2.5vw, 1.2rem);
                        color: #94a3b8;
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .categories-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                        gap: 2rem;
                        margin-top: 3rem;
                    }

                    .category-card {
                        background: rgba(30, 41, 59, 0.5);
                        border: 1px solid rgba(148, 163, 184, 0.1);
                        border-radius: 16px;
                        padding: 2rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        position: relative;
                        overflow: hidden;
                    }

                    .category-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: var(--card-color);
                        transform: scaleX(0);
                        transition: transform 0.3s ease;
                    }

                    .category-card:hover::before {
                        transform: scaleX(1);
                    }

                    .category-card:hover {
                        transform: translateY(-8px);
                        border-color: var(--card-color);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
                                    0 0 30px var(--card-color-alpha);
                    }

                    .category-icon {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                        display: block;
                        animation: float 3s ease-in-out infinite;
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }

                    .category-title {
                        font-size: 1.75rem;
                        font-weight: 600;
                        color: var(--card-color);
                        margin-bottom: 0.5rem;
                    }

                    .category-description {
                        color: #94a3b8;
                        margin-bottom: 1rem;
                        line-height: 1.6;
                    }

                    .project-count {
                        display: inline-block;
                        background: var(--card-color-alpha);
                        color: var(--card-color);
                        padding: 0.5rem 1rem;
                        border-radius: 20px;
                        font-weight: 600;
                        font-size: 0.9rem;
                        margin-bottom: 1rem;
                    }

                    .project-preview {
                        margin-top: 1rem;
                        padding-top: 1rem;
                        border-top: 1px solid rgba(148, 163, 184, 0.1);
                    }

                    .project-preview-title {
                        font-size: 0.85rem;
                        color: #64748b;
                        margin-bottom: 0.5rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }

                    .project-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                    }

                    .project-tag {
                        font-size: 0.75rem;
                        color: #cbd5e1;
                        background: rgba(148, 163, 184, 0.1);
                        padding: 0.25rem 0.75rem;
                        border-radius: 12px;
                        border: 1px solid rgba(148, 163, 184, 0.2);
                    }

                    @media (max-width: 768px) {
                        .projects-container {
                            padding: 1rem;
                        }

                        .categories-grid {
                            grid-template-columns: 1fr;
                        }

                        .back-btn {
                            position: static;
                            margin-bottom: 2rem;
                            width: fit-content;
                        }

                        .header {
                            margin-top: 1rem;
                        }
                    }
                `}</style>
            </Head>

            <div className="projects-container">
                <div className="header">
                    <button className="back-btn" onClick={goBack}>
                        ← Back to Home
                    </button>
                    <h1 className="page-title">My Projects</h1>
                    <p className="page-subtitle">
                        Explore my work across different technologies and domains
                    </p>
                </div>

                <div className="categories-grid">
                    {projectCategories.map((category) => (
                        <div
                            key={category.id}
                            className="category-card"
                            onClick={() => navigateToCategory(category.id)}
                            style={{
                                '--card-color': category.color,
                                '--card-color-alpha': `${category.color}20`
                            }}
                        >
                            <span className="category-icon">{category.icon}</span>
                            <h3 className="category-title">{category.title}</h3>
                            <p className="category-description">{category.description}</p>
                            <span className="project-count">{category.count} Projects</span>

                            <div className="project-preview">
                                <div className="project-preview-title">Projects Include:</div>
                                <div className="project-tags">
                                    {category.projects.slice(0, 3).map((project, index) => (
                                        <span key={index} className="project-tag">{project}</span>
                                    ))}
                                    {category.projects.length > 3 && (
                                        <span className="project-tag">+{category.projects.length - 3} more</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
