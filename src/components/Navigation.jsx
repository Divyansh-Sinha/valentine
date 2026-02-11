import React, { useState } from 'react';

export default function Navigation({ currentPage, setCurrentPage }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = (page) => {
        setCurrentPage(page);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="mobile-menu-icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {isOpen ? '✖' : '🍔'}
            </button>

            <nav className={`nav-menu ${isOpen ? 'open' : ''}`}>
                <button
                    onClick={() => handleNavClick("ask")}
                    className={`nav-link ${currentPage === 'ask' ? 'active' : ''}`}
                >
                    Ask Valentine 💘
                </button>
                <button
                    onClick={() => handleNavClick("rose")}
                    className={`nav-link ${currentPage === 'rose' ? 'active' : ''}`}
                >
                    Rose Day 🌹
                </button>
                <button
                    onClick={() => handleNavClick("propose")}
                    className={`nav-link ${currentPage === 'propose' ? 'active' : ''}`}
                >
                    Propose Day 💍
                </button>
                <button
                    onClick={() => handleNavClick("chocolate")}
                    className={`nav-link ${currentPage === 'chocolate' ? 'active' : ''}`}
                >
                    Chocolate Day 🍫
                </button>
                <button
                    onClick={() => handleNavClick("teddy")}
                    className={`nav-link ${currentPage === 'teddy' ? 'active' : ''}`}
                >
                    Teddy Day 🧸
                </button>
                <button
                    onClick={() => handleNavClick("promise")}
                    className={`nav-link ${currentPage === 'promise' ? 'active' : ''}`}
                >
                    Promise Day 🤞
                </button>
                <button
                    onClick={() => handleNavClick("hug")}
                    className={`nav-link ${currentPage === 'hug' ? 'active' : ''}`}
                >
                    Hug Day 🤗
                </button>
            </nav>
        </>
    );
}

