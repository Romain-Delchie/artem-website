const artemData = {
    name: 'ARTEM',
    tel: '+33 1 64 11 00 33',
    fax: '+33 1 64 11 32 09',
    site: 'www.artem-fr.com',
    email: 'com@artem-fr.com',
    adress: '16 rue de Berlin',
    address2: "Innovespace Val d'Europe 2",
    postalCode: '77144',
    city: 'Montévrain',
    siret: '32280421200056',
    NAF: '4669B',
    intracom: 'FR53 3228042',
    slogan: 'Bandes transporteuses et textiles',
    clicli: 6,
    tansportFunction: (weight) => {
        if (weight === 0) {
            return 0;
        } else if (weight < 1.8) {
            return 18;
        } else if (weight < 4.8) {
            return 20;
        } else if (weight < 9.8) {
            return 24;
        } else if (weight < 14.7) {
            return 29;
        } else if (weight < 29.7) {
            return 39;
        } else {
            return "Nous consulter";
        }
    }
}

export default artemData;