import React from 'react';
const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        const lowercase = message.toLowerCase();
        const contact = ['telephone', 'tel', 'telephone', 'email', 'mail', 'adresse', 'contact'];
        const quotation = ['devis', 'prix', 'tarif', 'coût', 'euros', '€', 'cout', 'offre', 'quotation'];
        const brand = ['produit', 'marque', 'gamme', 'article', 'reference', 'référence']
        if (contact.some((word) => lowercase.includes(word))) {
            actions.contact();
        } else if (quotation.some((word) => lowercase.includes(word))) {
            actions.quotation();
        } else if (brand.some((word) => lowercase.includes(word))) {
            actions.Brand();
        }
    };
    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};
export default MessageParser;