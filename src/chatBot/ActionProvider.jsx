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
        const botMessage = createChatBotMessage("Pour obtenir un devis, vous pouvez creer un compte, vous connecter et faire votre devis directement sur notre site, sinon vous pouvez nous contacter directement par téléphone ou email, ci-desssous les liens pour votre choix",

            {
                widget: 'quotation',
            }
        );
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));
    };

    const brand = () => {
        const botMessage = createChatBotMessage(
            'Vous pouvez consulter notre gamme de produits sur le site sans ce connecter, vous pouvez également créer un compte et vous connecter pour visualiser plus de 1000 articles de notre gamme. Voici les liens pour ce faire :',
            {
                widget: 'brand',
            }, 'Pour consulter notre gamme de produits, vous pouvez cliquer sur le lien ci-dessous'
        );
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], }));
    }

    const products = (product) => {
        const botMessage = createChatBotMessage(
            `Vous recherchez des informations sur notre gamme ${product.name}? Cliquez sur le lien ci-dessous`,
            {
                widget: 'products',
            }
        );
        setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage], product: product }));
    }

    const lost = () => {
        const botMessage = createChatBotMessage(
            "Désolé, je ne suis qu''un robot et je n\'ai pas compris votre demande, veuillez reformuler votre question svp",
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
                        brand,
                        products,
                        lost
                    },
                });
            })}
        </div>
    );
};
export default ActionProvider;