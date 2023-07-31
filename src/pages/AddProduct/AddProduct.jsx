import { useState, useContext } from 'react'
import AppContext from '../../context/AppContext'
import './AddProduct.scss'
import API from '../../utils/api/api';

export default function AddProduct() {

    const { user } = useContext(AppContext);

    const [stockChecked, setStockChecked] = useState(false);

    const regex = /^\d+(\.\d{2})?$/;
    const isValidPrice = (inputPrice) => {
        const regex = /^\d+\.\d{2}$/;
        return regex.test(inputPrice);
    };

    const handleStockCheckboxChange = (event) => {
        setStockChecked(event.target.checked);
    };

    function handleProductSubmit(event) {
        event.preventDefault();
        const reference = event.target.elements.reference.value;
        const name = event.target.elements.name.value;
        const designation = event.target.elements.designation.value;
        const description = event.target.elements.description.value;
        const image_link = event.target.elements.image_link.value;
        const brand = event.target.elements.brand.value;
        const price = event.target.elements.price.value;
        const unit = event.target.elements.unit.value;
        const weight = event.target.elements.weight.value;
        const delivery_time = event.target.elements.delivery_time.value;
        const stock = stockChecked
        const range_id = event.target.elements.range_id.value;

        if (isValidPrice(price)) {
            const productData = {
                reference,
                name,
                designation,
                description,
                image_link,
                brand,
                price,
                unit,
                weight,
                delivery_time,
                stock,
                range_id,
            };
            console.log(productData);
            API.product.create(user.token, productData);
            alert('Le produit a bien été ajouté');

        } else {
            alert('Le prix doit être un nombre avec 2 décimales');
        }
    }

    return (
        <div className='add-product'>
            <h2>Ajouter un produit</h2>
            <form className='add-product-form' onSubmit={handleProductSubmit}>
                <div className='add-product-form-container'>
                    <div className="input-container">
                        <label htmlFor='reference'>Référence Artem</label>
                        <input type='text' id='reference' placeholder='ex: MP_1040X755' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='name'>Nom du produit</label>
                        <input type='text' id='name' placeholder='ex: manchon de façonneuse' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='designation'>Désignation sage</label>
                        <input type='text' id='designation' placeholder='ex: MANCHON PAIN BERTRAND ALLIANCE AV 1120 x 787' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='description'>Description</label>
                        <textarea type='text' id='description' placeholder='ex: Manchon à pain laine épaisseur 6mm LD 1050 x 810 mm (côte intérieur) avant pour façonneuse PUMA de BERTRAND PUMA' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='image_link'>lien image</label>
                        <select name="img-link" id="image_link">
                            <option value="mp.jpg">Manchon</option>
                            <option value="tl.jpg">Bavette</option>
                            <option value="TE_recouv.jpg">TE à recouvrement</option>
                            <option value="TE_Bong.jpg">TE à sangles Bongard</option>
                            <option value="TE_cordon.jpg">TE à cordon</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor='brand'>Marque</label>
                        <input type='text' id='brand' placeholder='ex: Bertrand Puma' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='price'>Prix</label>
                        <input type='number' step='.01' id='price' placeholder='ex: 10.00 Mettre le T3' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='unit'>quantité unitaire</label>
                        <input type='number' id='unit' placeholder='ex: 1' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='weight'>poids</label>
                        <input type='number' step='.01' id='weight' placeholder='ex: 0.50' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='delivery_time'>délai</label>
                        <input type='text' id='delivery_time' placeholder='ex: 2 jours, mettre 0 jours si en stock' />
                    </div>
                    <div className="input-container input-container-stock">
                        <label htmlFor='stock'>stock</label>
                        <input type='checkbox' checked={stockChecked} id='stock' onChange={handleStockCheckboxChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor='range_id'>catégorie</label>
                        <select name="Catégorie" id="range_id">
                            <option value="1">Toile enfourneur</option>
                            <option value="2">Toile de couche</option>
                            <option value="3">Tapis de façonneuse</option>
                        </select>
                    </div>
                </div>
                <button type='submit' className='add-product-form-btn'>Valider</button>
            </form>
        </div>
    )
}