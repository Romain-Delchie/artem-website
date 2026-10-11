import CompanyRedesign from './CompanyRedesign'

/**
 * Page « Notre entreprise ».
 *
 * La refonte est validée : cette page n'est plus qu'un point d'entrée vers
 * elle. Le rendu précédent — paragraphes justifiés autour de vignettes rondes
 * et historique en liste à puces — a été retiré d'ici ; `CompanyRedesign`
 * reprend le même texte, les mêmes photographies et les mêmes balises.
 */
export default function Company() {
    return <CompanyRedesign />
}
