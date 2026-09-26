# Mise en production et référencement

## Construire le site

```bash
npm run build
```

Cette commande enchaîne trois étapes :

1. **`generate-sitemap`** interroge l'API, écrit `public/sitemap.xml` et
   `deploy/redirects-gammes.map`.
2. **`build:app`** produit le bundle Vite dans `dist/`.
3. **`prerender`** ouvre chaque page publique dans un navigateur sans interface
   et écrit le HTML obtenu dans `dist/<chemin>/index.html`.

Les étapes sont aussi disponibles séparément (`npm run generate-sitemap`,
`npm run build:app`, `npm run prerender`).

### Configuration de l'URL de l'API

L'URL de l'API vit dans les fichiers `.env`, sous la variable `VITE_API_URL`.
Vite choisit le fichier selon la commande, il n'y a donc rien à basculer à la
main avant une mise en production :

| Fichier            | Chargé par        | Valeur                            |
| ------------------ | ----------------- | --------------------------------- |
| `.env.development` | `npm run dev`     | `http://localhost:3000/api/`      |
| `.env`             | `npm run build`   | `https://www.artem-fr.com/api/`   |
| `.env.local`       | les deux, en priorité | surcharge personnelle, non versionnée |

Les scripts de build lisent ces mêmes fichiers, si bien que le site, le sitemap
et le pré-rendu visent toujours la même API. Pour viser l'instance locale
pendant un build sur le serveur, ce qui est plus rapide et évite un aller-retour
par le réseau :

```bash
ARTEM_API_URL=http://localhost:3000/api npm run build
```

`ARTEM_API_URL` ne concerne que les scripts de build. L'URL compilée dans
l'application reste celle de `VITE_API_URL`, ce qui est bien le comportement
voulu : le navigateur d'un visiteur ne peut pas appeler `localhost`.

### L'API doit être joignable pendant le build

Si l'API ne répond pas, `generate-sitemap` interrompt le build avec un message
explicite. Le pré-rendu, lui, n'échoue pas : il signale les pages qu'il n'a pas
pu rendre, et celles-ci restent servies en rendu navigateur.

Après un build, une vérification rapide que l'URL compilée est la bonne :

```bash
grep -o "https://www.artem-fr.com/api/" dist/assets/index-*.js
```

## Déployer

```bash
rsync -av --delete dist/ /var/www/artem/dist/
sudo cp deploy/redirects-gammes.map /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx
```

`redirects-gammes.map` doit être recopié à chaque build où une gamme a été
ajoutée, renommée ou supprimée : c'est lui qui porte les redirections 301 des
anciennes URLs `/gamme/:id/:nom` vers les nouvelles URLs en slug.

## Configuration nginx

Voir `deploy/nginx-artem.conf`. Trois points y sont déterminants pour le
référencement :

- la table `map` de redirections 301 des anciennes URLs de gammes ;
- la chaîne de certificats complète (`fullchain`), aujourd'hui incomplète sur le
  serveur, ce qui fait échouer une partie des robots ;
- la directive `try_files $uri $uri/index.html $uri/ /index.html`, qui sert les
  pages pré-rendues en priorité et ne retombe sur l'application React que si
  aucune n'existe.

## Après la mise en ligne

1. Dans la Search Console, soumettre à nouveau `https://www.artem-fr.com/sitemap.xml`.
2. Utiliser l'outil d'inspection d'URL sur deux ou trois pages gamme pour
   vérifier que Google voit bien le nouveau titre et le contenu.
3. Contrôler les données structurées sur
   [validator.schema.org](https://validator.schema.org/) avec une URL de gamme.
4. Surveiller le rapport « Couverture » pendant quelques semaines : les
   anciennes URLs doivent progressivement basculer en « Redirection ».

## Ajouter du contenu à une nouvelle gamme

Le contenu éditorial des pages gamme vit dans `data/seo/`, indexé par le slug
de la gamme (`data/seo/index.js` décrit la structure attendue). Une gamme
absente de ces fichiers reste parfaitement fonctionnelle : sa page retombe sur
le nom et la description stockés en base, sans contenu enrichi ni FAQ.

## Faire relire un texte avant sa mise en ligne

Une entrée marquée `published: false` peut être commitée et déployée sans
apparaître sur le site. Les visiteurs et les moteurs de recherche voient la page
inchangée ; un administrateur connecté, lui, voit le texte en place, signalé par
un bandeau d'aperçu. La relecture se fait donc sur les pages réelles.

Cet aperçu ne présente aucun risque de référencement : le pré-rendu et les
robots d'indexation s'exécutent sans session, et ne reçoivent donc que le
contenu validé. C'est vérifiable après un build :

```bash
grep -rl "Questions fréquentes" dist/gamme/ | wc -l
```

Le décompte doit correspondre au nombre de gammes publiées, et aucune page en
attente ne doit y figurer.

Les textes des dix gammes de `data/seo/bandes.js` sont actuellement dans cet
état. Pour en publier un, passez son `published` à `true` — ou retirez la ligne
— puis relancez `npm run build`.
