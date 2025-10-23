import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CompanyProjects() {
    const router = useRouter();
    const cursorRef = useRef(null);
    const [isClicking, setIsClicking] = useState(false);

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

    // Company projects data
    const projects = [
        {
            id: 1,
            title: 'Rent Cubao - Property Rental Platform',
            description: 'A comprehensive property rental management system for Rent Cubao company. Managing and updating their website to provide seamless user experience for property rentals.',
            image: '/project1.png',
            icon: 'fas fa-building',
            tags: ['Next.js', 'React', 'Web Development'],
            url: 'https://rent-cubao.vercel.app/'
        }
    ];

    return (
        <>
            <Head>
                <title>Company Projects - Laurence De Guzman</title>
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
                        background: linear-gradient(135deg, #10b981, #059669);
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
                        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
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
                        background: linear-gradient(135deg, #059669, #10b981);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }

                    .back-btn:hover::before {
                        opacity: 1;
                    }

                    .back-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.6);
                    }

                    .back-btn span {
                        position: relative;
                        z-index: 1;
                    }

                    .page-title {
                        font-size: 3rem;
                        font-weight: 700;
                        color: #10b981;
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
                        background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.15), transparent);
                        transition: left 0.5s ease;
                    }

                    .project-card:hover::before {
                        left: 100%;
                    }

                    .project-card:hover {
                        transform: translateY(-10px) scale(1.02);
                        border-color: #10b981;
                        box-shadow: 0 25px 50px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.3);
                    }

                    .card-image {
                        position: relative;
                        width: 100%;
                        height: 240px;
                        overflow: hidden;
                        background: #0f1419;
                        border-bottom: 3px solid #10b981;
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
                        background: linear-gradient(145deg, #10b981, #059669);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4), 0 0 0 4px #1a2332;
                        z-index: 1;
                        transition: all 0.3s ease;
                    }

                    .project-card:hover .card-icon {
                        transform: rotate(360deg) scale(1.1);
                        box-shadow: 0 12px 30px rgba(16, 185, 129, 0.6), 0 0 0 4px #1a2332;
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
                        background: #10b981;
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
                        background: #059669;
                        transform: translateY(-3px);
                        box-shadow: 0 12px 24px rgba(16, 185, 129, 0.5);
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
                        background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15));
                        border: none;
                        color: #34d399;
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

                    /* Custom space-themed cursor */
                    .custom-cursor {
                        position: fixed;
                        width: 20px;
                        height: 20px;
                        border: 2px solid #10b981;
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        transition: transform 0.15s ease, opacity 0.15s ease;
                        box-shadow: 0 0 20px rgba(16, 185, 129, 0.6), inset 0 0 10px rgba(16, 185, 129, 0.3);
                        background: radial-gradient(circle, rgba(16, 185, 129, 0.2), transparent);
                    }

                    .custom-cursor::after {
                        content: '';
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: #10b981;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        box-shadow: 0 0 10px #10b981;
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
                        <i className="fas fa-briefcase"></i> Company Projects
                    </h1>
                    <p className="page-subtitle">
                        Professional projects developed for clients and companies
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
                                    Visit Website <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Cursor */}
            <div className={`custom-cursor ${isClicking ? 'clicking' : ''}`} ref={cursorRef}></div>
        </>
    );
}
