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
        </nav>
    );
}
