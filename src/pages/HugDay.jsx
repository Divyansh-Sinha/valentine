import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function HugDay() {
    const [hugging, setHugging] = useState(false);

    const handleHug = () => {
        setHugging(true);

        // Fire confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF69B4', '#FFB7B2', '#FFDAC1', '#E2F0CB'],
            shapes: ['circle', 'heart'],
            ticks: 200
        });

        setTimeout(() => setHugging(false), 2000); // Reset after animation
    };

    return (
        <div
            className="hug-page"
            style={{
                height: "100vh",
                width: "100vw",
                background: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)", // Warm peach/coral
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "4rem",
                    color: "#D84315",
                    marginBottom: "20px",
                    textAlign: "center"
                }}
            >
                Happy Hug Day! 🤗
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                    fontSize: "1.5rem",
                    color: "#BF360C",
                    textAlign: "center",
                    maxWidth: "600px",
                    marginBottom: "40px"
                }}
            >
                Distance means nothing when someone means everything.<br />
                Sending you the biggest, warmest virtual hug!
            </motion.p>

            <div style={{ position: "relative", width: "300px", height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Main Hug Interaction */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleHug}
                    style={{
                        fontSize: "8rem",
                        cursor: "pointer",
                        zIndex: 10,
                        position: "relative"
                    }}
                >
                    {hugging ? "🫂" : "🤗"}
                </motion.div>

                {/* Animated Arms / Aura Effect */}
                <AnimatePresence>
                    {hugging && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: [0, 0.5, 0], scale: 1.5 }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    border: "4px solid #FF8A65",
                                    top: 0,
                                    left: 0
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{ opacity: [0, 0.3, 0], scale: 2 }}
                                transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    border: "4px solid #FFAB91",
                                    top: 0,
                                    left: 0
                                }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </div>

            <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ marginTop: "20px", color: "#D84315", fontSize: "1.2rem" }}
            >
                {hugging ? "Receiving Hug..." : "Click to Hug!"}
            </motion.p>

        </div>
    );
}
