import './AddProduct.scss'

export default function AddProduct() {
    return (
        <div className='add-product'>
            <h2>Ajouter un produit</h2>
            <form className='add-product-form'>
                <div className='add-product-form-container'>
                    <label htmlFor='reference'>Référence Artem</label>
                    <input type='text' id='reference' placeholder='ex: MP_1040X755' />
                    <label htmlFor='name'>Nom du produit</label>
                    <input type='text' id='name' placeholder='ex: manchon de façonneuse' />
                    <label htmlFor='designation'>Désignation sage</label>
                    <input type='text' id='designation' placeholder='ex: MANCHON PAIN BERTRAND ALLIANCE AV 1120 x 787' />
                    <label htmlFor='description'>Description</label>
                    <textarea type='text' id='description' placeholder='ex: Manchon à pain laine épaisseur 6mm LD 1050 x 810 mm (côte intérieur) avant pour façonneuse PUMA de BERTRAND PUMA' />
                    <label htmlFor='image_link'>lien image</label>
                    <select name="img-link" id="image_link">
                        <option value="mp.jpg">Manchon</option>
                        <option value="tl.jpg">Bavette</option>
                        <option value="TE_recouv.jpg">TE à recouvrement</option>
                        <option value="TE_Bong.jpg">TE à sangles Bongard</option>
                        <option value="TE_cordon.jpg">TE à cordon</option>

                    </select>
                    <label htmlFor='brand'>Marque</label>
                    <input type='text' id='brand' placeholder='ex: Bertrand Puma' />
                    <label htmlFor='price'>Prix</label>
                    <input type='number' step='.01' id='price' placeholder='ex: 10.00 Mettre le T3' />
                    <label htmlFor='unit'>quantité unitaire</label>
                    <input type='number' id='unit' placeholder='ex: 1' />
                    <label htmlFor='weight'>poids</label>
                    <input type='number' step='.01' id='weight' placeholder='ex: 0.50' />
                    <label htmlFor='delivery_time'>délai</label>
                    <input type='text' id='delivery_time' placeholder='ex: 2 jours, mettre 0 jours si en stock' />
                    <label htmlFor='stock'>stock</label>
                    <input type='checkbox' id='stock' />
                    <label htmlFor='range_id'>catégorie</label>
                    <select name="Catégorie" id="range_id">
                        <option value="1">Toile enfourneur</option>
                        <option value="2">Toile de couche</option>
                        <option value="3">Tapis de façonneuse</option>
                    </select>

                </div>
            </form>
        </div>
    )
}