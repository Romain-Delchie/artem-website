import React from 'react';
const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
        const lowercase = message.toLowerCase();
        const contact = ['telephone', 'tel', 'telephone', 'email', 'mail', 'adresse', 'contact'];
        const quotation = ['devis', 'prix', 'tarif', 'coût', 'euros', '€', 'cout', 'offre', 'quotation'];
        const brand = ['produit', 'marque', 'gamme', 'article', 'reference', 'référence']
        const products = [
            [1, ['toile enfourneur', 'tapis enfourneur', 'toile de four', 'tapis de four', "toile d'enfourneur", "toile pour enfourneur", "tapis d'enfourneur", "tapis pour enfourneur"], "toile enfourneur"],
            [2, ['lin', 'arconet', 'toile pour grille', 'couche', 'toile de grille'], "toile de couche"],
            [3, ['faconn', 'façonn', 'bavette', 'feutre', 'lourd', 'major', 'euro2000', 'euro 2000', 'unic', 'tregor', 'm1', 'f73', 'f60'], "tapis de faconnage"],
            [4, ['laminoir', 'laminage', 'rondo', 'alma', 'conti', 'dito', 'flamic', 'italos', 'kemplex', 'mecnosud', 'ram', 'rollex', 'rollfix', 'rollmatic'], "tapis de laminoir"],
            [5, ['balanc', "repos"], "toile de repose pâtons"],
            [7, ['housse'], "housse à chariot"],
            [8, ['manche', 'silo', 'farine'], "manche à farine"],
            [10, ['boulage', 'bouleuse'], 'tapis de bouleuse'],
            [11, ['peseuse', 'diviseuse', 'diviseur', 'pesage'], 'tapis de peseuse'],
            [12, ['tranch'], 'tapis de trancheuse'],
            [14, ["cisea"], "élévateur ciseaux"],
            [15, ['colon'], "élévateur à colonne"],
            [16, ['auto'], "élévateur à colonne automatique"],
            [17, ['integre', 'integré', 'intégre', 'intégré'], "élévateur intégré"],
            [18, ['sech', 'séch', 'etend', 'étend'], "séchoir à couche"],
            [19, ['grille'], "grille inox"],
            [21, ['ecart', 'écart'], "bande d'écarteuse"],
            [22, ['choco', 'enrob'], "bande pour chocolaterie"],
            [24, ['bleu'], "produit bleu lavable"],
            [25, ['transi'], "transipat"],
            [28, ['tret', 'trét'], "tréteau"],
            [29, ['barr'], 'barre de toile']
        ]

        if (products.some((product) => product[1].some((word) => lowercase.includes(word)))) {
            console.log(products.find((product) => product[1].some((word) => lowercase.includes(word))))
            const product = products.find((product) => product[1].some((word) => lowercase.includes(word)));
            actions.products({ id: product[0], name: product[2] });
        } else if (contact.some((word) => lowercase.includes(word))) {
            actions.contact();
        } else if (quotation.some((word) => lowercase.includes(word))) {
            actions.quotation();
        } else if (brand.some((word) => lowercase.includes(word))) {
            actions.Brand();
        } else {
            actions.lost();
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