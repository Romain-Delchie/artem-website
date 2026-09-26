/**
 * Contenu SEO des bandes transporteuses, boulangerie artisanale et tous secteurs.
 * Voir data/seo/index.js pour la structure attendue de chaque entrée.
 *
 * EN ATTENTE DE VALIDATION PAR LA DIRECTION.
 *
 * Toutes les entrées de ce fichier portent `published: false`. Le contenu peut
 * donc être commité et déployé sans apparaître sur le site : les visiteurs et
 * les moteurs de recherche continuent de voir ces pages telles qu'elles étaient,
 * avec le nom et la description issus de la base.
 *
 * Un administrateur connecté, lui, voit ces textes en place sur le site réel,
 * signalés par un bandeau d'aperçu. La relecture se fait donc directement sur
 * les pages concernées, sans document intermédiaire.
 *
 * Une fois un texte validé, passez son entrée à `published: true` ou retirez
 * simplement la ligne. La validation se fait gamme par gamme : il n'est pas
 * nécessaire d'attendre un accord sur l'ensemble du fichier.
 */
const bandes = {
    "tapis-de-laminoir": {
        published: false,
        title: "Tapis de laminoir pour boulangerie et pâtisserie",
        description:
            "Tapis de laminoir en toile coton ou matière synthétique, sans fin ou agrafé. Fabrication sur mesure toutes marques, artisanal et industriel.",
        imageAlt:
            "Tapis de laminoir en toile pour le laminage des pâtes en boulangerie-pâtisserie",
        sections: [
            {
                heading: "Un textile qui travaille en tension permanente",
                paragraphs: [
                    "Le tapis de laminoir entraîne le pâton entre les rouleaux lamineurs. Il travaille en tension permanente et subit un allongement progressif : au bout de quelques mois, un tapis détendu patine, se décentre et provoque des épaisseurs de pâte irrégulières. C'est la pièce d'usure la plus visible sur la qualité du produit fini.",
                ],
            },
            {
                heading: "Choisir la bonne matière",
                paragraphs: [
                    "Le choix se fait entre les toiles coton, appréciées pour leur toucher et leur capacité à retenir un léger fleurage, et les matières synthétiques à trame polyester, qui offrent un allongement nettement réduit et se nettoient plus facilement. Pour les pâtes grasses de viennoiserie, une surface nettoyable est généralement préférable.",
                ],
            },
            {
                heading: "Sur mesure, toutes marques",
                paragraphs: [
                    "Nous fabriquons les tapis de laminoir aux dimensions exactes de votre machine, en version sans fin ou avec agrafe, pour les laminoirs artisanaux comme pour les lignes industrielles. Transmettez-nous la largeur, le développé et le type de jonction de votre tapis actuel.",
                ],
            },
        ],
        faq: [
            {
                question: "Comment savoir si mon tapis de laminoir est usé ?",
                answer:
                    "Un tapis qui patine, qui se décentre malgré le réglage des rouleaux tendeurs, ou qui produit des épaisseurs de pâte irrégulières est arrivé en fin de vie. L'allongement progressif du textile en est presque toujours la cause.",
            },
            {
                question: "Comment relever les dimensions de mon tapis de laminoir ?",
                answer:
                    "Relevez la largeur utile et le développé total du tapis à plat, puis précisez le type de jonction, sans fin ou agrafée. La marque et le modèle du laminoir suffisent souvent à identifier la référence.",
            },
            {
                question: "Quelle matière pour de la viennoiserie ?",
                answer:
                    "Les pâtes grasses encrassent rapidement une toile coton. Une matière synthétique à surface nettoyable se rince facilement et conserve ses caractéristiques plus longtemps sur ce type de production.",
            },
        ],
    },

    "tapis-de-transport": {
        published: false,
        title: "Tapis de transport et bande de convoyage",
        description:
            "Tapis de convoyage sur mesure : jonction agrafée ou sans fin, plastifié, tissu ou feutre, lisse ou à relief, avec profil de guidage ou tasseaux.",
        imageAlt:
            "Tapis de transport pour convoyeur plat, avec profil de guidage",
        sections: [
            {
                heading: "Une gamme complète de tapis de convoyage",
                paragraphs: [
                    "Le tapis de transport couvre tous les usages de convoyage entre deux postes de production. Nous proposons les matières plastifiées, les tissus et les feutres, en surface lisse ou à relief selon l'adhérence recherchée, pour convoyeur plat comme pour convoyeur en auge.",
                ],
            },
            {
                heading: "Guidage, tasseaux et jonction",
                paragraphs: [
                    "Selon la configuration du convoyeur, la bande peut recevoir un profil de guidage soudé en sous-face pour l'empêcher de se décentrer, ou des tasseaux transversaux lorsque le convoyeur travaille en montée. La jonction se fait sans fin, pour une surface continue, ou par agrafage lorsque la bande doit pouvoir être déposée sans démonter le châssis.",
                    "Pour les convoyeurs difficiles à démonter, nous assurons également la jonction sur site : nos techniciens se déplacent avec l'équipement nécessaire.",
                ],
            },
        ],
        faq: [
            {
                question: "Jonction sans fin ou agrafée pour un tapis de transport ?",
                answer:
                    "La jonction sans fin offre une surface continue et une meilleure longévité, mais impose de démonter le convoyeur. L'agrafage permet de poser la bande en place, ce qui est indispensable quand le châssis n'est pas démontable.",
            },
            {
                question: "À quoi sert un profil de guidage sous la bande ?",
                answer:
                    "Le profil de guidage est un jonc soudé en sous-face qui s'engage dans une gorge du tambour. Il empêche la bande de se décentrer, notamment sur les convoyeurs longs ou chargés de façon irrégulière.",
            },
            {
                question: "Quand faut-il des tasseaux sur un tapis de transport ?",
                answer:
                    "Les tasseaux transversaux sont nécessaires dès que le convoyeur travaille en pente et que les produits risquent de glisser vers l'arrière. Leur hauteur et leur pas se définissent selon l'inclinaison et la taille des produits.",
            },
        ],
    },

    "bande-de-boulage": {
        published: false,
        title: "Bande et tapis de boulage pour diviseuse",
        description:
            "Tapis de boulage en feutre synthétique ou laine, bande à relief avec ou sans barrettes, sans fin ou agrafée. Standard et sur mesure.",
        imageAlt:
            "Tapis de boulage en feutre pour bouleuse de boulangerie",
        sections: [
            {
                heading: "Le poste de boulage",
                paragraphs: [
                    "Après la division, la bouleuse met les pâtons en boule pour reconstituer leur réseau glutineux. Le tapis de boulage assure le roulage : sa surface doit offrir une adhérence suffisante pour entraîner le pâton sans le déchirer, et rester assez souple pour ne pas le marquer.",
                ],
            },
            {
                heading: "Feutre ou bande à relief",
                paragraphs: [
                    "Le feutre synthétique et le feutre laine restent les matières les plus courantes : leur surface légèrement pelucheuse retient le fleurage et donne un boulage régulier. Les bandes à relief, avec ou sans barrettes, s'emploient lorsque les pâtons sont très hydratés et qu'une adhérence mécanique est nécessaire.",
                    "Nous fabriquons en standard comme sur mesure, en version sans fin ou agrafée.",
                ],
            },
        ],
        faq: [
            {
                question: "Feutre laine ou feutre synthétique pour le boulage ?",
                answer:
                    "Le feutre laine donne un boulage très régulier et retient bien le fleurage. Le feutre synthétique résiste mieux à l'abrasion et à l'humidité, et tient plus longtemps sur des cadences élevées.",
            },
            {
                question: "Quand utiliser une bande de boulage à barrettes ?",
                answer:
                    "Les barrettes apportent une adhérence mécanique utile sur les pâtes très hydratées, qui glissent sur une surface lisse ou feutrée sans être entraînées correctement.",
            },
            {
                question: "Fabriquez-vous les tapis de boulage sur mesure ?",
                answer:
                    "Oui, nous fabriquons en dimensions standard et sur mesure, en jonction sans fin ou agrafée, selon la marque et le modèle de votre bouleuse.",
            },
        ],
    },

    "bande-de-peseuses-diviseuses": {
        published: false,
        title: "Bande de peseuse diviseuse en polyuréthane",
        description:
            "Bande de peseuse et diviseuse en polyuréthane lisse blanc ou bleu, apte au contact alimentaire. Sans fin ou agrafée, standard et sur mesure.",
        imageAlt:
            "Bande polyuréthane blanche pour peseuse diviseuse de boulangerie",
        sections: [
            {
                heading: "Une bande au contact direct de la pâte",
                paragraphs: [
                    "La bande de peseuse diviseuse reçoit la pâte brute avant division. Elle est en contact alimentaire direct et doit se nettoyer facilement, sans rétention de pâte dans les anfractuosités. Le polyuréthane lisse s'est imposé sur ce poste pour cette raison : sa surface non poreuse se racle et se rince sans effort.",
                ],
            },
            {
                heading: "Blanc ou bleu détectable",
                paragraphs: [
                    "Nous proposons le polyuréthane en blanc, le standard alimentaire, et en bleu. Le bleu est retenu dans les environnements soumis à un plan de maîtrise sanitaire strict : cette couleur n'existant pas dans les denrées, tout fragment de bande est immédiatement repérable sur la ligne.",
                    "La bande est livrée sans fin ou avec agrafe, en dimensions standard ou sur mesure. D'autres matières sont disponibles selon votre application.",
                ],
            },
        ],
        faq: [
            {
                question: "Pourquoi choisir une bande bleue plutôt que blanche ?",
                answer:
                    "Le bleu n'existe pas naturellement dans les denrées alimentaires. Un fragment de bande bleue est donc immédiatement visible lors d'un contrôle, ce qui est exigé par de nombreux plans de maîtrise sanitaire.",
            },
            {
                question: "Le polyuréthane est-il apte au contact alimentaire ?",
                answer:
                    "Oui, nos bandes polyuréthane destinées aux peseuses diviseuses répondent à la réglementation sur les matériaux au contact des denrées alimentaires.",
            },
            {
                question: "Comment nettoyer une bande de peseuse diviseuse ?",
                answer:
                    "La surface lisse du polyuréthane se racle à sec puis se rince à l'eau tiède. Évitez les solvants et les outils tranchants, qui entaillent la surface et créent des points de rétention.",
            },
        ],
    },

    "bande-de-trancheuse": {
        published: false,
        title: "Bande de trancheuse à pain sur mesure",
        description:
            "Bande de trancheuse en PVC lisse ou à relief toit d'usine, autres matières sur demande. Sans fin ou agrafée, dimensions standard et sur mesure.",
        imageAlt:
            "Bande PVC à relief toit d'usine pour trancheuse à pain",
        sections: [
            {
                heading: "Entraîner le pain sans le déformer",
                paragraphs: [
                    "La bande de trancheuse doit entraîner régulièrement le pain vers les lames, sans glissement. Un patinage se traduit immédiatement par des tranches d'épaisseur irrégulière, voire par un pain écrasé contre la grille de lames.",
                ],
            },
            {
                heading: "PVC lisse ou relief toit d'usine",
                paragraphs: [
                    "Le PVC lisse convient aux pains à croûte souple et se nettoie très facilement. Le relief toit d'usine, dont les stries en chevrons augmentent le coefficient d'adhérence, est préférable sur les pains à croûte dure ou farinés, où une surface lisse ne suffit pas à entraîner le produit.",
                    "Nous fabriquons ces bandes en dimensions standard comme sur mesure, sans fin ou avec agrafe, et travaillons toute autre matière selon votre convenance.",
                ],
            },
        ],
        faq: [
            {
                question: "Quel relief choisir pour une bande de trancheuse ?",
                answer:
                    "Le PVC lisse suffit pour les pains de mie et les croûtes souples. Le relief toit d'usine devient nécessaire sur les pains farinés ou à croûte dure, qui glissent sur une surface lisse.",
            },
            {
                question: "Comment éviter que le pain patine sur la bande ?",
                answer:
                    "Vérifiez d'abord la tension et l'état de surface de la bande : une bande usée et polie perd son adhérence. Si le problème persiste sur un pain fariné, passez à une bande à relief toit d'usine.",
            },
            {
                question: "Fabriquez-vous les bandes de trancheuse sur mesure ?",
                answer:
                    "Oui, en dimensions standard comme sur mesure, en jonction sans fin ou agrafée. Transmettez-nous la largeur, le développé et la marque de votre trancheuse.",
            },
        ],
    },

    "bande-arcot-tissus": {
        published: false,
        title: "Bande transporteuse ARCOT en tissu",
        description:
            "Gamme complète de bandes transporteuses ARCOT en tissu technique : haute température, faible allongement, contact alimentaire. Sur mesure.",
        imageAlt:
            "Bande transporteuse ARCOT en tissu technique pour ligne de production",
        sections: [
            {
                heading: "La gamme tissu ARCOT",
                paragraphs: [
                    "Les bandes ARCOT regroupent nos tissus techniques de convoyage. Contrairement aux bandes à revêtement plastique, le tissu reste respirant et supporte des températures élevées : c'est la famille de matières retenue en entrée de four, en séchage et partout où la bande doit évacuer l'humidité.",
                ],
            },
            {
                heading: "Des références pour chaque contrainte",
                paragraphs: [
                    "La gamme couvre plusieurs niveaux de résistance thermique, d'allongement et d'épaisseur. Les références ARCOT 500, ARCOT 620, ARCOT EC100 et ARCOT EM80 sont parmi les plus utilisées en boulangerie. Les fiches techniques détaillant grammage, température maximale d'emploi et diamètre d'enroulement minimal sont téléchargeables sur les pages produits concernées.",
                    "Toutes ces bandes sont confectionnées à vos dimensions, en jonction sans fin ou agrafée.",
                ],
            },
        ],
        faq: [
            {
                question: "Quelle est la température maximale d'une bande ARCOT ?",
                answer:
                    "Elle dépend de la référence. Les tissus techniques ARCOT couvrent une large plage d'emploi, certaines références étant spécifiquement prévues pour l'entrée de four. Consultez la fiche technique de la référence concernée ou contactez-nous avec votre température de travail.",
            },
            {
                question: "Pourquoi choisir un tissu plutôt qu'une bande PVC ou PU ?",
                answer:
                    "Le tissu reste respirant et supporte des températures bien supérieures à celles d'un revêtement plastique. Il est donc indispensable en entrée de four et en séchage, là où une bande PVC ou PU fondrait.",
            },
            {
                question: "Les bandes ARCOT sont-elles aptes au contact alimentaire ?",
                answer:
                    "Plusieurs références de la gamme sont aptes au contact alimentaire. Précisez-nous votre application : nous vous orienterons vers la référence conforme adaptée à votre ligne.",
            },
        ],
    },

    "bande-arvinyl-pvc": {
        published: false,
        title: "Bande transporteuse ARVINYL en PVC",
        description:
            "Bandes transporteuses ARVINYL en PVC : surfaces lisses ou à relief, versions alimentaires, blanches ou bleues détectables. Confection sur mesure.",
        imageAlt:
            "Bande transporteuse ARVINYL en PVC blanc pour convoyeur agroalimentaire",
        sections: [
            {
                heading: "Le PVC, la solution de convoyage la plus répandue",
                paragraphs: [
                    "Les bandes ARVINYL en PVC constituent la solution de convoyage la plus courante en agroalimentaire à température ambiante. Le revêtement PVC offre un excellent rapport entre coût, résistance à l'abrasion et facilité de nettoyage, avec une large palette de surfaces disponibles.",
                ],
            },
            {
                heading: "Surfaces, couleurs et confection",
                paragraphs: [
                    "La gamme couvre les surfaces lisses, les reliefs toit d'usine, losange et grain, en blanc alimentaire ou en bleu détectable pour les environnements à plan de maîtrise sanitaire renforcé. Différentes épaisseurs et nombres de plis permettent d'ajuster la souplesse au diamètre des tambours de votre convoyeur.",
                    "Nous assurons la confection complète : mise à longueur, jonction sans fin ou agrafée, profils de guidage, tasseaux et bords de contenance.",
                ],
            },
        ],
        faq: [
            {
                question: "Quelle différence entre une bande PVC et une bande PU ?",
                answer:
                    "Le PVC offre le meilleur rapport coût-performance en convoyage à température ambiante. Le polyuréthane résiste mieux aux graisses, aux coupures et aux nettoyages agressifs, et se justifie sur les postes en contact direct avec des produits gras.",
            },
            {
                question: "Le PVC supporte-t-il la chaleur d'un four ?",
                answer:
                    "Non. Le PVC est limité aux températures modérées. Pour une entrée de four ou une sortie de cuisson, il faut une bande tissu technique de la gamme ARCOT.",
            },
            {
                question: "Proposez-vous des bandes PVC bleues détectables ?",
                answer:
                    "Oui, le bleu détectable est disponible sur la gamme ARVINYL. Cette couleur, absente des denrées, rend tout fragment de bande immédiatement visible lors des contrôles.",
            },
        ],
    },

    "bande-arure-pu": {
        published: false,
        title: "Bande transporteuse ARURE en polyuréthane",
        description:
            "Bandes ARURE en polyuréthane alimentaire : résistance aux graisses et aux coupures, nettoyage facile, surfaces lisses ou à relief. Sur mesure.",
        imageAlt:
            "Bande transporteuse ARURE en polyuréthane alimentaire pour ligne agroalimentaire",
        sections: [
            {
                heading: "Le polyuréthane pour les environnements exigeants",
                paragraphs: [
                    "Le polyuréthane se distingue du PVC par sa résistance nettement supérieure aux graisses, aux huiles et aux coupures. Sa surface non poreuse ne retient pas les résidus et supporte des protocoles de nettoyage plus agressifs, ce qui en fait la matière de référence sur les postes soumis à un plan de maîtrise sanitaire strict.",
                ],
            },
            {
                heading: "La gamme ARURE",
                paragraphs: [
                    "Nos bandes ARURE sont disponibles en surfaces lisses et à relief, en blanc alimentaire et en bleu détectable, dans plusieurs épaisseurs et duretés. Elles équipent notamment les peseuses diviseuses, les postes de découpe et les lignes en contact avec des produits gras.",
                    "La confection est réalisée à vos dimensions, avec jonction sans fin ou agrafée, profils de guidage, tasseaux ou bords de contenance selon le besoin.",
                ],
            },
        ],
        faq: [
            {
                question: "Quand faut-il préférer le polyuréthane au PVC ?",
                answer:
                    "Dès que la bande est en contact avec des produits gras, subit des coupures ou doit supporter un nettoyage fréquent et agressif. Sur un convoyage sec et peu sollicité, le PVC reste plus économique.",
            },
            {
                question: "Le polyuréthane est-il apte au contact alimentaire ?",
                answer:
                    "Oui, nos bandes ARURE destinées au contact direct répondent à la réglementation sur les matériaux au contact des denrées alimentaires.",
            },
            {
                question: "Le polyuréthane résiste-t-il aux coupures ?",
                answer:
                    "Il résiste nettement mieux que le PVC, ce qui explique son emploi sur les postes de découpe. Aucune bande n'est toutefois totalement insensible à un outil tranchant en contact direct.",
            },
        ],
    },

    "bande-argrip-adherente": {
        published: false,
        title: "Bande ARGRIP adhérente pour convoyage en pente",
        description:
            "Bandes ARGRIP à surface fortement adhérente pour convoyage en pente et entraînement de produits glissants. Sur mesure, sans fin ou agrafée.",
        imageAlt:
            "Bande ARGRIP à surface adhérente pour convoyeur incliné",
        sections: [
            {
                heading: "Quand l'adhérence devient le critère principal",
                paragraphs: [
                    "Sur un convoyeur incliné, ou lorsque les produits transportés sont lisses, humides ou farinés, une bande classique laisse les produits glisser vers l'arrière. La gamme ARGRIP répond à ce besoin par une surface à très fort coefficient d'adhérence, qui retient le produit sans avoir recours à des tasseaux.",
                ],
            },
            {
                heading: "Une alternative aux tasseaux",
                paragraphs: [
                    "L'intérêt de la bande adhérente par rapport aux tasseaux est de conserver une surface plane : les produits peuvent être déposés et repris n'importe où sur la bande, et le nettoyage reste simple. Au-delà d'un certain angle ou pour des produits lourds, la combinaison des deux solutions reste possible.",
                    "Nous confectionnons les bandes ARGRIP à vos dimensions, en jonction sans fin ou agrafée, avec guidage si nécessaire.",
                ],
            },
        ],
        faq: [
            {
                question: "Jusqu'à quelle pente une bande adhérente suffit-elle ?",
                answer:
                    "Cela dépend du poids et de l'état de surface des produits convoyés. Décrivez-nous votre application, l'angle du convoyeur et la nature des produits : nous vous indiquerons si une bande ARGRIP suffit ou s'il faut y ajouter des tasseaux.",
            },
            {
                question: "Bande adhérente ou bande à tasseaux ?",
                answer:
                    "La bande adhérente conserve une surface plane, plus simple à charger et à nettoyer. Les tasseaux s'imposent au-delà d'un certain angle ou pour des produits lourds qui ne peuvent pas être retenus par la seule adhérence.",
            },
            {
                question: "La surface adhérente s'use-t-elle vite ?",
                answer:
                    "Le relief adhérent se polit progressivement au contact des produits et des racleurs. Sa durée de vie dépend surtout de l'abrasivité des produits convoyés et du réglage des racleurs.",
            },
        ],
    },

    "bande-faconnage": {
        published: false,
        title: "Bande de façonnage industrielle",
        description:
            "Gamme complète de bandes de façonnage pour lignes industrielles : faible allongement, jonctions renforcées, matières aptes au contact alimentaire.",
        imageAlt:
            "Bande de façonnage pour ligne de production industrielle de boulangerie",
        sections: [
            {
                heading: "Le façonnage en cadence industrielle",
                paragraphs: [
                    "Sur une ligne industrielle, la bande de façonnage travaille en continu à des vitesses élevées. Deux contraintes dominent : un allongement minimal, pour que la synchronisation entre les postes reste stable, et une jonction capable d'encaisser des millions de passages sans marquer le produit.",
                ],
            },
            {
                heading: "Matières et confection",
                paragraphs: [
                    "Notre gamme couvre les tissus techniques à faible allongement, les revêtements polyuréthane pour les pâtes grasses et les surfaces traitées limitant le collage. Les matières en contact direct avec la pâte sont aptes au contact alimentaire.",
                    "La confection est réalisée à vos dimensions, avec jonction sans fin ou agrafée selon les contraintes de démontage de votre ligne.",
                ],
            },
        ],
        faq: [
            {
                question: "Pourquoi l'allongement est-il critique en façonnage industriel ?",
                answer:
                    "Un allongement important désynchronise les postes en aval et impose des réglages permanents des tendeurs. Sur une ligne cadencée, une matière à faible allongement évite ces dérives.",
            },
            {
                question: "Quelle matière pour les pâtes grasses ?",
                answer:
                    "Un revêtement polyuréthane ou une surface traitée anti-adhérente limite l'encrassement et se nettoie facilement, là où un tissu nu se charge rapidement en matière grasse.",
            },
            {
                question: "Assurez-vous le remplacement sur site ?",
                answer:
                    "Oui, pour les convoyeurs difficiles à démonter, nos techniciens se déplacent avec l'équipement de jonction nécessaire pour remplacer la bande en place.",
            },
        ],
    },
};

export default bandes;
