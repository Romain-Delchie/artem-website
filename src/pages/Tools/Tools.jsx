import { Link } from 'react-router-dom'
import './Tools.scss'

export default function Tools() {
    return (
        <div className='tools'>
            <h2>OUTILS</h2>
            <div className='tools-container'>
                <div className='tools-container-item'>
                    <h3>Outils pour définir vos :</h3>
                    <Link className='tools-container-item-define' to='/te-tool'>
                        <img className='tools-container-item-define-img' src="/images/products/te.jpg" alt="photo de toile enfourneur" />
                        <h4>Toile enfourneur</h4>
                    </Link>

                </div>
                <div className='tools-container-item'>
                    <h3>plan de prise de côte en PDF</h3>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-tb-ourlets.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Toile de balancelle à ourlets</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-tb-velcro.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Toile de balancelle à velcros</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-te-cordon.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Toile enfourneur à cordon</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-te-recouvrement.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Toile enf. à recouvrement</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-te-sangle.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Toile enfourneur à sangles</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-enfourneur.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Enfourneur inox</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-ciseaux.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Elevateur ciseaux</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-colonne.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Elevateur colonne</p></Link>
                    <Link className='tools-container-item-link' to='/pdf/plan-cote-integre.pdf' target='_blank' download rel="noreferrer"><img className='tools-container-item-link-pdf' src="/images/pdf.png" alt="pdf-icon" /><p>Elevateur intégré</p></Link>
                </div>
            </div>
        </div>

    )
}