import ContactRedesign from './ContactRedesign'

/**
 * Page « Contact ».
 *
 * La refonte est validée : cette page n'est plus qu'un point d'entrée vers
 * elle. Le rendu précédent — formulaire et coordonnées empilés sur une
 * photographie de fond — a été retiré d'ici ; `ContactRedesign` conserve le
 * formulaire d'envoi, les coordonnées et les données structurées de l'entreprise.
 */
export default function Contact() {
    return <ContactRedesign />
}
