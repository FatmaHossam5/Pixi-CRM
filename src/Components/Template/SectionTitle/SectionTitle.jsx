import React from 'react'

export default function SectionTitle({ title }) {
  return (
  
        <div className="d-flex align-items-center mb-3">
          <h6 className="mb-3   text-muted">{title}</h6>
          <div className="flex-grow-1 border-bottom ms-2" />
        </div>
    )
}
