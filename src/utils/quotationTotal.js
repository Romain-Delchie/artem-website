import artemData from '/data/artem-data';
import goodPrice from './goodPrice';

/**
 * Total HT d'un devis : produits, transport, frais de livraison hors adresse
 * standard, et supplément Corse.
 *
 * Le calcul était écrit dans la liste des devis du back-office. Il sert
 * désormais aussi à l'historique du client : il est donc ici, dans un seul
 * exemplaire, pour que les deux pages ne puissent pas afficher deux totaux
 * différents pour le même devis.
 *
 * Les deux appelants ne nomment pas les champs du compte de la même façon —
 * `account_profile_id` côté back-office, `profile_id` côté client — d'où les
 * deux valeurs passées à part plutôt que lues dans le devis.
 *
 * @param {object} quotation          Devis, produits déjà analysés.
 * @param {object} account
 * @param {number} account.profileId  Profil tarifaire du compte.
 * @param {number} account.deliveryStandardId Adresse de livraison habituelle.
 * @returns {{ totalHT: number, transportUnknown: boolean }}
 */
export default function computeTotalHT(quotation, { profileId, deliveryStandardId } = {}) {
    const products = quotation.products || [];
    const productsPrice = products.reduce(
        (acc, product) =>
            acc +
            Number(goodPrice(profileId, product, product.quantity)) * product.quantity,
        0
    );
    const totalWeight = products.reduce(
        (acc, product) => acc + Number(product.weight) * Number(product.quantity),
        0
    );
    const zipCode = String(quotation.zip_code ?? '');
    const isFrance = quotation.country?.toLowerCase() === 'france';

    const transport =
        quotation.delivery_id === 1 ? 0 : artemData.tansportFunction(totalWeight);
    // Transport « Nous consulter » pour les DOM-TOM, l'étranger et les colis
    // trop lourds : la fonction renvoie alors une chaîne.
    const transportUnknown =
        zipCode.startsWith('97') || !isFrance || typeof transport !== 'number';
    const clicli =
        quotation.delivery_id !== deliveryStandardId ? artemData.clicli : 0;
    const corse =
        zipCode.startsWith('20') || zipCode.startsWith('2A') || zipCode.startsWith('2B')
            ? artemData.corse
            : 0;

    return {
        totalHT:
            productsPrice + (transportUnknown ? 0 : transport) + clicli + corse || 0,
        transportUnknown,
    };
}
