import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function TeddyDay() {
    const [hugCount, setHugCount] = useState(0);

    const handleTeddyClick = (e) => {
        setHugCount(prev => prev + 1);

        // Heart explosion on click
        confetti({
            particleCount: 30,
            spread: 50,
            origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
            colors: ["#ff0000", "#ff69b4", "#ffffff"],
            shapes: ["circle", "heart"], // if 'heart' shape supported or use SVG
            scalar: 1,
        });
    };

    return (
        <div
            className="teddy-page"
            style={{
                height: "100vh",
                width: "100vw",
                background: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", // Soft pink gradient
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "4rem",
                    color: "#D81159",
                    marginBottom: "10px",
                    textAlign: "center"
                }}
            >
                Happy Teddy Day! 🧸
            </motion.h1>

            <p style={{ fontSize: "1.5rem", color: "#8E24AA", textAlign: "center", marginBottom: "30px" }}>
                A cute teddy for my cutest person! <br />
                Sending you a big warm hug!
            </p>

            {/* Interactive Teddy */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.8 }}
                onClick={handleTeddyClick}
                style={{
                    fontSize: "10rem",
                    cursor: "pointer",
                    filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.2))",
                    position: "relative"
                }}
            >
                🧸
                {/* Hearts appearing on hug */}
                <AnimatePresence>
                    {hugCount > 0 && (
                        <motion.div
                            key={hugCount}
                            initial={{ opacity: 1, y: 0, scale: 0.5 }}
                            animate={{ opacity: 0, y: -100, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: "4rem",
                                pointerEvents: "none"
                            }}
                        >
                            ❤️
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div style={{ marginTop: "20px", fontSize: "1.2rem", color: "#D81159" }}>
                Hugs sent: {hugCount}
            </div>
            {hugCount > 5 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginTop: "10px", fontSize: "1rem", color: "#8E24AA" }}
                >
                    Detailed cuddles incoming! 🤗
                </motion.div>
            )}
        </div>
    );
}
