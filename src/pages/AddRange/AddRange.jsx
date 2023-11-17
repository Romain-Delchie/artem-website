import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import '../AddProduct/AddProduct.scss'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'

export default function AddRange() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleRangeSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData();
        const fileInput = e.target.elements.image.files[0]; // Récupérer le fichier à partir de l'input file
        formData.append('image', fileInput);
        formData.append('name', e.target.elements.name.value);
        formData.append('description', e.target.elements.description.value);
        formData.append('image_link', e.target.elements.image_link.value);
        formData.append('category', e.target.elements.category.value);
        formData.append('minPrice', e.target.elements.minPrice.value);

        if (
            !fileInput ||
            !formData.get('name') ||
            !formData.get('description') ||
            !formData.get('image_link') ||
            !formData.get('category') ||
            !formData.get('minPrice')
        ) {
            alert('Veuillez remplir tous les champs requis.');
            setIsLoading(false);
            return;
        }

        if (fileInput.name !== formData.get('image_link')) {
            alert('ATTENTION: le nom du fichier doit être strictement identique à "lien image" ci-dessus');
            setIsLoading(false);
            return;
        }
        if (fileInput.size > 100000) {
            alert('ATTENTION: le fichier doit être le moins lourd possible (moins de 100 ko si possible)');
            setIsLoading(false);
            return;
        }

        try {
            const response = API.upload.image(user.token, formData)
            // Une fois le fichier téléversé, vous pouvez effectuer d'autres actions, comme ajouter des données dans votre base de données.
        } catch (error) {
            alert('Une erreur s\'est produite lors de l\'envoi du fichier :', error);

        } finally {
            formData.delete('image');
            setIsLoading(false);
            API.range.create(user.token, formData).then((res) => {
                alert('Gamme ajoutée avec succès');
                navigate('/products');
            }
            ).catch((err) => {
                console.error(err);
            }
            );
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <main className='add-product'>
            <DashboardComponent />
            <h2>Ajouter une gamme</h2>
            <form className="add-product-form" onSubmit={handleRangeSubmit}>
                <div className='add-product-form-container'>
                    <div className="input-container">
                        <label htmlFor="name">Nom</label>
                        <input type="text" name='name' id='name' placeholder='ex: Toile enfourneur' />
                    </div>
                    <div className="input-container">
                        <label htmlFor="description">Description</label>
                        <input type='textarea' name='description' id='description' placeholder='ex: Découvrez nos toiles enfourneur en coton de qualité supérieur,...' />
                    </div>
                    <div className="input-container">
                        <label htmlFor="image_link">lien image</label>
                        <input type='text' name='image_link' id='image_link' placeholder='ex: TE.jpg' />
                    </div>
                    <div className="input-container">
                        <label htmlFor="category">Catégorie</label>
                        <select name="category" id="category">
                            <option value="textile">textile</option>
                            <option value="bande">bande</option>
                            <option value="autre">autre</option>
                            <option value="meca">meca</option>
                            <option value="indus">indus</option>
                            <option value="service">service</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor="minPrice">Prix minimum boulanger</label>
                        <input type='number' step="0.01" name='minPrice' id='minPrice' placeholder='ex: 120.00 (2chiffres après la virgule)' />
                    </div>
                    <div className="input-container">
                        <label htmlFor="image">Fichier image</label>
                        <input type='file' name='image' id='image' />
                        <p>ATTENTION: le nom du fichier doit être strictement identique à "lien image" ci-dessus</p>
                        <p>Le fichier doit être le moins lourd possible (moins de 100 ko si possible)</p>
                        <p>Outils en ligne simple pour réduire le poids de la photo en 2 cliques : https://squoosh.app/</p>
                    </div>
                </div>
                <button type='submit' className='add-product-form-btn'>Valider</button>
            </form>
        </main>
    )
}