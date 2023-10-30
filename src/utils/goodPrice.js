
const goodPrice = (profil, product, quantity = 20) => {
    const coeffProd = product.reference.startsWith('TB') && quantity < 20 ? 1.1 : 1;
    const calculatedPrice = profil !== 2 ? (product.price * product.coeff) : product.price;
    return calculatedPrice < product.minPrice ? (product.minPrice * coeffProd).toFixed(2) : (calculatedPrice * coeffProd).toFixed(2);
}

export default goodPrice;