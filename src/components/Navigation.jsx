import React from 'react';

export default function Navigation({ currentPage, setCurrentPage }) {
    return (
        <nav className="nav-menu">
            <button
                onClick={() => setCurrentPage("ask")}
                className={`nav-link ${currentPage === 'ask' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
                Ask Valentine 💘
            </button>
            <button
                onClick={() => setCurrentPage("rose")}
                className={`nav-link ${currentPage === 'rose' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
                Rose Day 🌹
            </button>
            <button
                onClick={() => setCurrentPage("propose")}
                className={`nav-link ${currentPage === 'propose' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
                Propose Day 💍
            </button>
            <button
                onClick={() => setCurrentPage("chocolate")}
                className={`nav-link ${currentPage === 'chocolate' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
                Chocolate Day 🍫
            </button>
            <button
                onClick={() => setCurrentPage("teddy")}
                className={`nav-link ${currentPage === 'teddy' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
                Teddy Day 🧸
            </button>
            <button
                onClick={() => setCurrentPage("promise")}
                className={`nav-link ${currentPage === 'promise' ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
                Promise Day 🤞
            </button>
        </nav>
    );
}
