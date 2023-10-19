import React from 'react';
import artem from '../../data/artem-data';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const contact = () => {
        const botMessage = createChatBotMessage(
            'Si vous souhaitez nous contacter, voici le lien qui vous indiquera notre téléphone, adresse et email',
            {
                widget: 'contact',
            }
        );
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));
    };

    const quotation = () => {
        const botMessage = createChatBotMessage(
            'Pour obtenir un devis, vous pouvez creer un compte et faire votre devis directement sur notre site en cliquant sur le lien ci-dessous',
            {
                widget: 'quotation',
            }
        );
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));
    };

    const Brand = () => {
        const botMessage = createChatBotMessage(
            'Pour consulter notre gamme de produits, vous pouvez cliquer sur le lien ci-dessous',
            {
                widget: 'brand',
            }, 'Pour consulter notre gamme de produits, vous pouvez cliquer sur le lien ci-dessous'
        );
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        contact,
                        quotation,
                        Brand,
                    },
                });
            })}
        </div>
    );
};
export default ActionProvider;