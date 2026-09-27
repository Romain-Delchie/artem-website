import { useState, useEffect, useContext } from 'react'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading'
import AppContext from '../../context/AppContext';
import Seo from '../../components/Seo/Seo';
import HomeCurrent from './HomeCurrent';
import Variant1Devis from './variants/Variant1Devis';
import { SITE_URL, organizationJsonLd, localBusinessJsonLd } from '../../utils/seo/siteConfig';

// Déclare le site lui-même, ce qui permet à Google d'afficher un champ de
// recherche interne dans ses résultats et de rattacher toutes les pages
// à l'entreprise décrite par organizationJsonLd.
const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'ARTEM',
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [presentations, setPresentations] = useState()
    const { user } = useContext(AppContext);

    useEffect(() => {
        API.presentation.getPresentations()
            .then((res) => {
                setPresentations(res.data)
                setIsLoaded(true)
            })
            .catch((err) => console.log(err))
    }, [])

    if (!isLoaded) {
        return <Loading />
    }

    // Un administrateur connecté voit la proposition de refonte retenue, la
    // n° 1, sans sélecteur : les autres propositions ne sont plus à comparer.
    // Tous les autres visiteurs, ainsi que le pré-rendu et les moteurs de
    // recherche, qui s'exécutent sans session, reçoivent la page en production.
    const isAdmin = user.role === 'admin';

    return (
        <>
            <Seo
                path="/"
                jsonLd={[organizationJsonLd, localBusinessJsonLd, webSiteJsonLd]}
            />
            {isAdmin
                ? <Variant1Devis presentations={presentations} />
                : <HomeCurrent presentations={presentations} />}
        </>
    )
}
