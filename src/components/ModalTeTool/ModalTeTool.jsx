import React, { useEffect, useState } from 'react'
import './ModalTeTool.scss'
import { Link } from 'react-router-dom'

/**
 * Encart qui signale l'outil d'aide pour toile enfourneur sur la page produits.
 *
 * Il ne s'ouvre de lui-même qu'une fois : dès que l'utilisateur le ferme ou
 * suit le lien, le choix est gardé dans le navigateur. Il laisse alors place
 * à une languette discrète sur le bord droit, qui permet de le rouvrir.
 * À la première visite, il attend quelques secondes avant d'apparaître, pour
 * laisser l'utilisateur commencer sa recherche sans être interrompu.
 */
const STORAGE_KEY = 'artem:te-tool-modal-dismissed'
const DELAY_MS = 6000

function isDismissed() {
    try {
        return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
        return false
    }
}

function rememberDismissal() {
    try {
        localStorage.setItem(STORAGE_KEY, '1')
    } catch {
        // Stockage indisponible (navigation privée) : l'encart reviendra
        // à la prochaine visite, sans autre conséquence.
    }
}

export default function ModalTeTool() {
    // 'waiting' : avant la première apparition ; 'open' : encart affiché ;
    // 'tab' : encart fermé, seule la languette reste.
    const [state, setState] = useState(() => (isDismissed() ? 'tab' : 'waiting'))
    const isVisible = state === 'open'

    useEffect(() => {
        if (state !== 'waiting') return
        const timer = setTimeout(() => setState('open'), DELAY_MS)
        return () => clearTimeout(timer)
    }, [state])

    const dismiss = () => {
        rememberDismissal()
        setState('tab')
    }

    useEffect(() => {
        if (!isVisible) return
        const onKeyDown = (event) => {
            if (event.key === 'Escape') dismiss()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [isVisible])

    return (
        <>
        <button
            type='button'
            className={state === 'tab' ? 'modal-te-tool-tab is-visible' : 'modal-te-tool-tab'}
            onClick={() => setState('open')}
            aria-label="Afficher l'outil d'aide toile enfourneur"
            aria-hidden={state !== 'tab'}
            tabIndex={state === 'tab' ? 0 : -1}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
            </svg>
            <span>Toile sur mesure</span>
        </button>
        <aside
            className={isVisible ? 'modal-te-tool is-visible' : 'modal-te-tool'}
            aria-label="Outil d'aide toile enfourneur"
            aria-hidden={!isVisible}
        >
            <div className='modal-te-tool-media'>
                <img src="/images/products/te.jpg" alt="" />
                <span className='modal-te-tool-badge'>Sur mesure</span>
            </div>
            <div className='modal-te-tool-body'>
                <h3 className='modal-te-tool-title'>Besoin d'une toile enfourneur ?</h3>
                <p className='modal-te-tool-text'>
                    Obtenez le prix d'une toile sur mesure ou laissez-vous guider pour définir la vôtre.
                </p>
                <Link
                    to='/te-tool'
                    className='modal-te-tool-link'
                    onClick={dismiss}
                    tabIndex={isVisible ? 0 : -1}
                >
                    Ouvrir l'outil d'aide
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                </Link>
            </div>
            <button
                type='button'
                className='modal-te-tool-close'
                onClick={dismiss}
                aria-label="Fermer et ne plus afficher"
                tabIndex={isVisible ? 0 : -1}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                </svg>
            </button>
        </aside>
        </>
    )
}
