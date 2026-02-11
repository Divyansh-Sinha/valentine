import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromiseDay() {
    const promises = [
        "I promise to always make you smile 😊",
        "I promise to be your strength 💪",
        "I promise to listen to you 👂",
        "I promise to love you forever ♾️",
    ];

    const [sealedPromises, setSealedPromises] = useState([]);

    const togglePromise = (index) => {
        if (sealedPromises.includes(index)) {
            setSealedPromises(prev => prev.filter(i => i !== index));
        } else {
            setSealedPromises(prev => [...prev, index]);
        }
    };

    return (
        <div
            className="promise-page"
            style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "#e0f7fa",  // Light blue for trust/calm
                backgroundImage: "radial-gradient(#b2ebf2 2px, transparent 2px)",
                backgroundSize: "30px 30px",
                position: "relative",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px"
            }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "3.5rem",
                    color: "#006064",
                    textAlign: "center"
                }}
            >
                Happy Promise Day! 🤞
            </motion.h1>
            <p style={{ textAlign: "center", color: "#00838f", marginBottom: "30px", fontSize: "1.2rem" }}>
                Promises are the glue of love.<br />
                Click on a promise to seal it with your heart!
            </p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                width: "100%",
                maxWidth: "800px"
            }}>
                {promises.map((promise, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => togglePromise(index)}
                        style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "15px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            cursor: "pointer",
                            position: "relative",
                            border: "2px solid #b2ebf2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "100px",
                            textAlign: "center",
                            fontSize: "1.2rem",
                            color: "#006064"
                        }}
                    >
                        {promise}

                        {/* Stamp Effect */}
                        <AnimatePresence>
                            {sealedPromises.includes(index) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 2, rotate: -20 }}
                                    animate={{ opacity: 0.8, scale: 1, rotate: -15 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        border: "3px solid #e91e63",
                                        color: "#e91e63",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        fontWeight: "bold",
                                        fontSize: "0.9rem",
                                        textTransform: "uppercase",
                                        transform: "rotate(-15deg)",
                                        pointerEvents: "none" // Let clicks pass through
                                    }}
                                >
                                    PROMISED ❤️
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <p style={{ marginTop: "40px", fontStyle: "italic", color: "#aaa" }}>
                "I promise to keep all these promises!"
            </p>
        </div>
    );
}
