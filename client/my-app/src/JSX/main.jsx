import { BrowserRouter, Route } from 'react-router-dom';
import { Nav } from './nav';
import { Routing } from './routing';
import { AllApartment } from './allApartment';
import { useState } from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Chatbot } from './chatBot';

export const Main = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    return (
        <>
            <div style={{ position: 'fixed', bottom: '35px', right: '35px' }}>
                <button style={{ borderRadius:"100%" }} onClick={toggleChatbot}>
                    <QuestionAnswerIcon  style={{ backgroundColor: "none" }}/>
                </button>
                {isChatbotOpen && <Chatbot />}
            </div>
            <BrowserRouter>
                <Nav />
                <Routing />
            </BrowserRouter>
        </>
    );
};
