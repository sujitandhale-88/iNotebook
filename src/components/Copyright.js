import React from 'react';

const Copyright = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="container mb-0">
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container text-center">
                <span className="text-muted">© {currentYear} iNotebook. All rights reserved.</span>
            </div>
        </footer>
        </div>
    );
}

export default Copyright;
