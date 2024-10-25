import React, { useState } from 'react';
import axios from 'axios';

function ContactCard({ contact, deleteContact, updateContact }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(contact.name);
    const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
    const [email, setEmail] = useState(contact.email);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/contacts/${contact._id}`);
            deleteContact(contact._id);
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleUpdate = async () => {
        const updatedContact = { name, phoneNumber, email };
        try {
            const response = await axios.put(`/api/contacts/${contact._id}`, updatedContact);
            updateContact(contact._id, response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <div className="contact-card">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>{contact.name} 📞 {contact.phoneNumber}</h3>
                    <p>✉️ {contact.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
}

export default ContactCard;
