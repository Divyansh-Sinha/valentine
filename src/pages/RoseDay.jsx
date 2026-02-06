import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Tilt from "react-parallax-tilt";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import bgMusic from "../assets/Khwab - Iqlipse Nova _ Hindi.mp3";

export default function RoseDay() {
    const containerRef = useRef(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [init, setInit] = useState(false);
    const [startInfinite, setStartInfinite] = useState(false);

    useEffect(() => {
        if (startInfinite) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            let skew = 1;

            const interval = setInterval(() => {
                // Generate very small particles randomly across the screen
                confetti({
                    particleCount: 3,
                    startVelocity: 0,
                    ticks: 200, // Stay longer
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.2 // Start strictly from top area to "rain" down
                    },
                    colors: ["#ff0000", "#ff69b4", "#ffd700", "#ffffff"],
                    shapes: ["circle"],
                    gravity: 0.8,
                    scalar: 0.7,
                    drift: 0,
                });

                confetti({
                    particleCount: 2,
                    startVelocity: 0,
                    ticks: 200,
                    origin: {
                        x: Math.random(),
                        y: Math.random() * 0.2
                    },
                    colors: ["#d63384", "#fd7e14"],
                    shapes: ["circle"],
                    gravity: 0.7,
                    scalar: 0.6,
                    drift: 0,
                });
                // Random flower emoji explosion (approx every 20 ticks = 800ms)
                if (Math.random() < 0.05) {
                    confetti({
                        particleCount: 15,
                        spread: 360,
                        startVelocity: 20,
                        ticks: 200,
                        origin: {
                            x: Math.random(),
                            y: Math.random() * 0.7 // Random height
                        },
                        shapes: ["emoji"],
                        shapeOptions: {
                            emoji: {
                                value: ["🌹", "🌷", "🌸", "🌺", "🌻", "💐"],
                            },
                        },
                        scalar: 2, // Bigger emojis
                        gravity: 0.5,
                        drift: 0,
                    });
                }
            }, 40); // Faster interval for heavier rain

            return () => clearInterval(interval);
        }
    }, [startInfinite]);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesOptions = useMemo(() => ({
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 30, // Subtle background
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle", // Could be 'image' with heart asset if desired
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }), []);

    const flowerTypes = ["🌹", "🌷", "🌸", "🌺", "🌻", "💐"];

    useEffect(() => {
        // Attempt auto-play on mount, though browsers often block it
        const playMusic = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Auto-play blocked, waiting for interaction");
                }
            }
        };
        playMusic();
    }, []);

    const toggleMusic = (e) => {
        e.stopPropagation(); // Prevent flower shower when clicking button
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleScreenClick = (e) => {
        if (!startInfinite) setStartInfinite(true);

        // If not playing and user interacts, try to play
        if (!isPlaying && audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }

        // Create a shower of flowers from the click position
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        confetti({
            particleCount: 40,
            spread: 70,
            origin: { x, y },
            colors: ["#d63384", "#fd7e14", "#ffc107", "#20c997", "#e91e63"],
            shapes: ["circle"], // fallback
            scalar: 1.2,
            gravity: 1.2,
            drift: 0,
            ticks: 200,
        });

        // Creating a petal shower effect using specific colors

        confetti({
            particleCount: 30,
            scalar: 2,
            startVelocity: 30,
            spread: 60,
            origin: { x, y },
            shapes: ['circle'],
            colors: ['#ff0000', '#ff69b4', '#ff1493', '#db7093'], // Rose colors
        });

        // AND create a DOM element for a big flower at the click spot?
        createFloatingFlower(e.clientX, e.clientY);
    };

    const [floatingFlowers, setFloatingFlowers] = useState([]);

    const createFloatingFlower = (x, y) => {
        const id = Date.now();
        const flower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        const newFlower = { id, x, y, symbol: flower };

        setFloatingFlowers((prev) => [...prev, newFlower]);

        // Remove after animation
        setTimeout(() => {
            setFloatingFlowers((prev) => prev.filter((f) => f.id !== id));
        }, 2000);
    };

    return (
        <div
            className="rose-page"
            onClick={handleScreenClick}
            ref={containerRef}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={(container) => console.log(container)}
                    options={particlesOptions}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0 // Behind everything
                    }}
                />
            )}

            <audio
                ref={audioRef}
                src={bgMusic}
                loop
            />

            <button
                onClick={toggleMusic}
                className="music-toggle"
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 200,
                    background: 'rgba(255,255,255,0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
            >
                {isPlaying ? '🔇' : '🎵'}
            </button>

            <Tilt
                glareEnable={true}
                glareMaxOpacity={0.45}
                scale={1.02}
                perspective={1000}
                style={{ zIndex: 10 }} // Above particles
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="glass-card"
                    // Removed default glass-card box-shadow if Tilt handles it, or keep it.
                    // Tilt will wrap this.
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <h1 className="rose-title" style={{ transform: "translateZ(60px)" }}>Happy Rose Day! 🌹</h1>
                    <div style={{ transform: "translateZ(40px)" }}>
                        <p className="rose-text">
                            A single rose can be my garden...<br />
                            a single friend, my world.<br />
                            <span className="highlight">And you are both to me.</span>
                        </p>
                    </div>
                    <p className="hint-text" style={{ transform: "translateZ(20px)" }}>(Click anywhere to shower love)</p>
                </motion.div>
            </Tilt>

            {/* Render Floating Flowers */}
            {floatingFlowers.map((flower) => (
                <motion.div
                    key={flower.id}
                    initial={{ opacity: 1, y: flower.y, x: flower.x, scale: 0 }}
                    animate={{ y: flower.y + 100, x: flower.x + (Math.random() * 50 - 25), opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        fontSize: "3rem",
                        pointerEvents: "none",
                        left: 0,
                        top: 0,
                        zIndex: 50
                    }}
                >
                    {flower.symbol}
                </motion.div>
            ))}
        </div>
    );
}
