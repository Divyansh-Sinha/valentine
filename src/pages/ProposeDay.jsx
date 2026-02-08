import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import bgMusic from "../assets/Tu Jaane Na.mp3"; // Reusing romantic song

export default function ProposeDay() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [step, setStep] = useState(0); // 0: Walk in, 1: Kneel, 2: Propose, 3: Accepted

    useEffect(() => {
        const playMusic = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Auto-play blocked");
                }
            }
        };
        playMusic();
    }, []);

    const handleNextStep = () => {
        if (step < 4) setStep(step + 1);

        if (step === 1 || step === 3) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: 0.5, y: 0.7 },
                colors: step === 3 ? ["#ff69b4", "#ff1493", "#ffffff"] : ["#ff0000", "#ffffff"],
            });
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="propose-page" style={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <audio ref={audioRef} src={bgMusic} loop />

            {/* Ambient Flying Clouds */}
            <motion.div
                initial={{ x: "-10%" }}
                animate={{ x: "110%" }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: "10%", left: 0, fontSize: "4rem", opacity: 0.8, zIndex: 1 }}
            >
                ☁️
            </motion.div>
            <motion.div
                initial={{ x: "-10%" }}
                animate={{ x: "110%" }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
                style={{ position: "absolute", top: "25%", left: 0, fontSize: "3rem", opacity: 0.6, zIndex: 0 }}
            >
                ☁️
            </motion.div>

            <button
                onClick={toggleMusic}
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

            {/* Girl Character */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{
                    x: step === 4 ? -50 : (step === 3 ? -200 : 0), // Hug: -50, Accepted: -200
                    opacity: 1,
                    y: step === 2 ? [0, -30, 0] : (step === 1 || step === 3 ? [0, -20, 0] : 0), // Jump for joy on Yes/Happy
                    rotate: step === 4 ? 10 : 0 // Lean in for hug
                }}
                transition={{
                    duration: 1,
                    y: { duration: 0.5, repeat: step === 2 ? Infinity : (step === 1 || step === 3 || step === 4 ? 1 : 0) } // Jump repeatedly on Yes
                }}
                style={{
                    fontSize: "8rem",
                    position: "absolute",
                    right: "20%",
                    bottom: "20%",
                    zIndex: 10
                }}
            >
                {step === 4 ? "🫂" : "👩"}
                {(step >= 1 && step < 4 && step !== 2) && ( // Show heart on 1 (Prop), 3 (Happy). Maybe hide on Yes (2) during jump? Or keep?
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -40 }}
                        transition={{ delay: 0.2 }}
                        style={{ position: "absolute", top: 0, right: 0, fontSize: "3rem" }}
                    >
                        ❤️
                    </motion.div>
                )}
                {step === 2 && ( // Show multiple hearts on YES
                    <motion.div
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{ opacity: 1, scale: 1.5, y: -60 }}
                        transition={{ delay: 0.2, repeat: Infinity }}
                        style={{ position: "absolute", top: -20, right: 0, fontSize: "4rem" }}
                    >
                        💖
                    </motion.div>
                )}
            </motion.div>

            {/* Boy Character */}
            <motion.div
                initial={{ x: -1000, opacity: 0 }}
                animate={{
                    x: step === 4 ? 50 : (step === 3 ? 200 : (step === 0 ? [-300, 0] : 0)), // Hug: 50, Happy: 200
                    y: step === 3 ? 0 : (step === 0 ? [0, -10, 0] : (step === 1 || step === 2 ? 50 : 0)), // Kneel (1, 2)
                    opacity: 1,
                    rotate: step === 4 ? -10 : (step === 3 ? 0 : (step >= 1 ? 10 : 0)) // Lean in for hug (4)
                }}
                transition={{
                    x: { duration: 2.5, ease: "easeOut" },
                    y: {
                        duration: step === 0 ? 0.3 : 0.5,
                        repeat: step === 0 ? Infinity : 0,
                        repeatType: "reverse"
                    },
                    rotate: { duration: 0.5 }
                }}
                style={{
                    fontSize: "8rem",
                    position: "absolute",
                    left: "20%", // Target position
                    bottom: step >= 1 ? "15%" : "20%", // Adjust bottom for kneeling
                    zIndex: 10
                }}
            >
                {step === 4 ? "" : "👨"}
            </motion.div>

            {/* The Ring */}
            <AnimatePresence>
                {step === 1 && ( // Only show ring during proposal, hide when accepted/hugging? Or keep it? User didn't say. Keeping logic simple, usually ring is taken. let's hide it or keep it. I'll keep it for now but maybe move it with him? 
                    // actually if he stands up, the ring position which is absolute might look weird. 
                    // Let's hide the ring on step 2 (Acceptance) as if she took it.
                    <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1.2, opacity: 1, rotate: 0, y: -20 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.5 }}
                        style={{
                            fontSize: "4rem",
                            position: "absolute",
                            left: "28%", // Near the boy's hand
                            bottom: "25%",
                            zIndex: 11
                        }}
                    >
                        💍
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dialogue / Text */}
            <div style={{
                position: "absolute",
                top: "20%",
                width: "100%",
                textAlign: "center",
                zIndex: 20
            }}>
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.h1
                            key="step0"
                            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            className="propose-text"
                            style={{ fontFamily: "'Dancing Script', cursive", color: "#d63384", fontSize: "3rem" }}
                        >
                            Someone has a question...
                        </motion.h1>
                    )}
                    {step === 1 && (
                        <motion.h1
                            key="step1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            style={{ fontFamily: "'Dancing Script', cursive", color: "#d63384", fontSize: "3rem" }}
                        >
                            Will you be my girlfriend?
                        </motion.h1>
                    )}
                    {step === 2 && (
                        <motion.h1
                            key="step2"
                            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ opacity: 1, scale: 1.5, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            style={{ fontFamily: "'Dancing Script', cursive", color: "#ff1493", fontSize: "5rem", fontWeight: "bold" }}
                        >
                            YES!!! 💍💖
                        </motion.h1>
                    )}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1.2 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            style={{ fontFamily: "'Dancing Script', cursive", color: "#e91e63", fontSize: "4rem", fontWeight: "bold" }}
                        >
                            Happy Propose Day 💖
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0, y: 50 }}
                            animate={{ opacity: 1, scale: 1.3, y: 0 }}
                            style={{ fontFamily: "'Dancing Script', cursive", color: "#d63384", fontSize: "4rem", fontWeight: "bold" }}
                        >
                            I Will Love You Forever! 💑
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Control Button */}
            <div style={{ position: "absolute", bottom: "10%", zIndex: 100 }}>
                {step < 4 && (
                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(233, 30, 99, 0.6)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextStep}
                        style={{
                            padding: "15px 40px",
                            fontSize: "1.5rem",
                            backgroundColor: "#e91e63",
                            color: "white",
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(233, 30, 99, 0.4)",
                            transition: "background-color 0.3s ease"
                        }}
                    >
                        {step === 0 ? "Walk Closer" : (step === 1 ? "Say Yes! 💖" : (step === 2 ? "Celebrate 🎉" : "Hug Her"))}
                    </motion.button>
                )}
            </div>

        </div>
    );
}
