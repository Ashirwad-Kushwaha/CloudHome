import React, { useEffect, useState } from 'react';
import './style.css';
import useShareEmail from '../../hooks/useShareEmail';
import toast from "react-hot-toast";

function EmailModal({ id, isOpen, onClose }) {
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState([]);
    const [user, setUser] = useState({});

    const { shareFileFolder } = useShareEmail();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);

    const addEmail = () => {
        if (user.user.email === email) {
            toast.error('You cannot share with yourself');
            setEmail('');
            return;
        }
        if (email && !emails.includes(email)) {
            setEmails([...emails, email]);
            setEmail('');
        }
    };

    const removeEmail = (emailToRemove) => {
        setEmails(emails.filter(email => email !== emailToRemove));
    };

    const handleShare = () => {
        if (emails.length > 0) {
            shareFileFolder({ id, emails });
            onClose(); // Close the modal
            toast.success('Shared successfully!');
        }
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                    <h2>Add Email Addresses</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                    <button onClick={addEmail}>Add Email</button>
                    <ul>
                        {emails.map((email, index) => (
                            <li key={index}>
                                {email}
                                <button className="remove-button" onClick={() => removeEmail(email)}>&times;</button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`share-button ${emails.length === 0 ? 'disabled' : ''}`}
                        onClick={handleShare}
                        disabled={emails.length === 0}
                    >
                        Share
                    </button>
                </div>
            </div>
        )
    );
}

export default EmailModal;
