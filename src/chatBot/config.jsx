import { createChatBotMessage } from 'react-chatbot-kit';
import Contact from './widget/Contact';
import Quotation from './widget/Quotation';
import Brand from './widget/Brand';


const botName = "Artem Robot"

const config = {
    initialMessages: [createChatBotMessage(`Bonjour Cher Visiteur, je suis ${botName}, comment puis-je vous aider ?`)],
    botName: botName,
    widgets: [
        {
            widgetName: 'contact',
            widgetFunc: (props) => <Contact {...props} />,
        },
        {
            widgetName: 'quotation',
            widgetFunc: (props) => <Quotation {...props} />,
        },
        {
            widgetName: 'brand',
            widgetFunc: (props) => <Brand {...props} />,
        }
    ],
};

export default config;