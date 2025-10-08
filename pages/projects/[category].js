import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CategoryProjects() {
    const router = useRouter();
    const { category } = router.query;
    const [selectedProject, setSelectedProject] = useState(null);

    // Project data for each category
    const projectsData = {
        'web-dev': {
            title: 'Web Development',
            icon: '🌐',
            color: '#0ea5e9',
            projects: [
                {
                    id: 1,
                    name: 'Portfolio Website',
                    description: 'Personal portfolio with 3D animations, interactive elements, and music player',
                    tech: ['Next.js', 'React Three Fiber', 'CSS3', 'JavaScript'],
                    image: '🖥️',
                    features: ['3D floating laptop', 'Drag-and-drop geometries', 'Theme switcher', 'Music player'],
                    github: '#',
                    demo: '#'
                },
                {
                    id: 2,
                    name: 'E-commerce Platform',
                    description: 'Full-stack online shopping platform with cart and payment integration',
                    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                    image: '🛒',
                    features: ['Product catalog', 'Shopping cart', 'User authentication', 'Payment gateway'],
                    github: '#',
                    demo: '#'
                }
            ]
        },
        'ai-automation': {
            title: 'AI & Automation',
            icon: '🤖',
            color: '#8b5cf6',
            projects: [
                {
                    id: 1,
                    name: 'Facebook AI Chatbot',
                    description: '24/7 automated customer service chatbot using N8N workflows',
                    tech: ['N8N', 'Facebook API', 'AI/ML', 'Webhooks'],
                    image: '💬',
                    features: ['24/7 availability', 'Auto-response', 'Customer queries handling', 'Integration with business'],
                    github: '#',
                    demo: '#'
                },
                {
                    id: 2,
                    name: 'N8N Workflows',
                    description: 'Complex automation workflows for business processes',
                    tech: ['N8N', 'APIs', 'Webhooks', 'Automation'],
                    image: '⚙️',
                    features: ['Email automation', 'Data sync', 'API integrations', 'Scheduled tasks'],
                    github: '#',
                    demo: '#'
                }
            ]
        },
        'arduino': {
            title: 'Arduino Projects',
            icon: '⚡',
            color: '#10b981',
            projects: [
                {
                    id: 1,
                    name: 'Smart Home System',
                    description: 'IoT-based home automation with sensors and remote control',
                    tech: ['Arduino', 'C++', 'IoT', 'Sensors'],
                    image: '🏠',
                    features: ['Light control', 'Temperature monitoring', 'Mobile app', 'Voice commands'],
                    github: '#',
                    demo: '#'
                }
            ]
        },
        'python': {
            title: 'Python Applications',
            icon: '🐍',
            color: '#f59e0b',
            projects: [
                {
                    id: 1,
                    name: 'Snake Game APK',
                    description: 'Classic snake game converted to Android APK',
                    tech: ['Python', 'Pygame', 'Kivy', 'APK'],
                    image: '🎮',
                    features: ['Mobile compatibility', 'High score system', 'Touch controls', 'APK build'],
                    github: '#',
                    demo: '#'
                }
            ]
        },
        'odoo-erp': {
            title: 'Odoo ERP',
            icon: '📊',
            color: '#ec4899',
            projects: [
                {
                    id: 1,
                    name: 'Custom Inventory Module',
                    description: 'Custom Odoo module for advanced inventory management',
                    tech: ['Odoo', 'Python', 'PostgreSQL', 'XML'],
                    image: '📦',
                    features: ['Stock tracking', 'Custom reports', 'Barcode scanning', 'Multi-warehouse'],
                    github: '#',
                    demo: '#'
                }
            ]
        },
        'cybersecurity': {
            title: 'Cybersecurity',
            icon: '🔒',
            color: '#ef4444',
            projects: [
                {
                    id: 1,
                    name: 'Network Scanner',
                    description: 'Python-based network scanning and monitoring tool',
                    tech: ['Python', 'Nmap', 'Scapy', 'Security'],
                    image: '🔍',
                    features: ['Port scanning', 'Device detection', 'Vulnerability check', 'Report generation'],
                    github: '#',
                    demo: '#'
                }
            ]
        }
    };

    const currentCategory = projectsData[category] || projectsData['web-dev'];

    const goBack = () => {
        router.push('/projects');
    };

    return (
        <>
            <Head>
                <title>{currentCategory.title} Projects - Laurence De Guzman</title>
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

                    .category-container {
                        max-width: 1400px;
                        margin: 0 auto;
                        padding: 2rem;
                        min-height: 100vh;
                    }

                    .header {
                        margin-bottom: 3rem;
                    }

                    .back-btn {
                        background: rgba(14, 165, 233, 0.1);
                        border: 1px solid rgba(14, 165, 233, 0.3);
                        color: #0ea5e9;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 1rem;
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        transition: all 0.3s ease;
                        margin-bottom: 2rem;
                    }

                    .back-btn:hover {
                        background: rgba(14, 165, 233, 0.2);
                        transform: translateX(-5px);
                    }

                    .category-header {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                        margin-bottom: 1rem;
                    }

                    .category-icon-large {
                        font-size: 4rem;
                    }

                    .category-title {
                        font-size: clamp(2rem, 5vw, 3rem);
                        font-weight: 700;
                        color: var(--category-color);
                    }

                    .category-subtitle {
                        font-size: 1.2rem;
                        color: #94a3b8;
                        margin-bottom: 2rem;
                    }

                    .projects-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                        gap: 2rem;
                    }

                    .project-card {
                        background: rgba(30, 41, 59, 0.5);
                        border: 1px solid rgba(148, 163, 184, 0.1);
                        border-radius: 16px;
                        padding: 2rem;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }

                    .project-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: var(--category-color);
                        transform: scaleX(0);
                        transition: transform 0.3s ease;
                    }

                    .project-card:hover::before {
                        transform: scaleX(1);
                    }

                    .project-card:hover {
                        transform: translateY(-8px);
                        border-color: var(--category-color);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    }

                    .project-image {
                        font-size: 4rem;
                        margin-bottom: 1rem;
                        display: block;
                    }

                    .project-name {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: var(--category-color);
                        margin-bottom: 0.75rem;
                    }

                    .project-description {
                        color: #94a3b8;
                        line-height: 1.6;
                        margin-bottom: 1rem;
                    }

                    .tech-stack {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.5rem;
                        margin-bottom: 1rem;
                    }

                    .tech-tag {
                        background: rgba(14, 165, 233, 0.1);
                        color: #0ea5e9;
                        padding: 0.4rem 0.8rem;
                        border-radius: 12px;
                        font-size: 0.85rem;
                        border: 1px solid rgba(14, 165, 233, 0.2);
                    }

                    .features-list {
                        margin: 1rem 0;
                        padding-left: 1.5rem;
                    }

                    .features-list li {
                        color: #cbd5e1;
                        margin-bottom: 0.5rem;
                        line-height: 1.5;
                    }

                    .project-links {
                        display: flex;
                        gap: 1rem;
                        margin-top: 1.5rem;
                    }

                    .project-link {
                        flex: 1;
                        text-align: center;
                        padding: 0.75rem;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        border: 1px solid;
                    }

                    .github-link {
                        background: rgba(148, 163, 184, 0.1);
                        color: #94a3b8;
                        border-color: rgba(148, 163, 184, 0.3);
                    }

                    .github-link:hover {
                        background: rgba(148, 163, 184, 0.2);
                        transform: translateY(-2px);
                    }

                    .demo-link {
                        background: var(--category-color);
                        color: white;
                        border-color: var(--category-color);
                    }

                    .demo-link:hover {
                        opacity: 0.9;
                        transform: translateY(-2px);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                    }

                    @media (max-width: 768px) {
                        .category-container {
                            padding: 1rem;
                        }

                        .projects-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `}</style>
            </Head>

            <div
                className="category-container"
                style={{ '--category-color': currentCategory.color }}
            >
                <div className="header">
                    <button className="back-btn" onClick={goBack}>
                        ← Back to Projects
                    </button>

                    <div className="category-header">
                        <span className="category-icon-large">{currentCategory.icon}</span>
                        <h1 className="category-title">{currentCategory.title}</h1>
                    </div>
                    <p className="category-subtitle">
                        {currentCategory.projects.length} project{currentCategory.projects.length !== 1 ? 's' : ''} showcasing my work
                    </p>
                </div>

                <div className="projects-grid">
                    {currentCategory.projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <span className="project-image">{project.image}</span>
                            <h3 className="project-name">{project.name}</h3>
                            <p className="project-description">{project.description}</p>

                            <div className="tech-stack">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>

                            <ul className="features-list">
                                {project.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>

                            <div className="project-links">
                                <a href={project.github} className="project-link github-link" target="_blank" rel="noopener noreferrer">
                                    GitHub →
                                </a>
                                <a href={project.demo} className="project-link demo-link" target="_blank" rel="noopener noreferrer">
                                    Live Demo →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
