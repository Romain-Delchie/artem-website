import { createChatBotMessage } from 'react-chatbot-kit';
import Contact from './widget/Contact';
import Quotation from './widget/Quotation';
import Brand from './widget/Brand';
import MyAvatar from './widget/MyAvatar';
import Products from './widget/Products';



const botName = "votre assistant virtuel"

const config = {
    initialMessages: [createChatBotMessage(`Bonjour Cher Visiteur, je suis ${botName}, comment puis-je vous aider ?`)],
    botName: botName,
    state: {
        product: { 'test': 'test' },
    },
    customComponents: {
        // Replaces the default bot avatar    
        botAvatar: (props) => <MyAvatar {...props} />,
        header: () => <div className="react-chatbot-kit-chat-header ">Chat d'aide <span className="react-chatbot-kit-chat-header-cross" onClick={() => {
            const bot = document.querySelector('.react-chatbot-kit-chat-container')
            bot.classList.toggle('react-chatbot-kit-chat-container-open')
        }}>x</span></div>,
        // Replaces the default bot chat message container    botChatMessage: (props) => <MyCustomChatMessage {...props} />,    
        // Replaces the default user icon    userAvatar: (props) => <MyCustomAvatar {...props} />,    
        // Replaces the default user chat message    userChatMessage: (props) => <MyCustomUserChatMessage {...props} />  },
    },
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
        },
        {
            widgetName: 'products',
            widgetFunc: (props) => <Products {...props} />,
            mapStateToProps: ['product'],
        }
    ],
};

export default config;