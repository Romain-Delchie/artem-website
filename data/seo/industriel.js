/**
 * Contenu SEO des gammes industrielles, chocolaterie-biscuiterie et services.
 * Voir data/seo/index.js pour la structure attendue de chaque entrée.
 */
const industriel = {
    "bande-entree-de-four": {
        published: false,
        title: "Bande entrée de four pour ligne industrielle",
        description:
            "Bande d'entrée de four haute température, acceptant les très petits diamètres d'enroulement. Sans fin ou agrafe nylon, adaptable Mecatherm, Werner, Kaak, Hein.",
        imageAlt:
            "Bande d'entrée de four pour ligne industrielle de boulangerie",
        sections: [
            {
                heading: "Une contrainte thermique extrême",
                paragraphs: [
                    "La bande d'entrée de four dépose les pâtons sur la sole d'un four industriel en marche. Elle subit un rayonnement direct et un choc thermique à chaque cycle, ce qui exclut tout revêtement plastique : seuls des tissus techniques haute température tiennent sur ce poste.",
                ],
            },
            {
                heading: "Le diamètre d'enroulement, critère déterminant",
                paragraphs: [
                    "Pour déposer les pâtons au ras de la sole, la bande doit s'enrouler sur un tambour de très faible diamètre. Toutes les matières n'en sont pas capables : une bande trop rigide se fissure en fatigue au bout de quelques semaines. Notre gamme est sélectionnée pour accepter les plus petits diamètres d'enroulement du marché.",
                    "Les bandes sont livrées sans fin ou avec agrafe nylon, cette dernière permettant un remplacement rapide sans démonter la ligne.",
                ],
            },
            {
                heading: "Compatibilité toutes marques",
                paragraphs: [
                    "Nos bandes s'adaptent sur les lignes Mecatherm, Werner, Kaak et Hein, ainsi que sur les autres constructeurs du marché. Nous couvrons également les postes de transport en amont et en aval du four.",
                ],
            },
        ],
        faq: [
            {
                question: "Pourquoi le diamètre d'enroulement est-il si important ?",
                answer:
                    "Pour déposer les pâtons au ras de la sole, la bande doit s'enrouler sur un tambour de très faible diamètre. Une matière trop rigide se fissure en fatigue en quelques semaines sur ce rayon.",
            },
            {
                question: "Sur quelles marques vos bandes d'entrée de four s'adaptent-elles ?",
                answer:
                    "Sur les lignes Mecatherm, Werner, Kaak et Hein, ainsi que sur les autres constructeurs du marché. Transmettez-nous la référence de la ligne et les cotes de la bande actuelle.",
            },
            {
                question: "Sans fin ou agrafe nylon ?",
                answer:
                    "L'agrafe nylon permet un remplacement rapide sans démonter la ligne, ce qui réduit fortement le temps d'arrêt. La version sans fin offre une surface continue et une durée de vie supérieure.",
            },
        ],
    },

    "bande-d-ecarteuse": {
        published: false,
        title: "Bande d'écarteuse en feutre laine ou coton PU",
        description:
            "Bande d'écarteuse en feutre laine standard, en coton à trame polyuréthane pour un allongement réduit, ou en surface PU nettoyable.",
        imageAlt:
            "Bande d'écarteuse en feutre laine sur ligne de boulangerie industrielle",
        sections: [
            {
                heading: "Le poste d'écartement",
                paragraphs: [
                    "L'écarteuse répartit les pâtons avant leur entrée dans le four ou dans le poste suivant. La bande doit entraîner les pâtons de façon parfaitement régulière : le moindre allongement différentiel se traduit par un espacement irrégulier et désorganise toute la ligne en aval.",
                ],
            },
            {
                heading: "Trois matières selon la contrainte",
                paragraphs: [
                    "Le feutre laine constitue le standard du poste : souple, il n'agresse pas le pâton. Le coton à trame polyuréthane apporte un allongement nettement réduit, ce qui stabilise l'espacement sur les lignes rapides. La surface polyuréthane nettoyable est retenue lorsque l'hygiène prime et que la bande doit être rincée fréquemment.",
                ],
            },
        ],
        faq: [
            {
                question: "Pourquoi une trame polyuréthane sur une bande coton ?",
                answer:
                    "La trame polyuréthane réduit fortement l'allongement de la bande. Sur une écarteuse rapide, cela stabilise l'espacement des pâtons et évite les réglages permanents des tendeurs.",
            },
            {
                question: "Quelle bande d'écarteuse pour un nettoyage fréquent ?",
                answer:
                    "La version à surface polyuréthane nettoyable se rince facilement, là où un feutre laine se charge et sèche mal.",
            },
            {
                question: "Le feutre laine reste-t-il pertinent ?",
                answer:
                    "Oui, il reste le standard du poste : sa souplesse n'agresse pas le pâton. Les alternatives se justifient sur les lignes rapides ou dans les environnements à contrainte d'hygiène renforcée.",
            },
        ],
    },

    transipat: {
        published: false,
        title: "Toile et tapis de Transipat sur mesure",
        description:
            "Toiles Transipat en lin ou lin-coton avec traitement hydrofuge, ou tapis polyuréthane lisse bleu. Fabrication à vos dimensions.",
        imageAlt:
            "Toile de Transipat en lin traité hydrofuge pour transfert de pâtons",
        sections: [
            {
                heading: "Le transfert des pâtons",
                paragraphs: [
                    "Le Transipat assure le transfert des pâtons entre deux postes sans les déformer. La surface de contact conditionne tout : trop lisse, le pâton glisse et se décentre ; trop absorbante, elle se charge d'humidité et finit par coller.",
                ],
            },
            {
                heading: "Lin traité ou polyuréthane",
                paragraphs: [
                    "Nous fabriquons à vos dimensions des toiles en lin ou en lin-coton avec traitement hydrofuge, qui conservent le toucher textile tout en limitant l'absorption. La version en tapis polyuréthane lisse bleu est retenue lorsque le nettoyage et la détectabilité priment sur le toucher.",
                ],
            },
        ],
        faq: [
            {
                question: "Toile lin ou tapis polyuréthane pour un Transipat ?",
                answer:
                    "La toile lin traitée hydrofuge conserve le toucher textile apprécié sur les pâtes délicates. Le polyuréthane lisse bleu se nettoie plus facilement et reste détectable en cas de fragment.",
            },
            {
                question: "À quoi sert le traitement hydrofuge ?",
                answer:
                    "Il limite l'absorption d'humidité par la fibre. La toile se charge moins, sèche plus vite et conserve ses propriétés antiadhérentes plus longtemps.",
            },
            {
                question: "Fabriquez-vous les toiles de Transipat sur mesure ?",
                answer:
                    "Oui, l'ensemble de nos toiles et tapis de Transipat est fabriqué aux dimensions de votre matériel.",
            },
        ],
    },

    "toile-de-balancelle": {
        published: false,
        title: "Toile de balancelle pour Werner, Kemper, Benier",
        description:
            "Toiles de balancelle bleues confectionnées ou à cadre plastique moulé, pour balancelles industrielles Werner, Kemper, Benier et autres marques.",
        imageAlt:
            "Toile de balancelle bleue à cadre plastique pour chambre de repos industrielle",
        sections: [
            {
                heading: "La chambre de repos industrielle",
                paragraphs: [
                    "Dans une chambre de repos à balancelles, chaque pâton attend son tour de façonnage dans une poche textile suspendue. La toile de balancelle doit rester souple pour épouser le pâton, résister à des milliers de cycles de basculement, et ne pas retenir la pâte au démoulage.",
                ],
            },
            {
                heading: "Confection ou cadre moulé",
                paragraphs: [
                    "Nous proposons nos toiles bleues en version confectionnée classique, ou montées sur cadre plastique moulé selon le système de fixation de votre installation. Le bleu est retenu ici pour sa détectabilité : un fragment de toile est immédiatement repérable sur la ligne.",
                    "Nos toiles équipent les balancelles industrielles Werner, Kemper, Benier et les autres marques du marché.",
                ],
            },
        ],
        faq: [
            {
                question: "Pourquoi les toiles de balancelle sont-elles bleues ?",
                answer:
                    "Le bleu n'existe pas dans les denrées alimentaires. Un fragment de toile détaché est donc immédiatement repérable sur la ligne, ce qu'exigent les plans de maîtrise sanitaire industriels.",
            },
            {
                question: "Toile confectionnée ou cadre plastique moulé ?",
                answer:
                    "Cela dépend du système de fixation de votre installation. Le cadre moulé se clipse directement sur la balancelle, la version confectionnée se fixe sur les supports d'origine.",
            },
            {
                question: "Quelles marques de balancelles équipez-vous ?",
                answer:
                    "Werner, Kemper, Benier et les autres marques du marché. Transmettez-nous la référence de votre chambre de repos.",
            },
        ],
    },

    manchon: {
        published: false,
        title: "Manchon tissé pour garnissage et façonnage",
        description:
            "Manchons tissés : faible diamètre en 2,5 mm d'épaisseur pour garnissage de rouleaux, grand développé en 3 à 5 mm pour transport et façonnage.",
        imageAlt:
            "Manchons tissés pour garnissage de rouleaux de façonneuse",
        sections: [
            {
                heading: "Deux familles de manchons",
                paragraphs: [
                    "Nos manchons tissés se répartissent en deux familles selon l'usage. Les manchons de faible diamètre, en épaisseur 2,5 mm, servent au garnissage des rouleaux : ils habillent le cylindre et lui donnent l'adhérence nécessaire pour entraîner la pâte sans l'arracher.",
                    "Les manchons de grand développé, en épaisseur 3 à 5 mm, travaillent en transport et en façonnage. Leur épaisseur supérieure leur donne la résistance nécessaire pour encaisser la tension et les passages répétés.",
                ],
            },
            {
                heading: "Choisir la bonne épaisseur",
                paragraphs: [
                    "L'épaisseur ne se choisit pas librement : elle conditionne le diamètre final du rouleau garni et donc le réglage de la machine. Relevez l'épaisseur du manchon usé avant de commander, ou transmettez-nous la référence de la machine.",
                ],
            },
        ],
        faq: [
            {
                question: "Quelle épaisseur de manchon choisir ?",
                answer:
                    "2,5 mm pour le garnissage de rouleaux de faible diamètre, 3 à 5 mm pour le transport et le façonnage. L'épaisseur conditionne le diamètre final du rouleau garni et donc le réglage machine : relevez celle du manchon usé.",
            },
            {
                question: "Comment mesurer un manchon à remplacer ?",
                answer:
                    "Relevez le diamètre du rouleau nu, le développé du manchon et son épaisseur. La référence de la machine permet souvent d'identifier directement le modèle.",
            },
            {
                question: "Fabriquez-vous des manchons sur mesure ?",
                answer:
                    "Oui, nos manchons tissés sont réalisés au diamètre, au développé et à l'épaisseur nécessaires à votre machine.",
            },
        ],
    },

    "bande-pour-chocolaterie": {
        published: false,
        title: "Bande pour chocolaterie en polyuréthane",
        description:
            "Bandes de chocolaterie en polyuréthane ambre, marron, bleu ou blanc, surface lisse ou à relief arlequin et rhomboïde. Confection sur mesure.",
        imageAlt:
            "Bande polyuréthane pour ligne de chocolaterie, surface à relief",
        sections: [
            {
                heading: "Les exigences de la chocolaterie",
                paragraphs: [
                    "Le chocolat impose deux contraintes propres : il fige au contact d'une surface froide et il est gras. La bande doit donc offrir un démoulage net sans laisser d'accroche, et résister durablement à la matière grasse. Le polyuréthane répond à ces deux exigences, ce qui explique sa domination sur ce secteur.",
                ],
            },
            {
                heading: "Couleurs et reliefs",
                paragraphs: [
                    "Notre gamme se compose principalement de bandes en polyuréthane de couleur ambre, marron, bleu ou blanc. La teinte ambre et la teinte marron sont traditionnelles en chocolaterie, le bleu répond aux exigences de détectabilité, le blanc au standard alimentaire général.",
                    "Les surfaces sont disponibles en lisse ou avec différents reliefs, notamment arlequin et rhomboïde, qui marquent le produit ou améliorent le décollement selon l'application.",
                ],
            },
        ],
        faq: [
            {
                question: "Pourquoi le polyuréthane en chocolaterie ?",
                answer:
                    "Il résiste durablement à la matière grasse du chocolat et offre un démoulage net, sans accroche, là où d'autres revêtements se chargent et retiennent le produit.",
            },
            {
                question: "À quoi servent les reliefs arlequin et rhomboïde ?",
                answer:
                    "Selon l'application, ils marquent volontairement la face inférieure du produit ou réduisent la surface de contact pour faciliter le décollement.",
            },
            {
                question: "Quelles couleurs de bande proposez-vous ?",
                answer:
                    "Ambre et marron, traditionnelles en chocolaterie, bleu pour les exigences de détectabilité, et blanc pour le standard alimentaire général.",
            },
        ],
    },

    "bande-pour-biscuiterie": {
        published: false,
        title: "Bande pour rotomouleuse de biscuiterie",
        description:
            "Bande pour rotomouleuse de biscuiterie : matières adaptées au démoulage de la pâte et à la tenue en cadence. Confection sur mesure toutes marques.",
        imageAlt:
            "Bande pour rotomouleuse de biscuiterie sur ligne de production",
        sections: [
            {
                heading: "La bande de rotomouleuse",
                paragraphs: [
                    "Sur une rotomouleuse, la bande assure le démoulage : c'est elle qui extrait la pâte des alvéoles du cylindre graveur. Elle travaille donc en contact pressé permanent et doit conjuguer une adhérence suffisante pour arracher la pâte du moule et une surface qui la relâche ensuite sans la déformer.",
                ],
            },
            {
                heading: "Matières et confection",
                paragraphs: [
                    "Nous sélectionnons la matière selon la recette et la cadence de votre ligne : la teneur en matière grasse de la pâte et la vitesse de production déterminent le compromis entre adhérence au démoulage et relâchement.",
                    "La confection est réalisée à vos dimensions, toutes marques de rotomouleuses. Décrivez-nous votre ligne et votre produit pour que nous vous orientions vers la référence adaptée.",
                ],
            },
        ],
        faq: [
            {
                question: "Comment choisir une bande de rotomouleuse ?",
                answer:
                    "Le choix dépend de la teneur en matière grasse de la pâte et de la cadence de la ligne. Ces deux paramètres déterminent le compromis entre adhérence au démoulage et relâchement du biscuit.",
            },
            {
                question: "La bande est-elle en cause si mes biscuits se déforment au démoulage ?",
                answer:
                    "Souvent, oui. Une bande usée ou mal adaptée relâche mal la pâte ou l'arrache trop tard. Vérifiez également la pression du cylindre presseur avant de conclure.",
            },
            {
                question: "Fabriquez-vous pour toutes les marques de rotomouleuses ?",
                answer:
                    "Oui, la confection est réalisée à vos dimensions, quelle que soit la marque. Transmettez-nous la référence de la ligne et les cotes de la bande actuelle.",
            },
        ],
    },

    "bande-pour-industrie-non-alimentaire": {
        published: false,
        title: "Bande transporteuse pour industrie non alimentaire",
        description:
            "Bandes transporteuses pour applications industrielles hors agroalimentaire : logistique, bois, recyclage, manutention. Confection et pose sur site.",
        imageAlt:
            "Bande transporteuse industrielle pour application de manutention",
        sections: [
            {
                heading: "Au-delà de l'agroalimentaire",
                paragraphs: [
                    "Notre savoir-faire en confection de bandes s'applique à l'ensemble des secteurs industriels : logistique et tri de colis, travail du bois, recyclage, manutention de vrac. Les contraintes y sont différentes de l'agroalimentaire : l'abrasion, les charges lourdes et les chocs remplacent les exigences d'hygiène.",
                ],
            },
            {
                heading: "Confection et pose",
                paragraphs: [
                    "Nous réalisons la mise à longueur, la jonction sans fin ou agrafée, la pose de profils de guidage, de tasseaux et de bords de contenance. Pour les convoyeurs difficiles à démonter, nos techniciens assurent la jonction directement sur votre site.",
                ],
            },
        ],
        faq: [
            {
                question: "Travaillez-vous en dehors de l'agroalimentaire ?",
                answer:
                    "Oui, nous fournissons des bandes transporteuses pour la logistique, le travail du bois, le recyclage et la manutention de vrac.",
            },
            {
                question: "Quelle bande pour un produit abrasif ?",
                answer:
                    "Il faut un revêtement à forte résistance à l'abrasion et une carcasse adaptée à la charge. Décrivez-nous la nature du produit, son poids et la configuration du convoyeur.",
            },
            {
                question: "Assurez-vous la pose sur site ?",
                answer:
                    "Oui, nos techniciens se déplacent avec l'équipement de jonction nécessaire pour les convoyeurs qui ne peuvent pas être démontés.",
            },
        ],
    },

    "jonction-de-bande-sur-site": {
        published: false,
        title: "Jonction de bande sur site par nos techniciens",
        description:
            "Service de jonction de bande sur site : nos techniciens interviennent chez vous avec l'équipement complet pour remplacer les bandes de convoyeurs non démontables.",
        imageAlt:
            "Technicien réalisant une jonction de bande transporteuse sur site",
        sections: [
            {
                heading: "Pour les convoyeurs non démontables",
                paragraphs: [
                    "Tous les convoyeurs ne peuvent pas être démontés : bâti soudé, intégration dans une ligne, accès impossible. Dans ces cas, la bande doit être posée en place et jointée sur site, une opération qui exige un matériel de jonction spécifique et un savoir-faire précis.",
                ],
            },
            {
                heading: "Notre intervention",
                paragraphs: [
                    "Nos techniciens se déplacent chez vous avec l'ensemble de l'équipement nécessaire pour déposer l'ancienne bande, mettre la nouvelle à longueur et réaliser la jonction. Une jonction mal exécutée se traduit par une bande qui dérive ou qui casse en quelques semaines : c'est précisément l'intervention où l'expérience se voit.",
                    "Contactez-nous pour organiser l'intervention, en précisant le type de convoyeur, la nature de la bande et vos contraintes d'arrêt de production.",
                ],
            },
        ],
        faq: [
            {
                question: "Dans quels cas la jonction sur site est-elle nécessaire ?",
                answer:
                    "Dès que le convoyeur ne peut pas être démonté : bâti soudé, intégration dans une ligne ou accès impossible. La bande est alors posée en place et jointée sur site.",
            },
            {
                question: "Combien de temps dure une intervention ?",
                answer:
                    "Cela dépend du type de jonction et de l'accessibilité du convoyeur. Indiquez-nous vos contraintes d'arrêt de production lors de la prise de contact pour que nous organisions l'intervention en conséquence.",
            },
            {
                question: "Intervenez-vous partout en France ?",
                answer:
                    "Nos techniciens se déplacent sur l'ensemble du territoire. Contactez-nous en précisant le type de convoyeur et la nature de la bande à remplacer.",
            },
        ],
    },

    "montage-d-elevateur-enfourneur": {
        published: false,
        title: "Montage d'élévateur enfourneur en fournil",
        description:
            "Installation et réglage d'élévateurs enfourneurs par nos techniciens : modèles intégrés, colonne, ciseaux. Intervention dans votre fournil.",
        imageAlt:
            "Technicien installant un élévateur enfourneur dans un fournil",
        sections: [
            {
                heading: "Une installation qui conditionne tout",
                paragraphs: [
                    "Un élévateur enfourneur mal réglé enfourne de travers, force sur la toile et fatigue prématurément l'ensemble du mécanisme. La mise en service ne se limite pas à la pose : elle comprend l'alignement sur le four, le réglage des courses par voie, la tension de la toile et le contrôle des sécurités.",
                ],
            },
            {
                heading: "Notre prestation",
                paragraphs: [
                    "Nos techniciens se déplacent dans votre fournil pour installer tout type d'élévateur enfourneur, qu'il soit intégré, à colonne ou à ciseaux, et prennent en charge l'ensemble des réglages jusqu'à la mise en production.",
                ],
            },
        ],
        faq: [
            {
                question: "Quels types d'élévateurs installez-vous ?",
                answer:
                    "Tous les types : élévateurs intégrés, à colonne, à colonne automatique et à ciseaux, quelle que soit la configuration du fournil.",
            },
            {
                question: "Que comprend le montage ?",
                answer:
                    "La pose, l'alignement sur le four, le réglage des courses par voie, la tension de la toile et le contrôle des sécurités, jusqu'à la mise en production.",
            },
            {
                question: "Pourquoi ne pas installer l'élévateur soi-même ?",
                answer:
                    "Un élévateur mal réglé enfourne de travers, force sur la toile et fatigue prématurément le mécanisme. Le réglage initial conditionne la durée de vie de l'ensemble.",
            },
        ],
    },
};

export default industriel;
