import React from 'react'

export default function TechSheetPdf({ techSheet }) {
    return (
        <iframe
            title={`Fiche technique pour ${techSheet.name}`}
            src={`/technicalSheet/${techSheet.link}.pdf`}
            width="100%"
            height={window.innerHeight}
        ></iframe>
    )
}
