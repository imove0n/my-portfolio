    import React, { useEffect, useRef, useState } from "react";
    import Head from "next/head";
    import emailjs from '@emailjs/browser';
    import dynamic from 'next/dynamic';

    // Dynamically import 3D component (client-side only)
    const Hero3DBackground = dynamic(() => import('../components/Hero3DBackground'), {
        ssr: false,
        loading: () => null
    });
    


    export default function Portfolio() {
    const [floatingChars, setFloatingChars] = useState([]);
    const [isNavMenuActive, setIsNavMenuActive] = useState(false);
    const [currentText, setCurrentText] = useState("");
    const cursorRef = useRef(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const tapSoundRef = useRef(null);
    const [audioError, setAudioError] = useState(false);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(50);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    // Profile image cycling
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const profileImages = ['Grad2.jpg', 'Grad3.jpg', 'Grad4.jpg'];

    const handleImageChange = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
            setTimeout(() => setIsFlipping(false), 300);
        }, 300);
    };
    const [glitchText, setGlitchText] = useState('Guzman');
    // Flip card state for projects
    const [flippedCards, setFlippedCards] = useState({});
    // Theme state: 'original' | 'dark' | 'light'
    const [theme, setTheme] = useState('original');
    const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
    // Logo auto-typing animation
    const [logoTypedText, setLogoTypedText] = useState('');
    const [showBaseName, setShowBaseName] = useState(true);
    // Projects dropdown
    const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);

// Playlist state
    const [playlist] = useState([
    { id: 1, src: '/1.mp3', title: 'Track 1' },
    { id: 2, src: '/2.mp3', title: 'Track 2' },
    { id: 3, src: '/3-01. Hateno Village.mp3', title: 'Track 3' },
    { id: 4, src: '/4.mp3', title: 'Track 4' },
    { id: 5, src: '/5.mp3', title: 'Track 5' },
    { id: 6, src: '/6.mp3', title: 'Track 6' },
    { id: 7, src: '/Track 7.mp3', title: 'Track 7' },
    { id: 8, src: '/Track 8.mp3', title: 'Track 8' }
]);
const [currentTrackIndex, setCurrentTrackIndex] = useState(2); // Start with Hateno Village (index 2)   
    
    // Form submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const formRef = useRef(null);

    // EmailJS Configuration
    const EMAILJS_PUBLIC_KEY = 'nBLKDneiC3rU02xZ_';
    const EMAILJS_SERVICE_ID = 'service_6irrupm';
    const EMAILJS_TEMPLATE_ID = 'template_vulbg28';

    // Typing effect for hero section
    useEffect(() => {
        const texts = [
        "build things.",
        "solve problems.",
        "love technology.",
        "never stop learning.",
        "embrace challenges.",
        "lead with passion.",
        ];
        let idx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
        const fullText = texts[idx];
        setCurrentText(
            isDeleting
            ? fullText.substring(0, charIdx - 1)
            : fullText.substring(0, charIdx + 1)
        );
        charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

        if (!isDeleting && charIdx === fullText.length) {
            timeout = setTimeout(() => {
            isDeleting = true;
            type();
            }, 1200);
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            idx = (idx + 1) % texts.length;
            timeout = setTimeout(type, 400);
        } else {
            timeout = setTimeout(type, isDeleting ? 40 : 80);
        }
        };

        type();
        return () => clearTimeout(timeout);
    }, []);

    // Logo auto-typing animation sequence
    useEffect(() => {
        let timeouts = [];

        // Hide base name initially and show it at the end
        setShowBaseName(true);

        const startSequence = () => {
            let step = 0;

            const sequence = [
                // Start: wait 3 seconds with "Laurence De Guzman"
                { text: "", showBase: true, delay: 3000 },

                // Hide base name and type "I am "
                { text: "", showBase: false, delay: 100 },
                { text: "I", showBase: false, delay: 100 },
                { text: "I ", showBase: false, delay: 80 },
                { text: "I a", showBase: false, delay: 100 },
                { text: "I am", showBase: false, delay: 100 },
                { text: "I am ", showBase: false, delay: 150 },

                // Type full name
                { text: "I am L", showBase: false, delay: 100 },
                { text: "I am La", showBase: false, delay: 100 },
                { text: "I am Lau", showBase: false, delay: 100 },
                { text: "I am Laur", showBase: false, delay: 100 },
                { text: "I am Laure", showBase: false, delay: 100 },
                { text: "I am Lauren", showBase: false, delay: 100 },
                { text: "I am Laurenc", showBase: false, delay: 100 },
                { text: "I am Laurence", showBase: false, delay: 100 },
                { text: "I am Laurence ", showBase: false, delay: 120 },
                { text: "I am Laurence D", showBase: false, delay: 100 },
                { text: "I am Laurence De", showBase: false, delay: 100 },
                { text: "I am Laurence De ", showBase: false, delay: 120 },
                { text: "I am Laurence De G", showBase: false, delay: 100 },
                { text: "I am Laurence De Gu", showBase: false, delay: 100 },
                { text: "I am Laurence De Guz", showBase: false, delay: 100 },
                { text: "I am Laurence De Guzm", showBase: false, delay: 100 },
                { text: "I am Laurence De Guzma", showBase: false, delay: 100 },
                { text: "I am Laurence De Guzman", showBase: false, delay: 100 },

                // Wait with "I am Laurence De Guzman"
                { text: "I am Laurence De Guzman", showBase: false, delay: 2000 },

                // Backspace everything
                { text: "I am Laurence De Guzma", showBase: false, delay: 50 },
                { text: "I am Laurence De Guzm", showBase: false, delay: 50 },
                { text: "I am Laurence De Guz", showBase: false, delay: 50 },
                { text: "I am Laurence De Gu", showBase: false, delay: 50 },
                { text: "I am Laurence De G", showBase: false, delay: 50 },
                { text: "I am Laurence De ", showBase: false, delay: 50 },
                { text: "I am Laurence De", showBase: false, delay: 50 },
                { text: "I am Laurence D", showBase: false, delay: 50 },
                { text: "I am Laurence ", showBase: false, delay: 50 },
                { text: "I am Laurence", showBase: false, delay: 50 },
                { text: "I am Lauren", showBase: false, delay: 50 },
                { text: "I am Laure", showBase: false, delay: 50 },
                { text: "I am Laur", showBase: false, delay: 50 },
                { text: "I am Lau", showBase: false, delay: 50 },
                { text: "I am La", showBase: false, delay: 50 },
                { text: "I am L", showBase: false, delay: 50 },
                { text: "I am ", showBase: false, delay: 50 },
                { text: "I am", showBase: false, delay: 50 },
                { text: "I a", showBase: false, delay: 50 },
                { text: "I ", showBase: false, delay: 50 },
                { text: "I", showBase: false, delay: 50 },
                { text: "", showBase: false, delay: 50 },

                // Type "I am Goodman"
                { text: "I", showBase: false, delay: 100 },
                { text: "I ", showBase: false, delay: 80 },
                { text: "I a", showBase: false, delay: 100 },
                { text: "I am", showBase: false, delay: 100 },
                { text: "I am ", showBase: false, delay: 120 },
                { text: "I am G", showBase: false, delay: 100 },
                { text: "I am Go", showBase: false, delay: 100 },
                { text: "I am Goo", showBase: false, delay: 100 },
                { text: "I am Good", showBase: false, delay: 100 },
                { text: "I am Goodm", showBase: false, delay: 100 },
                { text: "I am Goodma", showBase: false, delay: 100 },
                { text: "I am Goodman", showBase: false, delay: 100 },

                // Wait
                { text: "I am Goodman", showBase: false, delay: 1500 },

                // Backspace everything
                { text: "I am Goodma", showBase: false, delay: 50 },
                { text: "I am Goodm", showBase: false, delay: 50 },
                { text: "I am Good", showBase: false, delay: 50 },
                { text: "I am Goo", showBase: false, delay: 50 },
                { text: "I am Go", showBase: false, delay: 50 },
                { text: "I am G", showBase: false, delay: 50 },
                { text: "I am ", showBase: false, delay: 50 },
                { text: "I am", showBase: false, delay: 50 },
                { text: "I a", showBase: false, delay: 50 },
                { text: "I ", showBase: false, delay: 50 },
                { text: "I", showBase: false, delay: 50 },
                { text: "", showBase: false, delay: 50 },

                // Type "not Saul Goodman"
                { text: "n", showBase: false, delay: 100 },
                { text: "no", showBase: false, delay: 100 },
                { text: "not", showBase: false, delay: 100 },
                { text: "not ", showBase: false, delay: 120 },
                { text: "not S", showBase: false, delay: 100 },
                { text: "not Sa", showBase: false, delay: 100 },
                { text: "not Sau", showBase: false, delay: 100 },
                { text: "not Saul", showBase: false, delay: 100 },
                { text: "not Saul ", showBase: false, delay: 120 },
                { text: "not Saul G", showBase: false, delay: 100 },
                { text: "not Saul Go", showBase: false, delay: 100 },
                { text: "not Saul Goo", showBase: false, delay: 100 },
                { text: "not Saul Good", showBase: false, delay: 100 },
                { text: "not Saul Goodm", showBase: false, delay: 100 },
                { text: "not Saul Goodma", showBase: false, delay: 100 },
                { text: "not Saul Goodman", showBase: false, delay: 100 },

                // Wait
                { text: "not Saul Goodman", showBase: false, delay: 1500 },

                // Backspace everything
                { text: "not Saul Goodma", showBase: false, delay: 50 },
                { text: "not Saul Goodm", showBase: false, delay: 50 },
                { text: "not Saul Good", showBase: false, delay: 50 },
                { text: "not Saul Goo", showBase: false, delay: 50 },
                { text: "not Saul Go", showBase: false, delay: 50 },
                { text: "not Saul G", showBase: false, delay: 50 },
                { text: "not Saul ", showBase: false, delay: 50 },
                { text: "not Saul", showBase: false, delay: 50 },
                { text: "not Sau", showBase: false, delay: 50 },
                { text: "not Sa", showBase: false, delay: 50 },
                { text: "not S", showBase: false, delay: 50 },
                { text: "not ", showBase: false, delay: 50 },
                { text: "not", showBase: false, delay: 50 },
                { text: "no", showBase: false, delay: 50 },
                { text: "n", showBase: false, delay: 50 },
                { text: "", showBase: false, delay: 50 },

                // Type "you got it?"
                { text: "y", showBase: false, delay: 100 },
                { text: "yo", showBase: false, delay: 100 },
                { text: "you", showBase: false, delay: 100 },
                { text: "you ", showBase: false, delay: 120 },
                { text: "you g", showBase: false, delay: 100 },
                { text: "you go", showBase: false, delay: 100 },
                { text: "you got", showBase: false, delay: 100 },
                { text: "you got ", showBase: false, delay: 120 },
                { text: "you got i", showBase: false, delay: 100 },
                { text: "you got it", showBase: false, delay: 100 },
                { text: "you got it?", showBase: false, delay: 100 },

                // Wait
                { text: "you got it?", showBase: false, delay: 2000 },

                // Backspace everything
                { text: "you got it", showBase: false, delay: 50 },
                { text: "you got i", showBase: false, delay: 50 },
                { text: "you got ", showBase: false, delay: 50 },
                { text: "you got", showBase: false, delay: 50 },
                { text: "you go", showBase: false, delay: 50 },
                { text: "you g", showBase: false, delay: 50 },
                { text: "you ", showBase: false, delay: 50 },
                { text: "you", showBase: false, delay: 50 },
                { text: "yo", showBase: false, delay: 50 },
                { text: "y", showBase: false, delay: 50 },
                { text: "", showBase: false, delay: 500 },

                // Show base name again and loop
                { text: "", showBase: true, delay: 500, restart: true }
            ];

            const typeStep = () => {
                if (step < sequence.length) {
                    setLogoTypedText(sequence[step].text);
                    setShowBaseName(sequence[step].showBase !== undefined ? sequence[step].showBase : false);

                    if (sequence[step].restart) {
                        const timeout = setTimeout(() => {
                            startSequence(); // Restart the sequence
                        }, sequence[step].delay);
                        timeouts.push(timeout);
                    } else {
                        const timeout = setTimeout(typeStep, sequence[step].delay);
                        timeouts.push(timeout);
                        step++;
                    }
                }
            };

            typeStep();
        };

        startSequence();

        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, []);

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }, []);

    // Floating characters
    useEffect(() => {
        const createFloatingChar = () => {
            const chars = ['{', '}', '<', '>', '(', ')', '[', ']', ';', ':', '=', '+', '-', '*', '/', '%', '&', '|', '!', '?'];
            const sizes = ['small', 'medium', 'large'];
            const colors = theme === 'light' ? [
                'rgba(2, 132, 199, 0.3)',
                'rgba(245, 158, 11, 0.3)',
                'rgba(16, 185, 129, 0.3)',
                'rgba(139, 92, 246, 0.3)'
            ] : [
                'rgba(14, 165, 233, 0.1)',
                'rgba(245, 158, 11, 0.1)',
                'rgba(16, 185, 129, 0.1)',
                'rgba(139, 92, 246, 0.1)'
            ];
            
            const isMobile = window.innerWidth <= 768;
            if (isMobile && Math.random() > 0.6) return;
            
            const newChar = {
                id: Math.random(),
                char: chars[Math.floor(Math.random() * chars.length)],
                size: sizes[Math.floor(Math.random() * sizes.length)],
                left: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                duration: Math.random() * 8 + (isMobile ? 12 : 8),
                delay: Math.random() * 2
            };
            
            setFloatingChars(prev => [...prev, newChar]);
            
            setTimeout(() => {
                setFloatingChars(prev => prev.filter(c => c.id !== newChar.id));
            }, (newChar.duration + newChar.delay) * 1000);
        };

        const interval = setInterval(createFloatingChar, window.innerWidth <= 768 ? 1200 : 800);

        const initialCount = window.innerWidth <= 768 ? 8 : 15;
        for (let i = 0; i < initialCount; i++) {
            setTimeout(createFloatingChar, i * 300);
        }

        return () => clearInterval(interval);
    }, [theme]);

    // Audio Player Effects
    useEffect(() => {
        if (audioRef.current) {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleCanPlay = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            if (isLooping) {
                // Replay current track
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(err => console.error('Error looping track:', err));
                }
            } else {
                // Play next track automatically
                playNext();
            }
        };

        const handleError = () => {
            console.error('Audio failed to load');
            setAudioError(true);
        };

        // Load metadata immediately if available
        if (audio.duration && !isNaN(audio.duration)) {
            setDuration(audio.duration);
        }

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        // Only load audio metadata on mount, not on every volume change
        if (!duration) {
            audio.load();
        }

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
        }
    }, [currentTrackIndex, isLooping, isShuffle]); // Re-run when track changes or loop/shuffle toggles

    // Separate effect to update volume without reloading audio
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Audio Player Functions
    const togglePlayPause = async () => {
        if (audioRef.current && !audioError) {
        try {
            if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            } else {
            await audioRef.current.play();
            setIsPlaying(true);
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            setAudioError(true);
        }
        }
    };

    const handleProgressClick = (e) => {
        if (audioRef.current && duration) {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audioRef.current.currentTime = percent * duration;
        }
    };

    // Draggable seek bar handlers
    const handleProgressMouseDown = (e) => {
        const progressBar = e.currentTarget;
        const handleMouseMove = (moveEvent) => {
            if (audioRef.current && duration) {
                const rect = progressBar.getBoundingClientRect();
                const percent = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                audioRef.current.currentTime = percent * duration;
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Immediately seek on mousedown
        handleProgressClick(e);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
        }
        if (newVolume === 0) {
        setIsMuted(true);
        } else {
        setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (isMuted) {
        setVolume(previousVolume);
        setIsMuted(false);
        if (audioRef.current) {
            audioRef.current.volume = previousVolume / 100;
        }
        } else {
        setPreviousVolume(volume);
        setVolume(0);
        setIsMuted(true);
        if (audioRef.current) {
            audioRef.current.volume = 0;
        }
        }
    };

   const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
};

const playNext = () => {
    let nextIndex;

    if (isShuffle) {
        // Generate random index that's different from current
        do {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } while (nextIndex === currentTrackIndex && playlist.length > 1);
    } else {
        nextIndex = (currentTrackIndex + 1) % playlist.length;
    }

    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (audioRef.current) {
        audioRef.current.src = playlist[nextIndex].src;
        if (isPlaying) {
            audioRef.current.play().catch(err => console.error('Error playing next track:', err));
        }
    }
};

const playPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
    if (audioRef.current) {
        audioRef.current.src = playlist[prevIndex].src;
        if (isPlaying) {
            audioRef.current.play().catch(err => console.error('Error playing previous track:', err));
        }
    }
};

const toggleLoop = () => {
    setIsLooping(!isLooping);
};

const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
};

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getVolumeIcon = () => {
        if (volume === 0 || isMuted) return 'fas fa-volume-mute';
        if (volume < 50) return 'fas fa-volume-down';
        return 'fas fa-volume-up';
    };


    // Custom smooth scroll with unique easing
useEffect(() => {
    const handleNavClick = (e) => {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.offsetTop - 80;
                const distance = targetPosition - startPosition;
                const duration = 1200;
                let start = null;
                
                const easeInOutCubic = (t) => {
                    return t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                };
                
                const animation = (currentTime) => {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easing = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + distance * easing);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                };
                
                requestAnimationFrame(animation);
            }
        }
    };
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    return () => {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.removeEventListener('click', handleNavClick);
        });
    };
}, []);

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, []);

    // Preload tap sound
    useEffect(() => {
        tapSoundRef.current = new Audio('/when-tap.mp3');
        tapSoundRef.current.volume = 0.3;
        tapSoundRef.current.load();
    }, []);

    // Custom cursor effect - Desktop only
    useEffect(() => {
        // Check if device has touch screen (mobile/tablet)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Only enable cursor on desktop (non-touch devices)
        if (isTouchDevice) {
            return; // Exit early on mobile devices
        }

        const moveCursor = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
            if (cursorRef.current) {
                cursorRef.current.style.left = e.clientX + 'px';
                cursorRef.current.style.top = e.clientY + 'px';
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Play tap sound on click (except on canvas/3D elements)
        const handleClick = (e) => {
            // Don't play if clicking on canvas (3D geometries have their own sound)
            if (e.target.tagName !== 'CANVAS' && tapSoundRef.current) {
                tapSoundRef.current.currentTime = 0;
                tapSoundRef.current.play().catch(err => console.log('Tap sound failed:', err));
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    // Smooth scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.section, .card, .skill-item');
        elements.forEach((el) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Navigation functions
    const toggleMenu = () => {
        setIsNavMenuActive(!isNavMenuActive);
    };

    const closeMenu = () => {
        setIsNavMenuActive(false);
    };

    // Form submission with EmailJS
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Send email using EmailJS
            const result = await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            console.log('Email sent successfully:', result.text);
            setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
            formRef.current.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSubmitMessage('');
            }, 5000);
        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitMessage('Failed to send message. Please try again or email me directly.');
            
            // Clear error message after 5 seconds
            setTimeout(() => {
                setSubmitMessage('');
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Image handlers
    const handleImageError = (e) => {
        const alternatives = ['prof.jpg', './prof.jpg', 'Prof.jpg', 'prof.JPG', 'PROF.JPG', 'prof.png', 'prof.jpeg'];
        const currentSrc = e.target.src.split('/').pop();
        const currentIndex = alternatives.indexOf(currentSrc);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < alternatives.length) {
            e.target.src = '/' + alternatives[nextIndex];
        } else {
            e.target.style.display = 'none';
            const fallbackIcon = e.target.nextElementSibling;
            if (fallbackIcon) fallbackIcon.style.display = 'block';
        }
    };

    const handleGlitch = () => {
    const glitchSequence = [
        'Guzman',
        'Gxrman',
        'Gktman',
        'Glpdan',
        'Gnqman',
        'Gwtsan',
        'Grjdan',
        'Gvkman',
        'Gybdan',
        'Gufman',
        'Gudman'
    ];

    let index = 0;
    const interval = setInterval(() => {
        if (index < glitchSequence.length) {
            setGlitchText(glitchSequence[index]);
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => setGlitchText('Guzman'), 500);
        }
    }, 80);
};

    // Toggle flip card
    const toggleFlip = (cardId) => {
        setFlippedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }));
    };

    // Toggle theme (cycles through original -> dark -> light -> original)
    const toggleTheme = () => {
        setIsThemeTransitioning(true);
        setTimeout(() => {
            setTheme(prev => {
                if (prev === 'original') return 'dark';
                if (prev === 'dark') return 'light';
                return 'original';
            });
            setTimeout(() => setIsThemeTransitioning(false), 500);
        }, 300);
    };

    return (
        <>
            <Head>
                <title>Laurence De Guzman-Portfolio</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
                <style>{`
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                        :root {
                        ${theme === 'original' ? `
                        /* Original Blue Theme */
                        --primary-color: #0ea5e9;
                        --secondary-color: #1e293b;
                        --accent-color: #3b82f6;
                        --text-primary: #f8fafc;
                        --text-secondary: #94a3b8;
                        --bg-primary: #0f172a;
                        --bg-secondary: #1e293b;
                        --bg-card: #1e293b;
                        --border-color: #334155;
                        ` : theme === 'dark' ? `
                        /* Dark Mode (Black/White) */
                        --primary-color: #ffffff;
                        --secondary-color: #111827;
                        --accent-color: #e5e7eb;
                        --text-primary: #ffffff;
                        --text-secondary: #d1d5db;
                        --bg-primary: #000000;
                        --bg-secondary: #0a0a0a;
                        --bg-card: #171717;
                        --border-color: #262626;
                        ` : `
                        /* Light Mode */
                        --primary-color: #0284c7;
                        --secondary-color: #e2e8f0;
                        --accent-color: #0369a1;
                        --text-primary: #0f172a;
                        --text-secondary: #475569;
                        --bg-primary: #ffffff;
                        --bg-secondary: #f8fafc;
                        --bg-card: #ffffff;
                        --border-color: #cbd5e1;
                        `}
                    }

                        html {
                            scroll-behavior: smooth;
                        }

                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                            line-height: 1.6;
                            color: var(--text-primary);
                            background-color: var(--bg-primary);
                            overflow-x: hidden;
                            cursor: none;
                            margin: 0;
                            padding: 0;
                            transition: background-color 0.5s ease, color 0.5s ease;
                        }

                        /* Theme Transition Overlay */
                        .theme-transition-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: ${theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)'};
                            z-index: 99999;
                            pointer-events: none;
                            animation: fadeIn 0.3s ease-in, fadeIn 0.5s ease-out 0.3s reverse;
                        }

                        /* Custom space-themed cursor - Desktop only */
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

                        /* Hide custom cursor on mobile/touch devices */
                        @media (hover: none) and (pointer: coarse) {
                            .custom-cursor {
                                display: none !important;
                            }
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

                        /* Submit Message Notification */
                        .submit-message {
                            padding: 1rem;
                            border-radius: 8px;
                            margin-bottom: 1rem;
                            text-align: center;
                            font-weight: 500;
                            animation: slideIn 0.3s ease-out;
                        }

                        .submit-message.success {
                            background: rgba(16, 185, 129, 0.1);
                            border: 1px solid rgba(16, 185, 129, 0.3);
                            color: #10b981;
                        }

                        .submit-message.error {
                            background: rgba(239, 68, 68, 0.1);
                            border: 1px solid rgba(239, 68, 68, 0.3);
                            color: #ef4444;
                        }

                        @keyframes slideIn {
                            from {
                                opacity: 0;
                                transform: translateY(-10px);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        /* Audio Player Styles */
                        .audio-player {
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background: linear-gradient(135deg, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
                            backdrop-filter: blur(30px);
                            border: 1px solid rgba(14, 165, 233, 0.2);
                            border-radius: 16px;
                            padding: 16px;
                            display: flex;
                            flex-direction: column;
                            gap: 12px;
                            z-index: 1001;
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(14, 165, 233, 0.1);
                            min-width: 280px;
                            max-width: calc(100vw - 40px);
                        }

                        .audio-player:hover {
                            background: linear-gradient(135deg, rgba(30, 41, 59, 1), rgba(15, 23, 42, 1));
                            border-color: var(--primary-color);
                            transform: translateY(-4px);
                            box-shadow: 0 15px 50px rgba(14, 165, 233, 0.3), 0 0 0 1px var(--primary-color);
                        }

                        .audio-player.minimized {
                            min-width: 60px;
                            padding: 12px;
                            gap: 0;
                            border-radius: 50%;
                        }

                        .audio-player.minimized .audio-info,
                        .audio-player.minimized .audio-controls,
                        .audio-player.minimized .volume-control,
                        .audio-player.minimized .player-header {
                            display: none;
                        }

                        .player-header {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            margin-bottom: 8px;
                        }

                        .player-title {
                            font-size: 0.75rem;
                            color: ${theme === 'light' ? '#ffffff' : 'var(--text-secondary)'};
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            font-weight: 700;
                            text-shadow: ${theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none'};
                        }

                        .play-pause-btn {
                            background: ${theme === 'dark' ? 'linear-gradient(135deg, #ffffff, #e5e7eb)' : 'linear-gradient(135deg, var(--primary-color), var(--accent-color))'};
                            border: none;
                            border-radius: 50%;
                            width: 48px;
                            height: 48px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            color: ${theme === 'dark' ? '#000000' : 'white'};
                            font-size: 18px;
                            transition: all 0.3s ease;
                            flex-shrink: 0;
                            box-shadow: ${theme === 'dark' ? '0 4px 15px rgba(255, 255, 255, 0.3)' : '0 4px 15px rgba(14, 165, 233, 0.3)'};
                            position: relative;
                            overflow: hidden;
                        }

                        .play-pause-btn::before {
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

                        .play-pause-btn:hover::before {
                            width: 100%;
                            height: 100%;
                        }

                        .play-pause-btn:hover {
                            transform: scale(1.15);
                            box-shadow: ${theme === 'dark' ? '0 6px 20px rgba(255, 255, 255, 0.5)' : '0 6px 20px rgba(14, 165, 233, 0.5)'};
                        }

                        .play-pause-btn:active {
                            transform: scale(1.05);
                        }

                        .play-pause-btn:disabled {
                            opacity: 0.5;
                            cursor: not-allowed;
                        }

                        .play-pause-btn i {
                            position: relative;
                            z-index: 1;
                        }

                        .audio-info {
                            flex-grow: 1;
                            min-width: 0;
                            overflow: hidden;
                        }

                        .audio-title {
                            font-size: 0.9rem;
                            font-weight: 600;
                            color: ${theme === 'light' ? '#ffffff' : 'var(--text-primary)'};
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-bottom: 8px;
                            text-shadow: ${theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none'};
                        }

                        .audio-progress {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-size: 0.7rem;
                            color: ${theme === 'light' ? '#ffffff' : 'var(--text-secondary)'};
                            font-weight: 600;
                            text-shadow: ${theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : 'none'};
                        }

                        .progress-bar {
                            flex-grow: 1;
                            height: 6px;
                            background: rgba(148, 163, 184, 0.15);
                            border-radius: 10px;
                            overflow: visible;
                            cursor: pointer;
                            min-width: 60px;
                            position: relative;
                            transition: all 0.3s ease;
                        }

                        .progress-bar:hover {
                            height: 8px;
                            background: rgba(148, 163, 184, 0.25);
                        }

                        .progress-bar:active {
                            cursor: grabbing;
                        }

                        .progress-fill {
                            height: 100%;
                            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                            transition: width 0.1s ease;
                            border-radius: 10px;
                            position: relative;
                            box-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
                        }

                        .progress-thumb {
                            position: absolute;
                            right: -8px;
                            top: 50%;
                            transform: translateY(-50%);
                            width: 14px;
                            height: 14px;
                            background: white;
                            border-radius: 50%;
                            box-shadow: 0 0 8px rgba(14, 165, 233, 0.8), 0 2px 4px rgba(0, 0, 0, 0.2);
                            opacity: 0;
                            transition: all 0.2s ease;
                            pointer-events: none;
                        }

                        .progress-bar:hover .progress-thumb {
                            opacity: 1;
                            width: 16px;
                            height: 16px;
                            right: -9px;
                        }

                        .progress-bar:active .progress-thumb {
                            opacity: 1;
                            width: 18px;
                            height: 18px;
                            right: -10px;
                            box-shadow: 0 0 12px rgba(14, 165, 233, 1), 0 2px 6px rgba(0, 0, 0, 0.3);
                        }

                        .audio-controls {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                        }

                        .control-btn, .minimize-btn {
                            background: rgba(148, 163, 184, 0.1);
                            border: 1px solid rgba(148, 163, 184, 0.2);
                            color: var(--text-secondary);
                            font-size: 14px;
                            cursor: pointer;
                            padding: 8px;
                            border-radius: 8px;
                            transition: all 0.3s ease;
                            width: 36px;
                            height: 36px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-shrink: 0;
                        }

                        .control-btn:hover, .minimize-btn:hover {
                            color: var(--primary-color);
                            background: rgba(14, 165, 233, 0.15);
                            border-color: var(--primary-color);
                            transform: translateY(-2px);
                            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
                        }

                        .control-btn:active, .minimize-btn:active {
                            transform: translateY(0);
                        }

                        .control-btn.active {
                            color: var(--primary-color);
                            background: rgba(14, 165, 233, 0.25);
                            border-color: var(--primary-color);
                            box-shadow: 0 0 15px rgba(14, 165, 233, 0.4);
                        }

                        .control-btn.active:hover {
                            background: rgba(14, 165, 233, 0.35);
                            box-shadow: 0 4px 20px rgba(14, 165, 233, 0.5);
                        }

                        .minimize-btn {
                            border-radius: 50%;
                        }

                        .volume-control {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding-top: 8px;
                            border-top: 1px solid rgba(148, 163, 184, 0.1);
                        }

                        .volume-slider {
                            width: 100%;
                            height: 4px;
                            background: rgba(148, 163, 184, 0.2);
                            border-radius: 10px;
                            outline: none;
                            cursor: pointer;
                            -webkit-appearance: none;
                            transition: all 0.3s ease;
                        }

                        .volume-slider:hover {
                            background: rgba(148, 163, 184, 0.3);
                        }

                        .volume-slider::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            width: 14px;
                            height: 14px;
                            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                            border-radius: 50%;
                            cursor: pointer;
                            box-shadow: 0 2px 8px rgba(14, 165, 233, 0.4);
                            transition: all 0.3s ease;
                        }

                        .volume-slider::-webkit-slider-thumb:hover {
                            transform: scale(1.2);
                            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.6);
                        }

                        .volume-slider::-moz-range-thumb {
                            width: 14px;
                            height: 14px;
                            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                            border-radius: 50%;
                            cursor: pointer;
                            border: none;
                            box-shadow: 0 2px 8px rgba(14, 165, 233, 0.4);
                        }

                        @media (min-width: 769px) {
                            .audio-player {
                                min-width: 320px;
                                padding: 20px;
                                gap: 16px;
                            }

                            .audio-player.minimized {
                                min-width: 60px;
                                padding: 15px;
                            }

                            .play-pause-btn {
                                width: 52px;
                                height: 52px;
                                font-size: 20px;
                            }
                        }

                        /* Mouse Spotlight Effect - Desktop Only */

                        /* Floating Characters Background */
                        .floating-chars {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: 1;
                        }

                        .floating-char {
                            position: absolute;
                            font-family: 'Courier New', monospace;
                            font-weight: bold;
                            animation: float-and-rotate 15s linear infinite;
                        }

                        .floating-char.small { font-size: 1rem; }
                        .floating-char.medium { font-size: 1.5rem; }
                        .floating-char.large { font-size: 2rem; }

                        @media (min-width: 769px) {
                            .floating-char { font-size: 2rem; }
                            .floating-char.small { font-size: 1.5rem; }
                            .floating-char.medium { font-size: 2.5rem; }
                            .floating-char.large { font-size: 3.5rem; }
                        }

                        @keyframes float-and-rotate {
                            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                            10% { opacity: 1; }
                            90% { opacity: 1; }
                            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                        }

                        /* Navigation - Mobile First */
                        .navbar {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            width: 100%;
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.15)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.5)'
                                : 'rgba(15, 23, 42, 0.4)'};
                            backdrop-filter: blur(25px) saturate(180%);
                            -webkit-backdrop-filter: blur(25px) saturate(180%);
                            border-bottom: 1px solid ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.3)'
                                : 'rgba(148, 163, 184, 0.15)'};
                            z-index: 1000;
                            transition: all 0.3s ease, background 0.5s ease, border-color 0.5s ease;
                            box-shadow:
                                0 4px 24px 0 rgba(0, 0, 0, 0.08),
                                inset 0 -1px 0 0 rgba(255, 255, 255, 0.05);
                        }

                        .nav-container {
                            max-width: 1200px;
                            margin: 0 auto;
                            padding: 0.8rem 1rem;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        .logo {
                            font-size: 1.2rem;
                            font-weight: 700;
                            color: ${theme === 'light' ? '#0284c7' : 'var(--primary-color)'};
                            display: flex;
                            align-items: center;
                            gap: 0.3rem;
                            position: relative;
                            min-width: 250px;
                            width: 250px;
                            white-space: nowrap;
                            overflow: hidden;
                        }

                        .logo-base {
                            color: ${theme === 'light' ? '#0284c7' : 'var(--primary-color)'};
                            min-width: fit-content;
                        }

                        .logo-text {
                            color: ${theme === 'light' ? '#0284c7' : 'var(--primary-color)'};
                        }

                        /* Mobile Navigation */
                        .nav-menu {
                            display: none;
                            position: fixed;
                            top: 60px;
                            left: 0;
                            width: 100%;
                            background: rgba(15, 23, 42, 0.98);
                            backdrop-filter: blur(20px);
                            border-bottom: 1px solid var(--border-color);
                            flex-direction: column;
                            padding: 1rem 0;
                            gap: 0;
                        }

                        .nav-menu.active { display: flex; }
                        .nav-menu li { list-style: none; }
                        .nav-menu a,
                        .nav-menu button {
                            color: ${theme === 'light' ? '#1e293b' : 'var(--text-secondary)'};
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                            padding: 1rem 2rem;
                            display: block;
                            border-bottom: 1px solid ${theme === 'light' ? 'rgba(30, 41, 59, 0.1)' : 'rgba(51, 65, 85, 0.3)'};
                            position: relative;
                            text-shadow: ${theme === 'light' ? 'none' : 'none'};
                            overflow: hidden;
                            width: 100%;
                            text-align: left;
                            text-shadow: ${theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.4)' : 'none'};
                        }

                        .nav-menu a::before,
                        .nav-menu button::before {
                            content: '';
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                            width: 3px;
                            background: linear-gradient(180deg, var(--primary-color), var(--accent-color));
                            transform: translateX(-100%);
                            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                        }

                        .nav-menu a:hover,
                        .nav-menu button:hover {
                            color: var(--primary-color);
                            background: rgba(14, 165, 233, 0.03);
                            letter-spacing: 1px;
                        }

                        .nav-menu a:hover::before,
                        .nav-menu button:hover::before {
                            transform: translateX(0);
                        }

                        /* Dropdown Menu Styles - Mobile */
                        .nav-dropdown {
                            position: relative;
                        }

                        .nav-dropdown > a {
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                        }

                        .nav-dropdown > a i {
                            font-size: 0.75rem;
                            transition: transform 0.3s ease;
                        }

                        .nav-dropdown:hover > a i {
                            transform: rotate(180deg);
                        }

                        .dropdown-menu {
                            list-style: none;
                            padding: 0;
                            margin: 0;
                            background: rgba(15, 23, 42, 0.95);
                            border-left: 3px solid var(--primary-color);
                            max-height: 0;
                            overflow: hidden;
                            transition: max-height 0.3s ease;
                        }

                        .dropdown-menu.show {
                            max-height: 500px;
                        }

                        .dropdown-menu li {
                            list-style: none;
                        }

                        .dropdown-menu a {
                            padding: 0.75rem 2rem 0.75rem 3rem !important;
                            font-size: 0.9rem;
                            border-bottom: 1px solid rgba(51, 65, 85, 0.2);
                        }

                        .dropdown-menu a:hover {
                            background: rgba(14, 165, 233, 0.05);
                        }

                        .mobile-menu-btn {
                            display: block;
                            background: none;
                            border: none;
                            color: ${theme === 'light' ? '#1e293b' : 'var(--text-secondary)'};
                            font-size: 1.5rem;
                            cursor: pointer;
                            padding: 8px 12px;
                            margin-right: 4px;
                            transition: color 0.3s ease;
                        }

                        .mobile-menu-btn:hover { color: ${theme === 'light' ? '#0284c7' : 'var(--primary-color)'}; }

                        /* Theme Toggle Button */
                        .theme-toggle-btn {
                            background: transparent;
                            border: none;
                            color: ${theme === 'light' ? '#1e293b' : 'var(--text-secondary)'};
                            font-size: 0.85rem;
                            font-weight: 500;
                            cursor: pointer;
                            padding: 6px 10px;
                            border-radius: 4px;
                            transition: all 0.2s ease;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            margin-left: 0.5rem;
                            text-transform: lowercase;
                            letter-spacing: 0.3px;
                            position: relative;
                            overflow: hidden;
                        }

                        .theme-toggle-btn:hover {
                            color: ${theme === 'light' ? '#0284c7' : 'var(--primary-color)'};
                            background: ${theme === 'light' ? 'rgba(2, 132, 199, 0.08)' : 'rgba(14, 165, 233, 0.05)'};
                        }

                        .theme-toggle-btn:active {
                            transform: scale(0.98);
                        }

                        .theme-toggle-btn:active::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 20px;
                            height: 20px;
                            background: var(--primary-color);
                            border-radius: 50%;
                            opacity: 0.3;
                            animation: ripple 0.6s ease-out;
                        }

                        .theme-toggle-btn i {
                            font-size: 0.9rem;
                            transition: transform 0.3s ease;
                        }

                        .theme-icon-rotating {
                            animation: rotateIcon 0.8s ease-in-out !important;
                        }

                        /* Desktop Navigation */
                        @media (min-width: 769px) {
                        .nav-container { padding: 1rem 2rem; }
                        .logo { font-size: 1.5rem; gap: 0.5rem; min-width: 320px; width: 320px; white-space: nowrap; overflow: hidden; }
                        
                        .nav-menu {
                            display: flex !important;
                            position: static;
                            width: auto;
                            background: none;
                            backdrop-filter: none;
                            border: none;
                            flex-direction: row;
                            padding: 0;
                            gap: 2rem;
                        }
                        
                        .nav-menu a,
                        .nav-menu button {
                            padding: 0.5rem 0;
                            border: none;
                            position: relative;
                            overflow: visible;
                            background: none;
                            width: auto;
                            line-height: inherit;
                            margin: 0;
                            font-size: inherit;
                            font-family: inherit;
                        }

                        .nav-menu button {
                            vertical-align: top;
                        }

                        .nav-menu a::before,
                        .nav-menu button::before {
                            content: '';
                            position: absolute;
                            width: 100%;
                            height: 2px;
                            bottom: 0;
                            left: 0;
                            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                            transform: scaleX(0);
                            transform-origin: right;
                            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                        }

                        .nav-menu a::after,
                        .nav-menu button::after {
                            content: '';
                            position: absolute;
                            width: 6px;
                            height: 6px;
                            background: var(--accent-color);
                            border-radius: 50%;
                            bottom: -2px;
                            left: 50%;
                            transform: translate(-50%, 10px) scale(0);
                            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                            box-shadow: 0 0 10px var(--accent-color);
                        }

                        .nav-menu a:hover,
                        .nav-menu button:hover {
                            background: none;
                            letter-spacing: 2px;
                            transform: translateY(-2px);
                        }

                        .nav-menu a:hover::before,
                        .nav-menu button:hover::before {
                            transform: scaleX(1);
                            transform-origin: left;
                        }

                        .nav-menu a:hover::after,
                        .nav-menu button:hover::after {
                            transform: translate(-50%, 0) scale(1);
                        }

                        /* Desktop Dropdown - Floating Box */
                        .nav-dropdown {
                            position: relative;
                        }

                        .dropdown-menu {
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            margin-top: 1rem;
                            background: rgba(15, 23, 42, 0.98);
                            backdrop-filter: blur(20px);
                            border: 1px solid rgba(14, 165, 233, 0.3);
                            border-radius: 8px;
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                            min-width: 250px;
                            padding: 0.5rem 0;
                            opacity: 0;
                            visibility: hidden;
                            transform: translateX(-50%) translateY(-10px);
                            transition: all 0.3s ease;
                            z-index: 1000;
                        }

                        .dropdown-menu.show {
                            opacity: 1;
                            visibility: visible;
                            transform: translateX(-50%) translateY(0);
                            max-height: none;
                        }

                        .dropdown-menu::before {
                            content: '';
                            position: absolute;
                            top: -8px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 0;
                            height: 0;
                            border-left: 8px solid transparent;
                            border-right: 8px solid transparent;
                            border-bottom: 8px solid rgba(14, 165, 233, 0.3);
                        }

                        .dropdown-menu li {
                            list-style: none;
                        }

                        .dropdown-menu a {
                            padding: 0.75rem 1.5rem !important;
                            display: block;
                            color: var(--text-secondary) !important;
                            border: none !important;
                            font-size: 0.95rem;
                            transition: all 0.2s ease !important;
                        }

                        .dropdown-menu a::before,
                        .dropdown-menu a::after {
                            display: none !important;
                        }

                        .dropdown-menu a:hover {
                            background: rgba(14, 165, 233, 0.1) !important;
                            color: var(--primary-color) !important;
                            padding-left: 1.5rem !important;
                            letter-spacing: 0 !important;
                            transform: none !important;
                        }

                        .mobile-menu-btn { display: none; }
                    }

                        /* Hero Section */
                        .hero {
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                            position: relative;
                            background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
                            z-index: 2;
                            padding: 4rem 1rem 2rem;
                            overflow: hidden;
                            transition: background 0.5s ease;
                        }

                        /* Blend the bottom edge of hero into about section */
                        .hero::after {
                            content: '';
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            height: 100px;
                            background: linear-gradient(to bottom, transparent, var(--bg-primary));
                            pointer-events: none;
                            z-index: 3;
                        }

                        .hero-content {
                            max-width: 100%;
                            width: 100%;
                            position: relative;
                            z-index: 10;
                            pointer-events: none;
                        }

                        .hero-content .btn {
                            pointer-events: auto;
                        }

                        .hero-subtitle {
                            color: #0ea5e9;
                            font-size: 1rem;
                            font-weight: 500;
                            margin-bottom: 0.8rem;
                            opacity: 0;
                            animation: fadeInUp 1s ease 0.2s forwards;
                            text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(14, 165, 233, 0.5);
                        }

                        .hero-title {
                            font-size: 2.2rem;
                            font-weight: 700;
                            margin-bottom: 1rem;
                            background: ${theme === 'light'
                                ? 'linear-gradient(135deg, #1e293b, #0284c7, #7c3aed)'
                                : 'linear-gradient(135deg, #ffffff, #0ea5e9, #8b5cf6)'};
                            background-clip: text;
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            opacity: 0;
                            animation: fadeInUp 1s ease 0.4s forwards;
                            line-height: 1.2;
                            filter: ${theme === 'light'
                                ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                                : 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.5))'};
                        }

                       .glitch-text {
                            cursor: pointer;
                            display: inline-block;
                            transition: color 0.1s ease;
                        }

                        .glitch-text:hover {
                            color: var(--primary-color);
                        }
                        .typing-container {
                            font-size: 1.2rem;
                            color: #e0e7ff;
                            margin-bottom: 1.5rem;
                            opacity: 0;
                            animation: fadeInUp 1s ease 0.6s forwards;
                            min-height: 1.5rem;
                            text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.3);
                        }

                        .typing-text {
                            color: var(--primary-color);
                            font-weight: 600;
                        }

                        .serif-i {
                            font-family: 'Georgia', 'Times New Roman', serif;
                            font-weight: 400;
                            font-style: italic;
                        }

                        .cursor {
                            color: var(--accent-color);
                            animation: blink 1s infinite;
                        }

                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }

                        .hero-description {
                            font-size: 1rem;
                            color: ${theme === 'light' ? '#1e293b' : '#cbd5e1'};
                            margin-bottom: 2rem;
                            line-height: 1.6;
                            opacity: 0;
                            animation: fadeInUp 1s ease 0.8s forwards;
                            padding: 0 1rem;
                            text-shadow: ${theme === 'light' ? '0 1px 2px rgba(255, 255, 255, 0.5)' : '0 2px 15px rgba(0, 0, 0, 0.8)'};
                        }

                        .hero-buttons {
                            display: flex;
                            gap: 1rem;
                            justify-content: center;
                            flex-wrap: wrap;
                            opacity: 0;
                            animation: fadeInUp 1s ease 1s forwards;
                            padding: 0 1rem;
                        }

                        @media (min-width: 769px) {
                            .hero { padding: 2rem; }
                            .hero-content { max-width: 800px; }
                            .hero-subtitle { font-size: 1.1rem; margin-bottom: 1rem; }
                            .hero-title { font-size: 4rem; margin-bottom: 1.5rem; }
                            .typing-container { font-size: 1.5rem; margin-bottom: 2rem; min-height: 2rem; }
                            .hero-description { font-size: 1.2rem; margin-bottom: 2.5rem; line-height: 1.7; padding: 0; }
                            .hero-buttons { padding: 0; }
                        }

                        /* Buttons */
                        .btn {
                            padding: 12px 20px;
                            border-radius: 8px;
                            text-decoration: none;
                            font-weight: 500;
                            transition: all 0.3s ease, background 0.5s ease, color 0.5s ease, border-color 0.5s ease;
                            display: inline-flex;
                            align-items: center;
                            gap: 6px;
                            font-size: 0.9rem;
                            min-width: 140px;
                            justify-content: center;
                            border: none;
                            cursor: pointer;
                        }

                        .btn-primary {
                            background: ${theme === 'dark' ? '#ffffff' : 'var(--primary-color)'};
                            color: ${theme === 'dark' ? '#000000' : 'white'};
                            transition: all 0.3s ease, background 0.5s ease, color 0.5s ease;
                        }

                        .btn-primary:hover {
                            background: ${theme === 'dark' ? '#e5e7eb' : '#0284c7'};
                            transform: translateY(-5px);
                            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
                        }

                        .btn-primary:disabled {
                            opacity: 0.6;
                            cursor: not-allowed;
                            transform: none;
                        }

                        .btn-outline {
                            border: 2px solid var(--border-color);
                            color: var(--text-primary);
                            background: transparent;
                        }

                        .btn-outline:hover {
                            border-color: var(--primary-color);
                            color: var(--primary-color);
                            transform: translateY(-5px);
                            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
                        }

                        @media (min-width: 769px) {
                            .btn { padding: 12px 24px; gap: 8px; font-size: 1rem; min-width: auto; }
                        }

                        /* Section Styling */
                        .section {
                            padding: 60px 0;
                            position: relative;
                            z-index: 2;
                            transition: background-color 0.5s ease;
                        }

                        .container {
                            max-width: 1200px;
                            margin: 0 auto;
                            padding: 0 1rem;
                        }

                        .section-title {
                            font-size: 2rem;
                            font-weight: 700;
                            text-align: center;
                            margin-bottom: 2rem;
                            position: relative;
                            transition: color 0.5s ease;
                        }

                        .section-title::after {
                            content: '';
                            position: absolute;
                            width: 40px;
                            height: 3px;
                            background: var(--primary-color);
                            bottom: -8px;
                            left: 50%;
                            transform: translateX(-50%);
                            border-radius: 2px;
                        }

                        @media (min-width: 769px) {
                            .section { padding: 100px 0; }
                            .container { padding: 0 2rem; }
                            .section-title { font-size: 2.5rem; margin-bottom: 3rem; }
                            .section-title::after { width: 60px; height: 4px; bottom: -10px; }
                        }

                        /* About Section */
                        .about-content {
                            display: flex;
                            flex-direction: column;
                            gap: 2rem;
                            align-items: center;
                            text-align: center;
                        }

                        .profile-image {
                            width: 300px;
                            height: 300px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            overflow: hidden;
                            padding: 3px;
                            margin: 0 auto;
                            cursor: pointer;
                            transition: all 0.4s ease;
                            animation: profilePulse 3s ease-in-out infinite;
                        }

                        @keyframes profilePulse {
                            0%, 100% {
                                transform: scale(1) rotate(0deg);
                                box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
                            }
                            25% {
                                transform: scale(1.03) rotate(-2deg);
                                box-shadow: 0 12px 35px rgba(14, 165, 233, 0.4);
                            }
                            50% {
                                transform: scale(1.05) rotate(0deg);
                                box-shadow: 0 15px 40px rgba(14, 165, 233, 0.5);
                            }
                            75% {
                                transform: scale(1.03) rotate(2deg);
                                box-shadow: 0 12px 35px rgba(14, 165, 233, 0.4);
                            }
                        }

                        .profile-image:hover {
                            animation: none;
                            transform: scale(1.08) rotate(2deg);
                            box-shadow: 0 20px 50px rgba(14, 165, 233, 0.6);
                        }

.profile-image:active {
    transform: scale(0.98);
}

.profile-image:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 15px 40px rgba(14, 165, 233, 0.4);
}

.profile-image:active {
    transform: scale(0.98);
}

                        .profile-image img {
                            width: calc(100% - 6px);
                            height: calc(100% - 6px);
                            object-fit: cover;
                            object-position: center 20%;
                            border-radius: 50%;
                            display: block;
                            transition: all 0.3s ease;
                        }

                        .profile-image.flipping img {
                            animation: flipImage 0.6s ease-in-out;
                        }

                        @keyframes flipImage {
                            0% {
                                transform: rotateY(0deg) scale(1);
                                opacity: 1;
                            }
                            50% {
                                transform: rotateY(90deg) scale(0.8);
                                opacity: 0.3;
                            }
                            100% {
                                transform: rotateY(0deg) scale(1);
                                opacity: 1;
                            }
                        }

                        @keyframes rotateIcon {
                            0% {
                                transform: rotate(0deg) scale(1);
                            }
                            50% {
                                transform: rotate(180deg) scale(1.2);
                            }
                            100% {
                                transform: rotate(360deg) scale(1);
                            }
                        }

                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                        }

                        @keyframes ripple {
                            0% {
                                transform: scale(0);
                                opacity: 1;
                            }
                            100% {
                                transform: scale(4);
                                opacity: 0;
                            }
                        }

                        .profile-image .fallback-icon {
                            font-size: 3rem;
                            color: var(--primary-color);
                            display: none;
                        }

                        .about-text {
                            font-size: 1rem;
                            line-height: 1.7;
                            color: var(--text-secondary);
                            max-width: 100%;
                            text-align: justify;
                        }

                        .about-text p { margin-bottom: 1.2rem; }

                        @media (min-width: 769px) {
                            .about-content {
                                display: grid;
                                grid-template-columns: 350px 1fr;
                                gap: 4rem;
                                text-align: left;
                            }
                            
                            .profile-image {
                                width: 350px;
                                height: 350px;
                                border-radius: 50%;
                                padding: 4px;
                            }
                            
                            .profile-image img { 
                                border-radius: 50%; 
                                object-fit: cover;
                                object-position: center 20%;
                            }
                            .profile-image .fallback-icon { font-size: 4rem; }
                            .about-text { font-size: 1.1rem; line-height: 1.8; }
                            .about-text p { margin-bottom: 1.5rem; }
                        }

                        /* Current Learning Section */
                        .current-learning {
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.75)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.4)'
                                : 'rgba(15, 23, 42, 0.3)'};
                            backdrop-filter: blur(20px) saturate(180%);
                            -webkit-backdrop-filter: blur(20px) saturate(180%);
                            padding: 1.5rem;
                            border-radius: 16px;
                            border: 1px solid ${theme === 'light'
                                ? 'rgba(100, 116, 139, 0.2)'
                                : 'rgba(148, 163, 184, 0.2)'};
                            margin-top: 2rem;
                            text-align: center;
                            transition: all 0.3s ease;
                            position: relative;
                            box-shadow: ${theme === 'light'
                                ? '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
                                : '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'};
                        }

                        .current-learning::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 1px;
                            background: linear-gradient(90deg,
                                transparent,
                                ${theme === 'light' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(255, 255, 255, 0.3)'},
                                transparent);
                        }

                        .current-learning:hover {
                            transform: translateY(-5px);
                            border-color: var(--primary-color);
                            box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'};
                        }

                        .learning-tags {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 0.5rem;
                            margin-top: 1rem;
                            justify-content: center;
                        }

                        .tag {
                            background: rgba(14, 165, 233, 0.1);
                            color: var(--primary-color);
                            padding: 6px 12px;
                            border-radius: 16px;
                            font-size: 0.8rem;
                            border: 1px solid rgba(14, 165, 233, 0.2);
                            transition: all 0.3s ease;
                            white-space: nowrap;
                        }

                        .tag:hover {
                            transform: translateY(-5px) scale(1.05) !important;
                            background: rgba(14, 165, 233, 0.2) !important;
                            border-color: var(--primary-color) !important;
                            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4) !important;
                            color: var(--text-primary) !important;
                            cursor: pointer !important;
                        }

                        @media (min-width: 769px) {
                            .current-learning { padding: 2rem; border-radius: 16px; margin-top: 3rem; }
                            .tag { padding: 8px 16px; font-size: 0.9rem; border-radius: 20px; }
                            .learning-tags { justify-content: flex-start; }
                        }

                        /* Project Categories */
                        .project-categories {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                            gap: 2rem;
                            margin: 2rem 0;
                        }

                        .project-category-card {
                            background: ${theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.6)'};
                            backdrop-filter: blur(10px);
                            border: 2px solid ${theme === 'light' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(14, 165, 233, 0.3)'};
                            border-radius: 16px;
                            padding: 2rem;
                            cursor: pointer;
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                            position: relative;
                            overflow: hidden;
                        }

                        .project-category-card::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 4px;
                            background: linear-gradient(90deg, #0ea5e9, #3b82f6);
                            transform: scaleX(0);
                            transform-origin: left;
                            transition: transform 0.4s ease;
                        }

                        .project-category-card:hover::before {
                            transform: scaleX(1);
                        }

                        .project-category-card:hover {
                            transform: translateY(-10px) scale(1.02);
                            border-color: #0ea5e9;
                            box-shadow: 0 20px 40px rgba(14, 165, 233, 0.3);
                        }

                        .category-icon-wrapper {
                            width: 70px;
                            height: 70px;
                            background: linear-gradient(135deg, #0ea5e9, #3b82f6);
                            border-radius: 16px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 1.5rem;
                            transition: all 0.4s ease;
                        }

                        .project-category-card:hover .category-icon-wrapper {
                            transform: rotate(10deg) scale(1.1);
                            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.5);
                        }

                        .category-icon-wrapper i {
                            font-size: 2rem;
                            color: white;
                        }

                        .project-category-card h3 {
                            font-size: 1.5rem;
                            font-weight: 600;
                            color: ${theme === 'light' ? '#1e293b' : 'var(--text-primary)'};
                            margin-bottom: 0.75rem;
                        }

                        .project-category-card p {
                            color: ${theme === 'light' ? '#475569' : 'var(--text-secondary)'};
                            line-height: 1.6;
                            margin-bottom: 1.5rem;
                        }

                        .view-projects {
                            color: #0ea5e9;
                            font-weight: 600;
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: all 0.3s ease;
                        }

                        .project-category-card:hover .view-projects {
                            gap: 1rem;
                            color: #3b82f6;
                        }

                        /* Cards Grid */
                        .cards-grid {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: 1.5rem;
                            margin-top: 1.5rem;
                        }

                        .card {
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.75)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.4)'
                                : 'rgba(15, 23, 42, 0.3)'};
                            backdrop-filter: blur(20px) saturate(180%);
                            -webkit-backdrop-filter: blur(20px) saturate(180%);
                            border: 1px solid ${theme === 'light'
                                ? 'rgba(100, 116, 139, 0.2)'
                                : 'rgba(148, 163, 184, 0.2)'};
                            border-radius: 16px;
                            padding: 1.5rem;
                            transition: all 0.3s ease, background 0.5s ease, border-color 0.5s ease, color 0.5s ease;
                            position: relative;
                            overflow: hidden;
                            min-height: 240px;
                            cursor: pointer;
                            box-shadow: ${theme === 'light'
                                ? '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
                                : '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'};
                        }

                        .card::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 1px;
                            background: linear-gradient(90deg,
                                transparent,
                                ${theme === 'light' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(255, 255, 255, 0.3)'},
                                transparent);
                        }

                        /* Flip card container */
                        .flip-card {
                            perspective: 1500px;
                            min-height: 450px;
                            background: transparent;
                            transition: transform 0.3s ease;
                        }

                        .flip-card:hover {
                            transform: translateY(-5px);
                        }

                        .flip-card-inner {
                            position: relative;
                            width: 100%;
                            min-height: 450px;
                            transition: transform 0.6s ease;
                            transform-style: preserve-3d;
                        }

                        .flip-card.flipped .flip-card-inner {
                            transform: rotateY(180deg);
                        }

                        .flip-card-front, .flip-card-back {
                            position: absolute;
                            width: 100%;
                            min-height: 450px;
                            -webkit-backface-visibility: hidden;
                            backface-visibility: hidden;
                            border-radius: 12px;
                            top: 0;
                            left: 0;
                        }

                        .flip-card-front {
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.75)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.45)'
                                : 'rgba(15, 23, 42, 0.35)'};
                            backdrop-filter: blur(20px) saturate(180%);
                            -webkit-backdrop-filter: blur(20px) saturate(180%);
                            border: 1px solid ${theme === 'light'
                                ? 'rgba(100, 116, 139, 0.2)'
                                : 'rgba(148, 163, 184, 0.2)'};
                            padding: 1.5rem;
                            transform: rotateY(0deg);
                            overflow: hidden;
                            transition: all 0.3s ease;
                            box-shadow: ${theme === 'light'
                                ? '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
                                : '0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'};
                        }

                        .flip-card:hover .flip-card-front {
                            border-color: var(--primary-color);
                            box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'};
                        }

                        .flip-card-front::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 3px;
                            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                        }

                        .flip-card-back {
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.8)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.5)'
                                : 'rgba(15, 23, 42, 0.4)'};
                            backdrop-filter: blur(25px) saturate(200%);
                            -webkit-backdrop-filter: blur(25px) saturate(200%);
                            border: 2px solid var(--primary-color);
                            transform: rotateY(180deg);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 2rem;
                            box-shadow: ${theme === 'light'
                                ? '0 12px 40px 0 rgba(2, 132, 199, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)'
                                : '0 12px 40px 0 rgba(14, 165, 233, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'};
                        }

                        .flip-card-back img {
                            max-width: 90%;
                            max-height: 280px;
                            object-fit: contain;
                            border-radius: 8px;
                            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
                        }

                        .card::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 3px;
                            background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
                        }

                        .card:hover {
                            transform: translateY(-5px) !important;
                            border-color: var(--primary-color) !important;
                            box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'} !important;
                        }

                        ${theme === 'light' ? `
                        .card {
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        }
                        .flip-card-front {
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                        }
                        ` : ''}

                        .card-icon {
                            font-size: 1.8rem;
                            color: var(--primary-color);
                            margin-bottom: 0.8rem;
                        }

                        .card h3 {
                            font-size: 1.2rem;
                            margin-bottom: 0.8rem;
                            color: var(--text-primary);
                            line-height: 1.3;
                        }

                        .card p {
                            color: var(--text-secondary);
                            line-height: 1.5;
                            font-size: 0.95rem;
                            margin-bottom: 0.5rem;
                        }

                        .card-tags {
                            margin-top: 1rem;
                            display: flex;
                            flex-wrap: wrap;
                            gap: 0.4rem;
                        }

                        .card-tags .tag {
                            font-size: 0.75rem;
                            padding: 4px 8px;
                        }

                        @media (min-width: 769px) {
                            .cards-grid {
                                grid-template-columns: repeat(2, 1fr);
                                gap: 2rem;
                                margin-top: 2rem;
                            }

                            .card {
                                border-radius: 16px;
                                padding: 2rem;
                                min-height: 280px;
                            }

                            .flip-card {
                                min-height: 380px;
                            }

                            .flip-card-inner {
                                min-height: 380px;
                            }

                            .flip-card-front, .flip-card-back {
                                min-height: 380px;
                            }

                            .card:hover {
                                transform: translateY(-5px) !important;
                                border-color: var(--primary-color) !important;
                                box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'} !important;
                            }
                            .card-icon { font-size: 2rem; margin-bottom: 1rem; }
                            .card h3 { font-size: 1.3rem; margin-bottom: 1rem; }
                            .card p { font-size: 1rem; }
                            .card-tags .tag { font-size: 0.9rem; padding: 6px 12px; }
                        }

                        /* Skills Grid */
                        .skills-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                            gap: 1rem;
                            margin-top: 1.5rem;
                        }

                        .skill-item {
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.7)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.35)'
                                : 'rgba(15, 23, 42, 0.25)'};
                            backdrop-filter: blur(16px) saturate(180%);
                            -webkit-backdrop-filter: blur(16px) saturate(180%);
                            border: 1px solid ${theme === 'light'
                                ? 'rgba(100, 116, 139, 0.2)'
                                : 'rgba(148, 163, 184, 0.18)'};
                            border-radius: 12px;
                            padding: 1.2rem;
                            text-align: center;
                            transition: all 0.3s ease;
                            position: relative;
                            box-shadow: ${theme === 'light'
                                ? '0 4px 24px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)'
                                : '0 4px 24px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'};
                        }

                        .skill-item::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 1px;
                            background: linear-gradient(90deg,
                                transparent,
                                ${theme === 'light' ? 'rgba(100, 116, 139, 0.25)' : 'rgba(255, 255, 255, 0.2)'},
                                transparent);
                        }

                        .skill-item:hover {
                            transform: translateY(-5px) !important;
                            border-color: var(--primary-color) !important;
                            box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'} !important;
                        }

                        .skill-item i {
                            font-size: 2rem;
                            color: var(--primary-color);
                            margin-bottom: 0.8rem;
                        }

                        .skill-item h4 {
                            margin-bottom: 0.4rem;
                            color: var(--text-primary);
                            font-size: 1rem;
                        }

                        .skill-item p {
                            color: var(--text-secondary);
                            font-size: 0.85rem;
                            line-height: 1.4;
                        }

                        @media (min-width: 769px) {
                            .skills-grid { gap: 1.5rem; margin-top: 2rem; }
                            .skill-item { border-radius: 12px; padding: 1.5rem; }
                            .skill-item:hover {
                                transform: translateY(-5px) !important;
                                border-color: var(--primary-color) !important;
                                box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'} !important;
                            }
                            .skill-item i { font-size: 2.5rem; margin-bottom: 1rem; }
                            .skill-item h4 { font-size: 1.1rem; }
                            .skill-item p { font-size: 0.9rem; }
                        }

                        /* Contact Section */
                        .contact-content { max-width: 100%; }

                        .contact-info {
                            text-align: center;
                            background: ${theme === 'light'
                                ? 'rgba(255, 255, 255, 0.75)'
                                : theme === 'dark'
                                ? 'rgba(30, 41, 59, 0.4)'
                                : 'rgba(15, 23, 42, 0.3)'};
                            backdrop-filter: blur(20px) saturate(180%);
                            -webkit-backdrop-filter: blur(20px) saturate(180%);
                            border: 1px solid ${theme === 'light'
                                ? 'rgba(100, 116, 139, 0.2)'
                                : 'rgba(148, 163, 184, 0.2)'};
                            border-radius: 16px;
                            padding: 1.5rem;
                            margin-bottom: 2rem;
                            transition: all 0.3s ease;
                            position: relative;
                            box-shadow: ${theme === 'light'
                                ? '0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)'
                                : '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'};
                        }

                        .contact-info::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 1px;
                            background: linear-gradient(90deg,
                                transparent,
                                ${theme === 'light' ? 'rgba(100, 116, 139, 0.3)' : 'rgba(255, 255, 255, 0.3)'},
                                transparent);
                        }

                        .contact-info:hover {
                            transform: translateY(-5px);
                            border-color: var(--primary-color);
                            box-shadow: ${theme === 'light' ? '0 8px 25px rgba(2, 132, 199, 0.15)' : theme === 'dark' ? '0 8px 25px rgba(16, 185, 129, 0.1)' : '0 8px 25px rgba(14, 165, 233, 0.1)'};
                        }

                        .contact-info h3 {
                            font-size: 1.3rem;
                            margin-bottom: 0.8rem;
                            color: var(--text-primary);
                        }

                        .contact-info p {
                            color: var(--text-secondary);
                            margin-bottom: 0.8rem;
                            font-size: 0.95rem;
                            line-height: 1.5;
                        }

                        .contact-links {
                            display: flex;
                            justify-content: center;
                            gap: 0.8rem;
                            margin-top: 1.2rem;
                            flex-direction: column;
                            align-items: center;
                        }

                        .contact-link {
                            display: flex;
                            align-items: center;
                            gap: 0.4rem;
                            color: var(--primary-color);
                            text-decoration: none;
                            padding: 8px 16px;
                            border: 1px solid var(--border-color);
                            border-radius: 8px;
                            transition: all 0.3s ease;
                            font-size: 0.9rem;
                            min-width: 120px;
                            justify-content: center;
                        }

                        .contact-link:hover {
                            border-color: var(--primary-color);
                            transform: translateY(-2px);
                        }

                        .social-links {
                            display: flex;
                            justify-content: center;
                            gap: 0.8rem;
                            margin-top: 0.8rem;
                            flex-direction: column;
                            align-items: center;
                        }

                        .social-link {
                            display: flex;
                            align-items: center;
                            gap: 0.4rem;
                            color: white;
                            text-decoration: none;
                            padding: 10px 16px;
                            border-radius: 8px;
                            transition: all 0.3s ease;
                            font-weight: 500;
                            font-size: 0.9rem;
                            min-width: 140px;
                            justify-content: center;
                        }

                        .social-link.linkedin { background: #0077b5; }
                        .social-link.linkedin:hover { background: #006399; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 119, 181, 0.4); }
                        .social-link.github { background: #333; }
                        .social-link.github:hover { background: #000; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); }
                        .social-link.facebook { background: #1877f2; }
                        .social-link.facebook:hover { background: #166fe5; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(24, 119, 242, 0.4); }
                        .social-link.email { background: #ea4335; }
                        .social-link.email:hover { background: #d93025; transform: translateY(-5px); box-shadow: 0 8px 20px rgba(234, 67, 53, 0.4); }

                        @media (min-width: 769px) {
                            .contact-content { max-width: 600px; margin: 0 auto; }
                            .contact-info { border-radius: 16px; padding: 2rem; margin-bottom: 3rem; }
                            .contact-info h3 { font-size: 1.5rem; margin-bottom: 1rem; }
                            .contact-info p { font-size: 1rem; }
                            .contact-links { flex-direction: row; gap: 1rem; }
                            .contact-link { font-size: 1rem; min-width: auto; }
                            .social-links { flex-direction: row; gap: 1rem; }
                            .social-link { font-size: 1rem; min-width: auto; }
                        }

                        /* Form Styling */
                        .form-group { margin-bottom: 1.2rem; }

                        .form-group label {
                            display: block;
                            margin-bottom: 0.4rem;
                            font-weight: 500;
                            color: var(--text-primary);
                            font-size: 0.9rem;
                        }

                        .form-group input,
                        .form-group textarea {
                            width: 100%;
                            padding: 12px 14px;
                            background: var(--bg-card);
                            border: 1px solid var(--border-color);
                            border-radius: 8px;
                            color: var(--text-primary);
                            font-size: 0.95rem;
                            transition: all 0.3s ease;
                            font-family: inherit;
                        }

                        .form-group input:focus,
                        .form-group textarea:focus {
                            outline: none;
                            border-color: var(--primary-color);
                            box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
                        }

                        @media (min-width: 769px) {
                            .form-group { margin-bottom: 1.5rem; }
                            .form-group label { font-size: 1rem; }
                            .form-group input, .form-group textarea { padding: 12px 16px; font-size: 1rem; }
                        }

                        /* Footer */
                        .footer {
                            background: var(--bg-secondary);
                            border-top: 1px solid var(--border-color);
                            padding: 1.5rem 0;
                            text-align: center;
                            position: relative;
                            z-index: 2;
                        }

                        .footer p { color: var(--text-secondary); margin-bottom: 0.3rem; font-size: 0.9rem; }

                        @media (min-width: 769px) {
                            .footer { padding: 2rem 0; }
                            .footer p { font-size: 1rem; }
                        }

                        /* Animations */
                        @keyframes fadeInUp {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        .fade-in {
                            opacity: 0;
                            transform: translateY(20px);
                            transition: all 0.6s ease;
                        }

                        .fade-in.visible {
                            opacity: 1;
                            transform: translateY(0);
                        }

                        @media (prefers-reduced-motion: reduce) {
                            .floating-char { animation: none; }
                            .cursor { animation: none; }
                            * { animation-duration: 0.01ms !important; }
                        }

                    `}</style>
                </Head>

        {/* Audio Element */}
   <audio ref={audioRef} onEnded={playNext}>
<source src={playlist[currentTrackIndex].src} type="audio/mpeg" />
Your browser does not support the audio element.
</audio>

    {/* Audio Player UI */}
    {!audioError && (
    <div className={`audio-player ${isMinimized ? 'minimized' : ''}`}>
        {!isMinimized && (
        <>
            <div className="player-header">
                <div className="player-title">
                    <i className="fas fa-music" style={{ marginRight: '6px' }}></i>
                    NOW PLAYING
                </div>
                <button
                    className="minimize-btn"
                    onClick={toggleMinimize}
                    title="Minimize Player"
                >
                    <i className="fas fa-minus"></i>
                </button>
            </div>

            <div className="audio-info">
            <div className="audio-title">
    {audioError ? 'Audio Unavailable' : playlist[currentTrackIndex].title}
</div>
            <div className="audio-progress">
                <span>{formatTime(currentTime)}</span>
                <div
                    className="progress-bar"
                    onClick={handleProgressClick}
                    onMouseDown={handleProgressMouseDown}
                >
                    <div
                        className="progress-fill"
                        style={{
                        width: duration ? `${(currentTime / duration) * 100}%` : '0%'
                        }}
                    >
                        <div className="progress-thumb"></div>
                    </div>
                </div>
                <span>{formatTime(duration)}</span>
            </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    className="play-pause-btn"
                    onClick={togglePlayPause}
                    disabled={audioError}
                >
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>

                <div className="audio-controls">
                    <button
                        className={`control-btn ${isShuffle ? 'active' : ''}`}
                        onClick={toggleShuffle}
                        title={isShuffle ? "Shuffle: On" : "Shuffle: Off"}
                    >
                        <i className="fas fa-random"></i>
                    </button>
                    <button
                        className="control-btn"
                        onClick={playPrevious}
                        title="Previous Track"
                    >
                        <i className="fas fa-step-backward"></i>
                    </button>
                    <button
                        className="control-btn"
                        onClick={playNext}
                        title="Next Track"
                    >
                        <i className="fas fa-step-forward"></i>
                    </button>
                    <button
                        className={`control-btn ${isLooping ? 'active' : ''}`}
                        onClick={toggleLoop}
                        title={isLooping ? "Loop: On" : "Loop: Off"}
                    >
                        <i className="fas fa-redo"></i>
                    </button>
                    <button
                        className="control-btn"
                        onClick={toggleMute}
                        title="Mute/Unmute"
                    >
                        <i className={getVolumeIcon()}></i>
                    </button>
                </div>
            </div>

            <div className="volume-control">
                <i className="fas fa-volume-up" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}></i>
                <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </>
        )}

        {isMinimized && (
            <button
                className="play-pause-btn"
                onClick={toggleMinimize}
                title="Expand Player"
            >
                <i className="fas fa-music"></i>
            </button>
        )}
    </div>
    )}

                {/* Custom Cursor */}
                <div className={`custom-cursor ${isClicking ? 'clicking' : ''}`} ref={cursorRef}></div>

                {/* Floating Characters Background */}
                <div className="floating-chars">
                    {floatingChars.map((char) => (
                        <div
                            key={char.id}
                            className={`floating-char ${char.size}`}
                            style={{
                                left: `${char.left}%`,
                                color: char.color,
                                animationDuration: `${char.duration}s`,
                                animationDelay: `${char.delay}s`
                            }}
                        >
                            {char.char}
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <nav className="navbar">
                    <div className="nav-container">
                        <div className="logo">
                            {logoTypedText && <span className="logo-base">{logoTypedText}</span>}
                            {showBaseName && <span className="logo-text">Laurence De Guzman</span>}
                        </div>
                        <ul className={`nav-menu ${isNavMenuActive ? 'active' : ''}`}>
                            <li><a href="#home" onClick={closeMenu} aria-label="Navigate to Home section">Home</a></li>
                            <li><a href="#about" onClick={closeMenu} aria-label="Navigate to About section">About</a></li>
                            <li><a href="#experience" onClick={closeMenu} aria-label="Navigate to Experience section">Experience</a></li>
                            <li><a href="#skills" onClick={closeMenu} aria-label="Navigate to Skills section">Skills</a></li>
                            <li
                                className="nav-dropdown"
                            >
                                <button
                                    onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                                    aria-label="Toggle Projects dropdown menu"
                                    aria-haspopup="true"
                                    aria-expanded={isProjectsDropdownOpen}
                                >
                                    Projects <i className="fas fa-chevron-down"></i>
                                </button>
                                <ul className={`dropdown-menu ${isProjectsDropdownOpen ? 'show' : ''}`} role="menu">
                                    <li role="menuitem"><a href="#projects" onClick={() => { closeMenu(); setIsProjectsDropdownOpen(false); }} aria-label="View School Projects">School Projects</a></li>
                                    <li role="menuitem"><a href="/projects/self-made" onClick={() => { closeMenu(); setIsProjectsDropdownOpen(false); }} aria-label="View Self-Made Projects">Self-Made Projects</a></li>
                                    <li role="menuitem"><a href="/projects/company-tests" onClick={() => { closeMenu(); setIsProjectsDropdownOpen(false); }} aria-label="View Program Test for Companies">Program Test for Companies</a></li>
                                </ul>
                            </li>
                            <li><a href="#contact" onClick={closeMenu} aria-label="Navigate to Contact section">Contact</a></li>
                        </ul>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'original' ? 'Dark' : theme === 'dark' ? 'Light' : 'Base'} mode`}>
                                <i className={`fas ${theme === 'original' ? 'fa-moon' : theme === 'dark' ? 'fa-sun' : 'fa-circle'} ${isThemeTransitioning ? 'theme-icon-rotating' : ''}`}></i>
                                <span>{theme === 'original' ? 'Dark' : theme === 'dark' ? 'Light' : 'Base'}</span>
                            </button>
                            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label={isNavMenuActive ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isNavMenuActive}>
                                <i className={`fas ${isNavMenuActive ? 'fa-times' : 'fa-bars'}`}></i>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Theme Transition Overlay */}
                {isThemeTransitioning && <div className="theme-transition-overlay"></div>}

                {/* Hero Section */}
                <section id="home" className="hero">
                    {/* 3D Background */}
                    <Hero3DBackground theme={theme} />

                    <div className="hero-content">
                        <p className="hero-subtitle">Hi, I'm</p>
                        <h1 className="hero-title">
                            Laurence De <span className="glitch-text" onMouseEnter={handleGlitch}>{glitchText}</span>
                        </h1>
                        <div className="typing-container">
                            <span className="serif-i">I</span> <span className="typing-text">{currentText}</span><span className="cursor">|</span>
                        </div>
                        <p className="hero-description">
                            Computer Technician • IT Generalist • Aspiring Cybersecurity & ERP Specialist
                        </p>
                        <div className="hero-buttons">
                            <a href="#contact" className="btn btn-primary" aria-label="Navigate to contact section to connect">
                                <i className="fas fa-comment-dots"></i>
                                Let's Connect
                            </a>
                            <a href="mailto:laurencedeguzman04142003@gmail.com" className="btn btn-outline" target="_blank" rel="noopener noreferrer" aria-label="Send email to Laurence De Guzman">
                                <i className="fas fa-envelope"></i>
                                Email Me
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="section">
                    <div className="container">
                        <h2 className="section-title">About Me</h2>
                        <div className="about-content fade-in">
                           <div className={`profile-image ${isFlipping ? 'flipping' : ''}`} onClick={handleImageChange} style={{ cursor: 'pointer' }}>
    <img
        src={`/${profileImages[currentImageIndex]}`}
        alt="Laurence De Guzman"
        onError={handleImageError}
    />
    <i className="fas fa-user fallback-icon"></i>
</div>
                            <div className="about-text">
                                <p><br>
                                </br>
                                    I'm a 22-year-old Tech Enthusiast and TUP Manila Fresh Graduate with a BTVTED Major in Computer Programming. 
                                    My passion for technology started in high school, from customizing Nokia phones with GBA games
                                    to exploring programming and problem-solving on my own. Over the years, that curiosity grew into real-world 
                                    skills in coding, troubleshooting, and building projects across software and hardware.
                                </p>
                                <p>
                                  Today, I work as a Junior Technical Support at a local company in the Philippines, where I handle 
                                 end-to-end IT operations from hardware diagnostics, computer builds, to Odoo 
                                    ERP customization, email/domain hosting management, and cloud backup systems. I recently built a 24/7 
                                Facebook AI chatbot using N8N for automated customer service and proposed cybersecurity solutions 
                                    including antivirus and firewall implementations. My background spans creating Python games converted 
                                to APKs, Arduino projects, database design, to full-stack web development. With every challenge, I see 
                                    an opportunity to grow, because nothing can stop me from moving forward in technology.  
                                </p>
                            </div>
                        </div>
                        
                        <div className="current-learning fade-in">
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                                <i className="fas fa-rocket" style={{ color: 'var(--primary-color)', marginRight: '8px' }}></i>
                                Currently Learning & Growing
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                "Nothing can stop me from learning" - Currently expanding my skills
                            </p>
                            <div className="learning-tags">
                            <span className="tag">Next.js & TypeScript</span>
                            <span className="tag">Docker & Kubernetes</span>
                            <span className="tag">GraphQL & Prisma</span>
                            <span className="tag">AWS & Cloud Services</span>
                            <span className="tag">Advanced Cybersecurity</span>
                            <span className="tag">Microservices Architecture</span>
                            <span className="tag">Redis & Caching</span>
                            <span className="tag">CI/CD Pipelines</span>
                            <span className="tag">Vue.js & Nuxt.js</span>
                            <span className="tag">FastAPI & Django</span>
                            <span className="tag">Supabase & Firebase</span>
                            <span className="tag">Penetration Testing</span>
                            <span className="tag">N8N Advanced Workflows</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="section">
                    <div className="container">
                        <h2 className="section-title">Leadership & Experience</h2>
                        <div className="cards-grid">
                            <div className="card fade-in">
                                <div className="card-icon">
                                    <i className="fas fa-briefcase"></i>
                                </div>
                                <div className="card-content">
                                    <h3>IT Support Specialist</h3>
                                    <p><strong>Local Supply & Equipment Company | August 2025 - Present</strong></p>
                                    <p>Sole IT personnel managing end-to-end technology operations for a company specializing in school supplies,
                                    office equipment, and furniture. Responsibilities include hardware support (building/repairing computers,
                                    antivirus installation, password recovery), Odoo ERP customization and configuration, email hosting management,
                                    automated cloud backup systems, website theme development, and marketing support. Built a 24/7 Facebook AI
                                    chatbot agent using Ollama model with Cloudflare hosting in one week for automated customer service.</p>
                                </div>
                            </div>
                            <div className="card fade-in">
                                <div className="card-icon">
                                    <i className="fas fa-users-cog"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Chief Operations Officer</h3>
                                    <p><strong>Google Developer Student Clubs - TUP Manila | 2024-2025</strong></p>
                                    <p>Directed organizational strategies and execution across events. Coordinated multiple teams for event readiness,
                                    participant engagement, and served as emcee for UI/UX workshops and AI events.</p>
                                </div>
                            </div>
                            <div className="card fade-in">
                                <div className="card-icon">
                                    <i className="fas fa-laptop-code"></i>
                                </div>
                                <div className="card-content">
                                    <h3>IT Consultant (OJT)</h3>
                                    <p><strong>Elyon Solutions | 2024</strong></p>
                                    <p>Participated in live client demos and business meetings. Gained hands-on experience with Odoo ERP system,
                                    XML data handling, PostgreSQL databases, and advised clients on implementation strategies.</p>
                                </div>
                            </div>
                            <div className="card fade-in">
                                <div className="card-icon">
                                    <i className="fas fa-tools"></i>
                                </div>
                                <div className="card-content">
                                    <h3>Technical Support & Software Developer</h3>
                                    <p><strong>Freelance | 2022-Present</strong></p>
                                    <p>Self-started multi-service tech business serving clients through social media. Services include hardware diagnostics
                                    and repairs for phones/laptops/desktops, custom software development, and academic thesis assistance for students.
                                    Providing comprehensive tech solutions with competitive pricing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="section">
                    <div className="container">
                        <h2 className="section-title">Technical Skills</h2>
                        <div className="skills-grid">
                            <div className="skill-item fade-in">
                                <i className="fab fa-react"></i>
                                <h4>Modern Full-Stack Development</h4>
                                <p>React.js, Next.js, Vue.js, Angular, Node.js, Express.js, Nest.js, TypeScript, Tailwind CSS</p>
                            </div>
                            <div className="skill-item fade-in">
                                <i className="fas fa-server"></i>
                                <h4>Backend Technologies</h4>
                                <p>Node.js, Express.js, Python Django, Flask, FastAPI, PHP Laravel, Java Spring Boot, REST APIs, GraphQL</p>
                            </div>
                            <div className="skill-item fade-in">
                                <i className="fas fa-database"></i>
                                <h4>Database Technologies</h4>
                                <p>MySQL, PostgreSQL, MongoDB, Redis, Firebase, Supabase, Prisma ORM, Database Design & Optimization</p>
                            </div>
                            <div className="skill-item fade-in">
                                <i className="fas fa-code"></i>
                                <h4>Programming Languages</h4>
                                <p>JavaScript, TypeScript, Python, Java, C#, C++, PHP, Go, Rust, XML, JSON</p>
                            </div>
                            <div className="skill-item fade-in">
                                <i className="fab fa-docker"></i>
                                <h4>DevOps & Containerization</h4>
                                <p>Docker, Docker Compose, Kubernetes, CI/CD Pipelines, Git, GitHub Actions, AWS, Vercel, Netlify</p>
                            </div>
                            <div className="skill-item fade-in">
                                 <i className="fas fa-cogs"></i>
                                 <h4>Enterprise Systems & Automation</h4>
                                 <p>Odoo ERP, N8N Workflow Automation, AI Chatbots, Email/Domain Hosting, System Integration, Google Cloud Backup</p>
                            </div>
                            <div className="skill-item fade-in">
                                   <i className="fas fa-shield-alt"></i>
                                  <h4>Cybersecurity & Infrastructure</h4>
                                 <p>Network Security, Enterprise Antivirus, Firewall Configuration, Security Auditing, Threat Prevention</p>
                            </div>
                            <div className="skill-item fade-in">
                                    <i className="fas fa-microchip"></i>
                                    <h4>Hardware & Technical Support</h4>
                                  <p>Computer Building/Upgrades, Hardware Diagnostics, Arduino, Raspberry Pi, IoT Development, Circuit Design</p>
                                </div>
                            </div>
                        </div>
                    
                </section>

                {/* Projects Section */}
                <section id="projects" className="section">
                    <div className="container">
                        <h2 className="section-title">School Projects</h2>
                        <p style={{textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem'}}>
                            Academic projects from TUP Manila - BTVTED Major in Computer Programming
                        </p>
                        <div className="cards-grid">
                            {/* AI Chatbot Card */}
                            <div className={`flip-card ${flippedCards['chatbot'] ? 'flipped' : ''}`} onClick={() => toggleFlip('chatbot')}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="card-icon">
                                            <i className="fas fa-robot"></i>
                                        </div>
                                        <div className="card-content">
                                            <h3>AI Chatbot for BTVTED Students</h3>
                                            <p>AI-powered chatbot built with Next.js to support programming students with continuous learning,
                                            addressing gaps in traditional teaching methods.</p>
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

                            {/* Flappy Bird Card */}
                            <div className={`flip-card ${flippedCards['flappy'] ? 'flipped' : ''}`} onClick={() => toggleFlip('flappy')}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="card-icon">
                                            <i className="fas fa-gamepad"></i>
                                        </div>
                                        <div className="card-content">
                                            <h3>Enhanced Flappy Bird Mobile Game</h3>
                                            <p>Created a challenging Flappy Bird-inspired mobile game with moving tubes that collide with each other
                                            and enemy birds flying toward the player. Built with Python using Kivy framework and converted to APK
                                            using Buildozer for Android deployment.</p>
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

                            {/* Arduino Card */}
                            <div className={`flip-card ${flippedCards['arduino'] ? 'flipped' : ''}`} onClick={() => toggleFlip('arduino')}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="card-icon">
                                            <i className="fas fa-car"></i>
                                        </div>
                                        <div className="card-content">
                                            <h3>Arduino Smart Car</h3>
                                            <p>Built an Arduino-based car equipped with sensors and running lights. Combined programming
                                            with electronics, expanding skills into IoT and embedded systems.</p>
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

                            {/* Database Card */}
                            <div className={`flip-card ${flippedCards['database'] ? 'flipped' : ''}`} onClick={() => toggleFlip('database')}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="card-icon">
                                            <i className="fas fa-graduation-cap"></i>
                                        </div>
                                        <div className="card-content">
                                            <h3>Automated Department Database System</h3>
                                            <p>Built an automated online examination system with pre-loaded questions and answers. Features automatic
                                            pass/fail checking and real-time score recording, eliminating manual grading processes for the department.</p>
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
                </section>

                {/* Contact Section */}
                <section id="contact" className="section">
                    <div className="container">
                        <h2 className="section-title">Get In Touch</h2>
                        <div className="contact-content">
                            <div className="contact-info fade-in">
                                <h3>Let's Connect!</h3>
                                <p>Half of what you need to know about me is here; the other half, maybe personalities or stories that you never heard of.</p>
                                <p>I'm always open to discussing new opportunities, projects, just pm me on any platform!</p>
                                
                                <div className="contact-links">
                                    <a href="mailto:laurencedeguzman04142003@gmail.com" className="contact-link" target="_blank">
                                        <i className="fas fa-envelope"></i>
                                        laurencedeguzman04142003@gmail.com
                                    </a>
                                </div>

                                <div className="social-links">
                                    <a href="https://www.linkedin.com/in/laurence-de-guzman-32386b309/" className="social-link linkedin" target="_blank" rel="noopener noreferrer" aria-label="Visit Laurence's LinkedIn profile">
                                        <i className="fab fa-linkedin-in"></i>
                                        LinkedIn
                                    </a>
                                    <a href="https://github.com/imove0n" className="social-link github" target="_blank" rel="noopener noreferrer" aria-label="Visit Laurence's GitHub profile">
                                        <i className="fab fa-github"></i>
                                        GitHub
                                    </a>
                                    <a href="https://www.facebook.com/imove0n" className="social-link facebook" target="_blank" rel="noopener noreferrer" aria-label="Visit Laurence's Facebook profile">
                                        <i className="fab fa-facebook-f"></i>
                                        Facebook
                                    </a>
                                    <a href="mailto:laurencedeguzman04142003@gmail.com" className="social-link email" target="_blank" rel="noopener noreferrer" aria-label="Send email to Laurence De Guzman">
                                        <i className="fas fa-envelope"></i>
                                        Gmail
                                    </a>
                                </div>
                            </div>

                           <form ref={formRef} className="fade-in" onSubmit={handleSubmit}>
                                {submitMessage && (
                                    <div className={`submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`}>
                                        {submitMessage}
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="from_name">Name</label>
                                    <input type="text" id="from_name" name="from_name" required disabled={isSubmitting} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="from_email">Email</label>
                                    <input type="email" id="from_email" name="from_email" required disabled={isSubmitting} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows="5" required disabled={isSubmitting}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                                    <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="container">
                        <p>&copy; 2024 Laurence De Guzman. All rights reserved.</p>
                        <p>IT Consultant | Hardware Specialist | Tech Leader</p>
                    </div>
                </footer>
            </>
        );
    }