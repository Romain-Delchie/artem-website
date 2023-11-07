import { useEffect, useContext, useState } from 'react'
import './AddTechsheet.scss'
import API from '../../utils/api/api'
import AppContext from '../../context/AppContext'
import Loading from '../../components/Loading/Loading'

export default function AddTechsheet() {

    const { user } = useContext(AppContext);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Ajouter un état pour savoir si les données sont chargées ou non
    const [techsheets, setTechsheets] = useState(null);
    const [ranges, setRanges] = useState(null);
    const [rangeHasTechsheets, setRangeHasTechsheets] = useState(null);
    const [pdfSended, setPdfSended] = useState(false);
    const [rangeIdToDeleteLink, setRangeIdToDeleteLink] = useState(null);
    const [techsheetToDelete, setTechsheetToDelete] = useState(null);

    useEffect(() => {
        API.techsheet.getTechsheets(user.token).then((res) => {
            setTechsheets(res.data.techsheets);
        }).catch((err) => {
            console.error(err);
        }
        );

        API.range.getRanges(user.token).then((res) => {
            setRanges(res.data.ranges);
        }
        ).catch((err) => {
            console.error(err);
        }
        );

        API.rangeHasTechsheet.getRangeHasTechsheets(user.token).then((res) => {
            setRangeHasTechsheets(res.data.rangeHasTechsheets);
        }
        ).catch((err) => {
            console.error(err);
        }
        );
        if (!techsheets && !ranges && !rangeHasTechsheets) {
            setIsDataLoaded(true);
        }
    }, [pdfSended]);

    useEffect(() => {
        if (rangeIdToDeleteLink && rangeHasTechsheets && techsheets) {
            setTechsheetToDelete(rangeHasTechsheets.filter((rangeHasTechsheet) =>
                rangeHasTechsheet.range_id === Number(rangeIdToDeleteLink)).map((rangeHasTechsheet) => {
                    return techsheets.find((techsheet) => techsheet.id === rangeHasTechsheet.techSheet_id);
                }))


        }
    }, [rangeIdToDeleteLink])


    const handleSubmitPdf = (e) => {
        e.preventDefault();
        setIsDataLoaded(false);
        if (!e.target.name.value || !e.target.pdf.files[0]) {
            alert('Veuillez remplir tous les champs');
            setIsDataLoaded(true);
            return;
        }
        const data = new FormData();
        const fileName = e.target.pdf.files[0].name;
        const cleanedFileName = fileName.replace('.pdf', '');
        if (techsheets.find((techsheet) => techsheet.link === cleanedFileName)) {
            alert('Ce nom de fiche technique existe déjà');
            setIsDataLoaded(true);
            return;
        }
        data.append('name', e.target.name.value);
        data.append('link', cleanedFileName);
        data.append('pdf', e.target.pdf.files[0]);
        API.upload.pdf(user.token, data).then((res) => {
            data.delete('pdf');
            console.log(data);
            API.techsheet.create(user.token, data).then((res) => {
                alert('La fiche technique a bien été ajoutée');
                setIsDataLoaded(true);
                setPdfSended(!pdfSended);
            }
            ).catch((err) => {
                console.error(err);
            }
            )
        }
        ).catch((err) => {
            console.error(err);
        })
    }

    const handleSubmitLink = (e) => {
        e.preventDefault();
        setIsDataLoaded(false);
        if (e.target.techsheet.value === 'none' || e.target.range.value === 'none') {
            alert('Veuillez choisir une FT et une gamme de produit');
            setIsDataLoaded(true);
            return;
        }

        const data = new FormData();
        data.append('techsheet_id', e.target.techsheet.value);
        data.append('range_id', e.target.range.value);
        data.append('name', e.target.name.value);

        API.rangeHasTechsheet.create(user.token, data).then((res) => {
            alert('Le lien a bien été créé');
            setPdfSended(!pdfSended);
        }
        ).catch((err) => {
            console.error(err);
            if (err.response.data.error.includes('Duplicate entry')) {
                alert('Ce lien existe déjà');
            }
            setIsDataLoaded(true);
        }
        )
    }

    const handleChangeRangeToDeleteLink = (e) => {
        setRangeIdToDeleteLink(e.target.value);

    }

    const handleSubmitDeleteLink = (e) => {
        e.preventDefault();
        setIsDataLoaded(false);
        if (!e.target.range_id.value || e.target.range_id.value === 'none' || !e.target.techSheet_id.value || e.target.techSheet_id.value === 'none') {
            alert('Veuillez choisir une FT et une gamme de produit');
            setIsDataLoaded(true);
            return;
        }
        const data = { range_id: Number(e.target.range_id.value), techSheet_id: Number(e.target.techSheet_id.value) };
        API.rangeHasTechsheet.delete(user.token, data).then((res) => {
            alert('Le lien a bien été supprimé');
            setPdfSended(!pdfSended);
        }
        ).catch((err) => {
            console.error(err);
            if (err.response.status === 404) {
                alert('Ce lien n\'existe pas ou plus');
            }
            setIsDataLoaded(true);
        }
        );
    }

    const handleSubmitDeletePdf = (e) => {
        e.preventDefault();
        setIsDataLoaded(false);
        if (!e.target.techSheet_id.value || e.target.techSheet_id.value === 'none') {
            alert('Veuillez choisir une FT');
            setIsDataLoaded(true);
            return;
        }
        const link = techsheets.find((techsheet) => techsheet.id === Number(e.target.techSheet_id.value)).link;
        const filename = `${link}.pdf`;
        const id = Number(e.target.techSheet_id.value);
        console.log(e.target.techSheet_id.value);
        console.log(filename);
        console.log(id);
        API.upload.delete(user.token, filename).then((res) => {

            API.techsheet.delete(user.token, id).then((res) => {
                setIsDataLoaded(true);
                setPdfSended(!pdfSended);
            }
            ).catch((err) => {
                console.error(err);
                if (err.response.status === 404) {
                    alert('Cette fiche technique n\'existe pas ou plus');
                }
                setIsDataLoaded(true);
            }
            );
            alert('La fiche technique a bien été supprimée');
        }
        ).catch((err) => {
            console.error(err);
            if (err.response.status === 404) {
                alert('Cette fiche technique n\'existe pas ou plus');
            }
            setIsDataLoaded(true);
        }
        );
    }

    if (!isDataLoaded) {
        return <Loading />
    }

    return (
        <div className='add-techsheet'>
            <h2>Ajouter une fiche technique dans la base de données</h2>
            <form className='add-techsheet-form' onSubmit={handleSubmitPdf}>

                <div className="add-techsheet-form-item">
                    <label htmlFor="name">Nom de la FT</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="add-techsheet-form-item">
                    <label htmlFor="pdf">Fiche technique</label>
                    <input type="file" name="pdf" id="pdf" />
                </div>
                <button type="submit">Ajouter</button>
            </form>


            <h2>Lier une fiche technique à une gamme de produit</h2>
            <form className='add-techsheet-form' onSubmit={handleSubmitLink}>
                <div className="add-techsheet-form-item">
                    <label htmlFor="techsheet">Fiche technique</label>
                    <select name="techsheet" id="techsheet" defaultValue="none">
                        <option value="none" disabled>Choisissez une fiche technique</option>
                        {techsheets && techsheets.map((techsheet) => {
                            return <option key={techsheet.id} value={techsheet.id}>{techsheet.name}</option>
                        })}
                    </select>
                </div>
                <div className="add-techsheet-form-item">
                    <label htmlFor="range">Gamme de produit</label>
                    <select name="range" id="range" defaultValue="none">
                        <option value="none" disabled>Choisissez une gamme de produit</option>
                        {ranges && ranges.map((range) => {
                            return <option key={range.id} value={range.id}>{range.name}</option>
                        }
                        )}
                    </select>
                </div>
                <div className="add-techsheet-form-item">
                    <label htmlFor="name">Sous-titre (ecrire lavable dans le texte pour afficher la brosse de nettoyage)</label>
                    <input type="text" name="name" id="name" placeholder='ex: renforcé lavable (dans arcotEM80-toile enfourneur)' />
                </div>
                <button type="submit">Ajouter</button>
            </form>
            <h2>Supprimer un lien entre une fiche technique et une gamme de produit</h2>
            <form className="add-techsheet-form" onSubmit={handleSubmitDeleteLink}>
                <div className="add-techsheet-form-item">
                    <label htmlFor="range_id">Gamme de produit</label>
                    <select name="range_id" id="range_id" defaultValue='none' onChange={handleChangeRangeToDeleteLink}>
                        <option value="none" disabled>Choisissez une gamme de produit</option>
                        {ranges && ranges.map((range) => {
                            return <option key={range.id} value={range.id}>{range.name}</option>
                        }
                        )}
                    </select>
                </div>
                {
                    techsheetToDelete &&
                    <div className="add-techsheet-form-item">
                        <label htmlFor="techSheet_id">Fiche technique</label>
                        <select name="techSheet_id" id="techSheet_id" defaultValue="none">
                            <option value="none" disabled>Choisissez une fiche technique</option>
                            {techsheetToDelete.map((techsheet) => {
                                return <option key={techsheet.id} value={techsheet.id}>{techsheet.name}</option>
                            })}
                        </select>
                    </div>
                }
                <button type="submit">Supprimer</button>
            </form >

            <h2>Supprimer une fiche technique du serveur</h2>
            <form className="add-techsheet-form" onSubmit={handleSubmitDeletePdf}>
                <div className="add-techsheet-form-item">
                    <label htmlFor="techSheet_id">Fiche technique</label>
                    <select name="techSheet_id" id="techSheet_id" defaultValue="none">
                        <option value="none" disabled>Choisissez une fiche technique</option>
                        {techsheets && techsheets.map((techsheet) => {
                            return <option key={techsheet.id} value={techsheet.id}>{techsheet.link}</option>
                        })}
                    </select>
                </div>
                <button type="submit">Supprimer</button>
            </form >

        </div >
    )
}