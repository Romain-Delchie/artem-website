import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import DashboardComponent from '../../components/Dashboard/DashboardComponent'
import API from '../../utils/api/api'
import Loading from '../../components/Loading/Loading'
import './HandleHome.scss'

export default function HandleHome() {
    const { user } = useContext(AppContext)
    const [presentations, setPresentations] = useState()
    const [presentationToUpdate, setPresentationToUpdate] = useState()
    const [presentationToDelete, setPresentationToDelete] = useState()
    useEffect(() => {
        API.presentation.getPresentations()
            .then(res => {
                setPresentations([...res.data])
            })
    }, [])

    const handleAddPresentation = (e) => {
        e.preventDefault()
        const data = {
            title: e.target.title.value,
            paragraph: e.target.paragraph.value
        }
        API.presentation.create(user.token, data)
            .then(res => {
                const newPresentation = res.data.newPresentation
                newPresentation.id = res.data.newPresentation.generatedId
                delete newPresentation.generatedId
                setPresentations([...presentations, newPresentation])
                alert('Présentation ajoutée')
            })
            .catch(err => alert('Une erreur est survenue'))
    }

    const handlePresentationToUpdate = (e) => {
        const presentation = presentations.find(item => item.id === Number(e.target.value))
        setPresentationToUpdate(presentation)
    }

    const handleChangePresentation = (e) => {
        setPresentationToUpdate({ ...presentationToUpdate, [e.target.name]: e.target.value })
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        API.presentation.update(user.token, presentationToUpdate)
            .then(res => {
                const newPresentations = presentations.map(item => {
                    if (item.id === presentationToUpdate.id) {
                        return presentationToUpdate
                    } else {
                        return item
                    }
                })
                setPresentations(newPresentations)
                setPresentationToUpdate()
                alert('Présentation modifiée')

            }).catch(err => alert('Une erreur est survenue'))
    }

    const handleSubmitDelete = (e) => {
        e.preventDefault()
        API.presentation.delete(user.token, presentationToDelete)
            .then(res => {
                const newPresentations = presentations.filter(item => item.id !== Number(presentationToDelete))
                setPresentations(newPresentations)
                setPresentationToDelete()
                alert('Présentation supprimée')
            }).catch(err => alert('Une erreur est survenue'))
    }

    if (!presentations) {
        return <Loading />
    } else {
        return (
            <main className='handle-home'>
                <DashboardComponent />
                <h2>Ajouter une présentation</h2>
                <form className='handle-home-form' onSubmit={handleAddPresentation}>
                    <label htmlFor='title'>Titre</label>
                    <input type='text' name='title' id='title' />
                    <label htmlFor='paragraph'>Paragraphe</label>
                    <textarea name='paragraph' id='paragraph' cols='30' rows='10'></textarea>
                    <button type='submit'>Ajouter</button>
                </form>
                <h2>Modifier une présentation</h2>
                <form className='handle-home-form' onSubmit={handleSubmitUpdate}>
                    <select name='presentation' id='presentation' defaultValue="none" onChange={handlePresentationToUpdate}>
                        <option value="none" disabled>Choisissez une présentation</option>
                        {presentations.map((item) => (
                            <option value={item.id} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {presentationToUpdate && (
                        <>
                            <label htmlFor='title'>Titre</label>
                            <input type='text' name='title' id='title' value={presentationToUpdate.title} onChange={handleChangePresentation} />
                            <label htmlFor='paragraph'>Paragraphe</label>
                            <textarea name='paragraph' id='paragraph' cols='30' rows='10' value={presentationToUpdate.paragraph} onChange={handleChangePresentation}></textarea>
                            <button type='submit'>Modifier</button>
                        </>
                    )
                    }
                </form>
                <h2>Supprimer une présentation</h2>
                <form className='handle-home-form' onSubmit={handleSubmitDelete}>
                    <select name='presentation' id='presentation' defaultValue="none" onChange={(e) => setPresentationToDelete(e.target.value)}>
                        <option value="none" disabled>Choisissez une présentation</option>
                        {presentations.map((item) => (
                            <option value={item.id} key={item.id}>{item.title}</option>
                        ))}
                    </select>
                    {presentationToDelete && (
                        <button type='submit'>Supprimer</button>
                    )}
                </form>

            </main>
        )
    }

}