import { useState, useEffect, useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'
import NotFound from '../NotFound/NotFound'
import Seo from '../../components/Seo/Seo'
import RangeRedesign from './RangeRedesign'
import { getRangeSeo } from '/data/seo'
import { slugify } from '../../utils/seo/slugify'
import { SITE_URL, breadcrumbJsonLd } from '../../utils/seo/siteConfig'

export default function Range() {
    const { user, ranges } = useContext(AppContext);
    const { slug } = useParams()
    const [range, setRange] = useState(null);
    const [notFound, setNotFound] = useState(false);
    // Les anciennes URLs de la forme /gamme/1/Toile%20enfourneur restent
    // valides : on identifie la gamme par son identifiant puis on redirige
    // vers l'URL canonique en slug.
    const isLegacyIdUrl = /^\d+$/.test(slug || '');

    useEffect(() => {
        setNotFound(false);
        setRange(null);

        // L'URL contient un slug, mais la gamme se charge par identifiant.
        // On résout donc d'abord le slug en identifiant, à partir des gammes
        // déjà en mémoire si elles y sont, sinon via la liste.
        const resolveId = () => {
            if (isLegacyIdUrl) {
                return Promise.resolve(slug);
            }
            const findId = (list) => list.find((item) => slugify(item.name) === slug)?.id ?? null;
            if (ranges?.length) {
                return Promise.resolve(findId(ranges));
            }
            return API.range.getRanges().then((res) => findId(res.data.ranges));
        };

        resolveId()
            .then((id) => {
                if (!id) {
                    setNotFound(true);
                    return null;
                }
                // Toujours charger la gamme par cet endpoint : c'est le seul
                // qui renvoie les descriptions réelles des fiches techniques.
                // La liste, elle, les remplace par la chaîne « rt.name ».
                return API.range.getRange(id).then((res) => res.data.oneRange);
            })
            .then((found) => {
                if (!found) {
                    return;
                }
                setRange({ ...found, techSheets: JSON.parse(found.techSheets) });
            })
            .catch((err) => {
                console.error(err);
                setNotFound(true);
            });
    }, [slug, isLegacyIdUrl, ranges]);

    if (notFound) {
        return <NotFound />;
    }

    if (!range) {
        return <Loading />;
    }

    const canonicalSlug = slugify(range.name);

    if (isLegacyIdUrl) {
        return <Navigate to={`/gamme/${canonicalSlug}`} replace />;
    }

    // Un administrateur connecté voit aussi les textes en attente de validation,
    // ce qui permet de les faire relire sur le site réel. Le pré-rendu et les
    // robots d'indexation s'exécutent sans session : ils ne reçoivent que le
    // contenu déjà validé.
    const isAdmin = user.role === 'admin';
    const seo = getRangeSeo(canonicalSlug, { includePending: isAdmin });

    const path = `/gamme/${canonicalSlug}`;
    const imageUrl = `/images/products/${range.image_link}`;
    const imageAlt = seo.imageAlt || `${range.name} ARTEM pour la boulangerie`;

    const breadcrumbItems = [
        { name: 'Accueil', path: '/' },
        { name: 'Notre gamme', path: '/gamme' },
        { name: range.name, path },
    ];

    const productJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: range.name,
        description: seo.description || range.description,
        image: `${SITE_URL}${imageUrl}`,
        category: range.category,
        brand: { '@type': 'Brand', name: 'ARTEM' },
        manufacturer: { '@id': `${SITE_URL}/#organization` },
        url: `${SITE_URL}${path}`,
        ...(range.minPrice
            ? {
                offers: {
                    '@type': 'AggregateOffer',
                    priceCurrency: 'EUR',
                    lowPrice: range.minPrice,
                    availability: 'https://schema.org/InStock',
                    seller: { '@id': `${SITE_URL}/#organization` },
                },
            }
            : {}),
    };

    const faqJsonLd = seo.faq?.length
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: seo.faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
        }
        : null;

    const head = (
        <Seo
            title={seo.title || range.name}
            description={seo.description || range.description?.slice(0, 160)}
            path={path}
            image={imageUrl}
            jsonLd={[productJsonLd, breadcrumbJsonLd(breadcrumbItems), faqJsonLd].filter(Boolean)}
        />
    );

    // La refonte est validée : elle est servie à tout le monde. Seuls les
    // textes qui attendent encore une validation restent réservés à
    // l'administrateur — `getRangeSeo` ne les renvoie qu'avec `includePending`,
    // et c'est à lui seul que `pending` les fait afficher en rouge.
    return (
        <>
            {head}
            <RangeRedesign
                range={range}
                seo={seo}
                slug={canonicalSlug}
                imageUrl={imageUrl}
                imageAlt={imageAlt}
                breadcrumbItems={breadcrumbItems}
                pending={seo.published === false}
                isLogged={Boolean(user.token)}
            />
        </>
    );
}
