import priceData from "../../data/price-data"

const goodPrice = (profil, price) => {
    return profil === 1 ? (price * priceData.coeffBoulanger).toFixed(2) : price.toFixed(2);
}

export default goodPrice;