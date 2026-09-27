/**
 * Navigation du back-office, partagée par la barre latérale et par le tableau
 * de bord.
 *
 * Les deux affichaient auparavant des listes indépendantes : la colonne de
 * gauche énumérait douze liens à plat, la page en proposait d'autres. Une
 * source unique garantit que les mêmes outils apparaissent des deux côtés,
 * rangés dans le même ordre et sous les mêmes intitulés.
 */

export const ICONS = {
    gauge: 'M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605',
    users: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
    clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    doc: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
    cart: 'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z',
    box: 'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
    window: 'M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z',
    plus: 'M12 4.5v15m7.5-7.5h-15',
    pencil: 'm16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125',
    trash: 'm14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0',
    check: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    home: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
    card: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z',
    arrow: 'M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3',
};

/** Pictogramme au trait, dans le style déjà employé sur le site. */
export function Icon({ name }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
            <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[name]} />
        </svg>
    );
}

/** Le tableau de bord, seul point d'entrée hors des trois domaines de travail. */
export const ADMIN_HOME = { to: '/dashboard', label: 'Tableau de bord', icon: 'gauge' };

/** Les outils du back-office, rangés par domaine de travail. */
export const ADMIN_GROUPS = [
    {
        title: 'Catalogue produits',
        icon: 'box',
        links: [
            { to: '/add-product', label: 'Ajouter un produit', icon: 'plus' },
            { to: '/update-product', label: 'Modifier un produit', icon: 'pencil' },
            { to: '/delete-product', label: 'Supprimer un produit', icon: 'trash' },
            { to: '/add-techsheet', label: 'Fiches techniques', icon: 'doc' },
        ],
    },
    {
        title: 'Vitrine du site',
        icon: 'window',
        links: [
            { to: '/add-range', label: 'Ajouter une gamme', icon: 'plus' },
            { to: '/update-range', label: 'Modifier une gamme', icon: 'pencil' },
            { to: '/delete-range', label: 'Supprimer une gamme', icon: 'trash' },
            { to: '/handle-home', label: "Gérer la page d'accueil", icon: 'home' },
        ],
    },
    {
        title: 'Clients et devis',
        icon: 'users',
        links: [
            { to: '/user-list', label: 'Liste des utilisateurs', icon: 'users' },
            { to: '/role-validation', label: 'Valider un rôle client', icon: 'check' },
            { to: '/quotation-list', label: 'Liste des devis', icon: 'doc' },
            { to: '/new-quote', label: 'Nouveau devis', icon: 'plus' },
        ],
    },
];
