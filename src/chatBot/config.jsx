import { createChatBotMessage } from 'react-chatbot-kit';
import Contact from './widget/Contact';
import Quotation from './widget/Quotation';
import Brand from './widget/Brand';
import MyAvatar from './widget/MyAvatar';
import Products from './widget/Products';



const botName = "Artem Robot"

const config = {
    initialMessages: [createChatBotMessage(`Bonjour Cher Visiteur, je suis ${botName}, comment puis-je vous aider ?`)],
    botName: botName,
    state: {
        product: { 'test': 'test' },
    },
    customComponents: {
        // Replaces the default bot avatar    
        botAvatar: (props) => <MyAvatar {...props} />,
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