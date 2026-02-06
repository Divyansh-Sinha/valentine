import React from 'react';

export default function Navigation({ currentPage, setCurrentPage }) {
    return (
        <nav className="nav-menu">
            <div
                className={`nav-link ${currentPage === 'ask' ? 'active' : ''}`}
                onClick={() => setCurrentPage('ask')}
            >
                Ask Valentine
            </div>
            <div
                className={`nav-link ${currentPage === 'rose' ? 'active' : ''}`}
                onClick={() => setCurrentPage('rose')}
            >
                Rose Day
            </div>
        </nav>
    );
}
