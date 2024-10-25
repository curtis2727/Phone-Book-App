import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ addContact }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !phone || !email) {
            setError('All fields are required.');
            return;
        }

        const contactData = { name, phone, email };

        try {
            await addContact(contactData);
            setSuccess('Contact added successfully!');
            setError('');
            setName('');
            setPhone('');
            setEmail('');
        } catch (error) {
            setError('Failed to add contact. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Contact</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Contact</button>
                {success && <p style={{ color: 'green' }}>{success}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default ContactForm;