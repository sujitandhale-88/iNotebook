import React from 'react';

const About = () => {
    return (
        <div className='mt-3'>
            <h2>About iNotebook</h2>
            <form>
                <div className="mb-3">
                    <p>
                        iNotebook is a simple note-taking application that allows you to create, edit, and delete notes easily. 
                        It's designed to help you stay organized and keep track of your ideas, tasks, and important information.
                    </p>
                </div>
                <div className="mb-3">
                    <p>
                        With iNotebook, you can categorize your notes using tags, making it easier to find and manage them.
                        Whether you're a student, professional, or anyone who needs to jot down notes, iNotebook is here to 
                        streamline your note-taking process.
                    </p>
                </div>
                <div className="mb-3">
                    <p>
                        iNotebook is built using React.js for the frontend and Node.js with Express.js for the backend. It uses 
                        MongoDB as its database to store notes securely. The application also implements user authentication to 
                        ensure that your notes are accessible only to you.
                    </p>
                </div>
                <div className="mb-3">
                    <p>
                        Get started with iNotebook today and take control of your notes!
                    </p>
                </div>
            </form>
        </div>
    );
}

export default About;

