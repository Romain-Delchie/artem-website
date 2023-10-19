import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../context/AppContext'
import './AddProduct.scss'
import API from '../../utils/api/api';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function AddProduct() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [productToCreate, setProductToCreate] = useState({ id: 99, delivery_time: '0 jours', price: 0, stock: false });
    const [ranges, setRanges] = useState(null);
    useEffect(() => {

        API.range.getRanges().then((res) => {
            setRanges(res.data.ranges);
        }).catch((err) => {
            console.log(err);
        });


        // Écoutez l'événement de mouvement de la souris
        function handleMouseMove(e) {
            setPosition({ x: e.clientX + 10 + window.scrollX, y: e.clientY + 10 + window.scrollY });
        }

        // Ajoutez l'écouteur d'événement lorsque le composant est monté
        document.addEventListener('mousemove', handleMouseMove);

        // Nettoyez l'écouteur d'événement lorsque le composant est démonté
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const regex = /^\d+(\.\d{2})?$/;
    const isValidPrice = (inputPrice) => {
        const regex = /^\d+\.\d{2}$/;
        return regex.test(inputPrice);
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === 'price') {
            setProductToCreate({ ...productToCreate, [name]: Number(value) })
        } else if (name === 'stock' || name === 'active') {
            setProductToCreate({ ...productToCreate, [name]: event.target.checked })
        } else {
            setProductToCreate({ ...productToCreate, [name]: value })
        }
    }

    function handleProductSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        const reference = event.target.elements.reference.value;
        const name = event.target.elements.name.value;
        const designation = event.target.elements.designation.value;
        const description = event.target.elements.description.value;
        const image_link = event.target.elements.image_link.value;
        const brand = event.target.elements.brand.value;
        const length = event.target.elements.lengthProduct.value;
        const width = event.target.elements.width.value;
        const price = event.target.elements.price.value;
        const unit = event.target.elements.unit.value;
        const weight = event.target.elements.weight.value;
        const delivery_time = event.target.elements.stock.checked ? "0 jour" : event.target.elements.delivery_time.value;
        const stock = event.target.elements.stock.checked;
        const active = event.target.elements.active.checked;
        const range_id = event.target.elements.range_id.value;

        if (isValidPrice(price)) {
            const productData = {
                reference,
                name,
                designation,
                description,
                image_link,
                brand,
                length: Number(length),
                width: Number(width),
                price: Number(price),
                unit: Number(unit),
                weight: Number(weight),
                delivery_time: stock ? '0 jours' : delivery_time,
                stock,
                active,
                range_id: Number(range_id),
            };
            const keysEmpty = []
            Object.keys(productData).filter(key => key !== stock && key !== active).forEach((key) => { if (productData[key] === '') { keysEmpty.push(key) } })
            if (keysEmpty.length > 0) {
                alert(`Les champs ${keysEmpty.join(', ')} sont vides`);
            } else {
                API.product.create(user.token, productData).then((res) => {
                    setIsLoading(false);
                    alert('Le produit a bien été ajouté');
                }).catch((err) => {
                    setIsLoading(false);
                    alert('Erreur lors de la création du produit');
                }).finally(() => {
                    navigate('/dashboard');
                }
                );
            }
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
                        <input onChange={handleChange} type='text' name='reference' id='reference' placeholder='ex: MP_1040X755' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='name'>Nom du produit</label>
                        <input onChange={handleChange} type='text' name='name' id='name' placeholder='ex: manchon de façonneuse' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='designation'>Désignation sage</label>
                        <input onChange={handleChange} type='text' name='designation' id='designation' placeholder='ex: MANCHON PAIN BERTRAND ALLIANCE AV 1120 x 787' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='description'>Description</label>
                        <textarea onChange={handleChange} type='text' name='description' id='description' placeholder='ex: Manchon à pain laine épaisseur 6mm LD 1050 x 810 mm (côte intérieur) avant pour façonneuse PUMA de BERTRAND PUMA' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='lengthProduct'>Longueur en mm</label>
                        <input onChange={handleChange} type='number' name='lengthProduct' id='lengthProduct' placeholder='ex: 1210' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='width'>Largeur en mm</label>
                        <input onChange={handleChange} type='number' name='width' id='width' placeholder='ex: 480' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='image_link'>lien image</label>
                        <select onChange={handleChange} name="image_link" id="image_link">
                            <option value="mp.jpg">Manchon</option>
                            <option value="tl.jpg">Bavette, TR, TPV</option>
                            <option value="TE_recouv.jpg">TE à recouvrement</option>
                            <option value="TE_Bong.jpg">TE à sangles Bongard</option>
                            <option value="TE_cordon.jpg">TE à cordon</option>
                            <option value="arconet.jpg">Arconet</option>
                            <option value="arlin.jpg">Lin</option>
                            <option value="tdl_ourlet.jpg">TDL parisienne</option>
                            <option value="tdl_auto.jpg">TDL couche auto</option>
                            <option value="tb.jpg">Toile de Balancelle Velcros</option>
                            <option value="tb_ourlet.jpg">Toile de balancelle à ourlet</option>
                            <option value="tb_manche.jpg">Toile de balancelle à manche</option>
                            <option value="housse.jpg">housse à chariot</option>
                            <option value="manche.jpg">manche à farine</option>
                            <option value="bdeLam.jpg">tapis de laminoir</option>
                            <option value="ecarteuse.jpg">bande d'ecarteuse</option>
                            <option value="grille.jpg">grille</option>
                            <option value="peseuse.jpg">Tapis de peseuse</option>
                            <option value="tapis.jpg">Tapis de bouleuse</option>
                            <option value="transport.jpg">Tapis de transport</option>
                            <option value="trancheuse.jpg">Tapis de trancheuse</option>
                            <option value="arbake.jpg">Arbake</option>
                            <option value="bande-indus.jpg"> bande indus</option>
                            <option value="enfourneur.jpg">enfourneur</option>
                            <option value="ciseaux.jpg">Elevateur ciseaux</option>
                            <option value="colonne.jpg">Elevateur colonne</option>
                            <option value="colonneAuto.jpg">Elevateur colonne automatique</option>
                            <option value="integre.jpg">Elevateur intégré</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor='brand'>Marque</label>
                        <input onChange={handleChange} type='text' name='brand' id='brand' placeholder='ex: Bertrand Puma' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='price'>Prix</label>
                        <input onChange={handleChange} type='number' name='price' step='.01' id='price' placeholder='ex: 10.00 Mettre le T3' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='unit'>quantité unitaire</label>
                        <input onChange={handleChange} type='number' name='unit' id='unit' placeholder='ex: 1' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='weight'>poids</label>
                        <input onChange={handleChange} type='number' name='weight' step='.01' id='weight' placeholder='ex: 0.50' />
                    </div>
                    <div className="input-container">
                        <label htmlFor='delivery_time'>délai</label>
                        <input onChange={handleChange} type='text' name='delivery_time' id='delivery_time' placeholder='ex: 2 jours, mettre 0 jours si en stock' />
                    </div>
                    <div className="input-container input-container-stock">
                        <label htmlFor='stock'>stock</label>
                        <input type='checkbox' name='stock' checked={productToCreate.stock} id='stock' onChange={handleChange} />
                    </div>
                    <div className="input-container input-container-stock">
                        <label htmlFor='stock'>Actif</label>
                        <input type='checkbox' name='active' checked={productToCreate.active} id='active' onChange={handleChange} />
                    </div>
                    <div className="input-container">
                        <label htmlFor='range_id'>catégorie</label>
                        <select onChange={handleChange} name="Catégorie" id="range_id">
                            {ranges && ranges.map((range) => {
                                return <option value={range.id}>{range.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <button type='submit' className='add-product-form-btn'>Valider</button>
            </form>
            {
                productToCreate &&
                <div style={{ position: 'fixed', left: 50, top: 400 }}>
                    <ProductCard product={productToCreate} />
                </div>
            }

        </div>
    )
}