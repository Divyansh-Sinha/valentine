import { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ChocolateDay() {
    const [chocolates, setChocolates] = useState([]);

    const handleChocolateClick = (e) => {
        // Create chocolate rain
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ["#5D4037", "#795548", "#8D6E63", "#D7CCC8"], // Chocolate colors
            shapes: ["circle", "square"],
            scalar: 1.2,
        });

        // Add a floating chocolate text
        const id = Date.now();
        const texts = ["🍫", "🍬", "🍭", "Sweet!", "Yum!", "Love you!"];
        const text = texts[Math.floor(Math.random() * texts.length)];

        setChocolates(prev => [...prev, { id, x: e.clientX, y: e.clientY, text }]);

        setTimeout(() => {
            setChocolates(prev => prev.filter(c => c.id !== id));
        }, 2000);
    };

    return (
        <div
            className="chocolate-page"
            onClick={handleChocolateClick}
            style={{
                height: "100vh",
                width: "100vw",
                background: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)", // Dark chocolate gradient
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#D7CCC8"
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: "center", zIndex: 10 }}
            >
                <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "4rem", marginBottom: "20px", color: "#FFECB3" }}>
                    Happy Chocolate Day! 🍫
                </h1>
                <p style={{ fontSize: "1.5rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                    Life is like a chocolate box,<br />
                    and each moment with you is the sweetest treat.<br />
                    <span style={{ color: "#FFD54F", fontWeight: "bold" }}>Sending you all my sweetness!</span>
                </p>
            </motion.div>

            {/* Central Chocolate Box Animation */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                style={{
                    marginTop: "50px",
                    fontSize: "8rem",
                    cursor: "pointer",
                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))"
                }}
            >
                🎁
            </motion.div>
            <p style={{ marginTop: "10px", fontSize: "1.2rem", opacity: 0.8 }}>(Tap the box!)</p>

            {/* Floating Chocolates */}
            {chocolates.map(choco => (
                <motion.div
                    key={choco.id}
                    initial={{ opacity: 1, y: choco.y, x: choco.x }}
                    animate={{ y: choco.y - 150, opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        position: "fixed",
                        fontSize: "2rem",
                        pointerEvents: "none",
                        left: 0,
                        top: 0
                    }}
                >
                    {choco.text}
                </motion.div>
            ))}
        </div>
    );
}
