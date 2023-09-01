import API from './api/api';


// Fonction pour récupérer les informations de l'utilisateur et les devis en parallèle
const fetchData = async (user, updateUser) => {
    try {
        const [userData, quotationData] = await Promise.all([
            API.user.account(user.token),
            API.quotation.getQuotation(user.token),
        ]);
        const quotations = quotationData.data.quotations.map((quotation) => {
            return {
                ...quotation,
                products: JSON.parse(quotation.products)
            }
        })

        // Mettre à jour le context 'user' en conservant le token et en fusionnant les autres propriétés
        const updatedUser = { ...user, ...userData.data, billing_address: JSON.parse(userData.data.billing_address), deliveries: JSON.parse(userData.data.deliveries), delivery_standard: JSON.parse(userData.data.delivery_standard), quotations };
        updateUser(updatedUser);

    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
};

export default fetchData;