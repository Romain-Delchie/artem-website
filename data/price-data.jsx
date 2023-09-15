const priceData = {

    cordon: (length, nbOeillets) => {
        const TB = 0.1
        const TF = 0.45
        const TS = 0.035
        const TO = 0.0125
        const TFO = 0.02
        const TPO = 0.0033
        const PRO = 0.1
        const H = 30.5
        const lengthInM = length / 1000
        const PA = 7
        const coef = 2.8
        const result = (((TF + TO * (lengthInM + 0.2) * 1.05 + (TFO + TPO * nbOeillets)) * H) + ((lengthInM + 0.2) * 1.05 * PA / 2 + 0.1 * nbOeillets + 0.6 + 2)) * coef
        const valeurSuperieure = Math.ceil(result * 2) / 2;
        const valeurInferieure = Math.floor(result * 2) / 2;
        if (result - valeurInferieure < valeurSuperieure - result) {
            return valeurInferieure;
        } else {
            return valeurSuperieure;
        }
    },
    barre: (length, nbOeillets) => {
        const TB = 0.1
        const TF = 0.45
        const TS = 0.035
        const TO = 0.0125
        const TFO = 0.02
        const TPO = 0.0033
        const PRO = 0.1
        const H = 30.5
        const lengthInM = length / 1000
        const PA = 7
        const coef = 2.8
        const result = (((TF + TO * (lengthInM + 0.2) * 1.05 + (TFO + TPO * nbOeillets)) * H) + ((lengthInM + 0.2) * 1.05 * PA / 2 + 0.1 * nbOeillets)) * coef
        const valeurSuperieure = Math.ceil(result * 2) / 2;
        const valeurInferieure = Math.floor(result * 2) / 2;
        if (result - valeurInferieure < valeurSuperieure - result) {
            return valeurInferieure;
        } else {
            return valeurSuperieure;
        }
    },
    sangle: (length, nbSangles, nbOeillets) => {
        const TB = 0.1
        const TF = 0.45
        const TS = 0.035
        const TO = 0.0125
        const TFO = 0.02
        const TFOS = 0.06
        const TPO = 0.0033
        const TPOS = 0.0025
        const PRO = 0.1
        const H = 30.5
        const lengthInM = length / 1000
        const PA = 7
        const coef = 2.8
        const oeilletOrNot = nbOeillets > 0 ? 1 : 0
        const result = (((TF + TO * (lengthInM + 0.2) * 1.05 + ((TFO + TPO * nbOeillets) * oeilletOrNot) + TS * nbSangles) * H) + ((lengthInM + 0.2) * 1.05 * PA / 2 + 0.1 * nbOeillets + (0.3 + 0.55 * (lengthInM + 0.2) * 1.05) * nbSangles)) * coef
        console.log(result);
        const valeurSuperieure = Math.ceil(result * 2) / 2;
        const valeurInferieure = Math.floor(result * 2) / 2;
        if (result - valeurInferieure < valeurSuperieure - result) {
            return valeurInferieure;
        } else {
            return valeurSuperieure;
        }
    }
}


export default priceData