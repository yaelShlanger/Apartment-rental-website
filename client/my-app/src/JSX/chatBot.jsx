import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/chatBot.css"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TelegramIcon from '@mui/icons-material/Telegram';

export const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        try {
            const response = await axios.post('http://localhost:3002/chatBot/reply', { message: inputMessage });
        
            if (response && response.data && response.data.message) {
                // הוספת הודעת המשתמש והתגובה מהבוט לרשימת ההודעות
                setMessages(prevMessages => [...prevMessages, { sender: 'user', content: inputMessage }]);
                setMessages(prevMessages => [...prevMessages, { sender: 'bot', content: response.data.message }]);
        
                // ניקוי תיבת הטקסט
                setInputMessage('');
            } else {
                console.error('Invalid response:', response);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">צ'אט בוט</div>
            <div className="chatbot-content">
                <TransitionGroup>
                    {messages.map((msg, index) => (
                        <CSSTransition key={index} timeout={500} classNames="message">
                            <div className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
                                <span>{msg.content}</span>
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <div className="chatbot-input-container">
            <input
    type="text"
    value={inputMessage}
    onChange={(e) => setInputMessage(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }}
    placeholder="הקלד הודעה..."
    className="chatbot-input"
/>

                <button onClick={sendMessage} className="chatbot-submit"><TelegramIcon></TelegramIcon></button>
            </div>
        </div>
    );
};
