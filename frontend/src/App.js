import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm.js';
import ContactList from './components/ContactList.js';
import './styles/App.css';

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);
const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };
    const addContact = async (contact) => {
        try {
            const response = await axios.post('http://localhost:3000/api/contacts', contact);
            setContacts([...contacts, response.data]);
        } catch (error) {
            console.error('Failed to add contact:', error.response ? error.response.data : error.message);
            alert('Failed to add contact... please try again.');
        }
    };

    // Deleting a contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('Failed to delete contact:', error.response ? error.response.data : error.message);
        }
    };

    const updateContact = async (id, updatedContact) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/contacts/${id}`, updatedContact);
            setContacts(contacts.map(contact => (contact._id === id ? response.data : contact)));
        } catch (error) {
            console.error('Failed to update contact:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="App">
            <h1>📇 Phone Book</h1>
            <ContactForm addContact={addContact} />
            <ContactList
                contacts={contacts}
                deleteContact={deleteContact}
                updateContact={updateContact}
            />
        </div>
    );
}

export default App;
