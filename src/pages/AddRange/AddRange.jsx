import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'

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
        formData.append('coeff', e.target.elements.coeff.value);
        try {
            const response = API.upload.image(user.token, formData)
            // Une fois le fichier téléversé, vous pouvez effectuer d'autres actions, comme ajouter des données dans votre base de données.
        } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'envoi du fichier :', error);
        } finally {
            formData.delete('image');
            setIsLoading(false);
            API.range.create(user.token, formData).then((res) => {
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
        <div className='add-product'>
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
                        <label htmlFor="coeff">Coeff</label>
                        <input type='number' step="0.01" name='coeff' id='coeff' placeholder='ex: 2.5' />
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
        </div>
    )
}