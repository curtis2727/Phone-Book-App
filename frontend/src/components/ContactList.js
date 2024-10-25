import React from 'react';
import ContactCard from './ContactCard';

function ContactList({ contacts, deleteContact, updateContact }) {
    return (
        <div>
            {contacts.map(contact => (
                <ContactCard
                    key={contact._id}
                    contact={contact}
                    deleteContact={deleteContact}
                    updateContact={updateContact}
                />
            ))}
        </div>
    );
}

export default ContactList;